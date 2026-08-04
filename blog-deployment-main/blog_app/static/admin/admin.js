(() => {
  const page = document.body.dataset.page
  const appRoot = document.body.dataset.appRoot || ''
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content || ''
  const toastElement = document.querySelector('#toast')
  let toastTimer

  function showToast(message, isError = false) {
    if (!toastElement) return
    toastElement.textContent = message
    toastElement.className = `toast show${isError ? ' error' : ''}`
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toastElement.className = 'toast' }, 3500)
  }

  async function apiFetch(path, options = {}) {
    const headers = new Headers(options.headers || {})
    const method = (options.method || 'GET').toUpperCase()
    if (!(options.body instanceof FormData) && options.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && csrfToken) {
      headers.set('X-CSRFToken', csrfToken)
    }
    const response = await fetch(`${appRoot}${path}`, {
      ...options,
      method,
      headers,
      credentials: 'same-origin',
    })
    const contentType = response.headers.get('content-type') || ''
    const payload = contentType.includes('application/json') ? await response.json() : await response.text()
    if (!response.ok) {
      throw new Error(payload?.error || 'The request could not be completed.')
    }
    return payload
  }

  function escapeHtml(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;')
  }

  function initializeLogin() {
    const form = document.querySelector('#login-form')
    const error = document.querySelector('#login-error')
    form?.addEventListener('submit', async (event) => {
      event.preventDefault()
      error.hidden = true
      const button = form.querySelector('button[type="submit"]')
      button.disabled = true
      button.textContent = 'Signing in…'
      try {
        await apiFetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: form.elements.email.value,
            password: form.elements.password.value,
          }),
        })
        window.location.assign(`${appRoot}/admin`)
      } catch (requestError) {
        error.textContent = requestError.message
        error.hidden = false
        button.disabled = false
        button.textContent = 'Sign in'
      }
    })
  }

  function bindLogout() {
    document.querySelector('#logout-button')?.addEventListener('click', async () => {
      try {
        await apiFetch('/api/auth/logout', { method: 'POST' })
        window.location.assign(`${appRoot}/admin/login`)
      } catch (error) {
        showToast(error.message, true)
      }
    })
  }

  function initializeDashboard() {
    bindLogout()
    const filter = document.querySelector('#article-filter')
    filter?.addEventListener('input', () => {
      const search = filter.value.trim().toLowerCase()
      document.querySelectorAll('#article-table-body tr[data-title]').forEach((row) => {
        row.hidden = search && !row.dataset.title.includes(search)
      })
    })
    document.querySelectorAll('[data-archive-post]').forEach((button) => {
      button.addEventListener('click', async () => {
        if (!window.confirm('Archive this article? It will disappear from the public blog.')) return
        button.disabled = true
        try {
          await apiFetch(`/api/admin/posts/${button.dataset.archivePost}`, { method: 'DELETE' })
          window.location.reload()
        } catch (error) {
          button.disabled = false
          showToast(error.message, true)
        }
      })
    })
  }

  function defaultBlock(type) {
    const blocks = {
      paragraph: { type: 'paragraph', html: '' },
      heading: { type: 'heading', level: 2, text: '' },
      image: { type: 'image', media_id: null, alt: '', caption: '', layout: 'normal' },
      list: { type: 'list', style: 'bulleted', items: [''] },
      quote: { type: 'quote', text: '', attribution: '' },
      table: { type: 'table', has_header: true, rows: [['Heading 1', 'Heading 2'], ['', '']] },
      video: { type: 'video', url: '', caption: '' },
      cta: { type: 'cta', title: '', text: '', button_label: 'Request a Quote', button_url: '/request-quote', open_in_new_tab: false, nofollow: false, sponsored: false },
      divider: { type: 'divider' },
    }
    return structuredClone(blocks[type] || blocks.paragraph)
  }

  function initializeEditor() {
    const initialData = JSON.parse(document.querySelector('#editor-post-data')?.textContent || 'null')
    const state = {
      post: initialData,
      blocks: initialData?.content?.length ? initialData.content : [defaultBlock('paragraph')],
      media: [],
      activeImageIndex: null,
      activeImageTarget: null,
      featuredImageId: initialData?.featured_image?.id || null,
      saving: false,
      dirty: false,
    }
    const blocksContainer = document.querySelector('#blocks-container')
    const mediaDialog = document.querySelector('#media-dialog')
    const saveState = document.querySelector('.save-state')
    const saveMessage = document.querySelector('#save-message')
    let autosaveTimer

    const fields = {
      title: document.querySelector('#post-title'),
      excerpt: document.querySelector('#post-excerpt'),
      status: document.querySelector('#post-status'),
      category: document.querySelector('#post-category'),
      tags: document.querySelector('#post-tags'),
      slug: document.querySelector('#post-slug'),
      scheduledAt: document.querySelector('#post-scheduled-at'),
      featured: document.querySelector('#post-featured'),
      seoTitle: document.querySelector('#post-seo-title'),
      metaDescription: document.querySelector('#post-meta-description'),
      focusKeyword: document.querySelector('#post-focus-keyword'),
      canonicalUrl: document.querySelector('#post-canonical-url'),
      robotsIndex: document.querySelector('#post-robots-index'),
    }

    function setSaveState(status, message) {
      saveState?.classList.remove('saving', 'saved')
      if (status) saveState?.classList.add(status)
      if (saveMessage) saveMessage.textContent = message
    }

    function autoSizeTitle() {
      if (!fields.title) return
      fields.title.style.height = 'auto'
      fields.title.style.height = `${fields.title.scrollHeight}px`
    }

    function updateSearchPreview() {
      const title = fields.seoTitle.value.trim() || fields.title.value.trim() || 'Article title'
      const description = fields.metaDescription.value.trim() || fields.excerpt.value.trim() || 'Your meta description preview appears here.'
      const slug = fields.slug.value.trim() || 'article'
      document.querySelector('#search-preview-title').textContent = title
      document.querySelector('#search-preview-description').textContent = description
      document.querySelector('#search-preview-slug').textContent = slug
      document.querySelector('#seo-title-count').textContent = fields.seoTitle.value.length
      document.querySelector('#meta-description-count').textContent = fields.metaDescription.value.length
      const titleCount = document.querySelector('#seo-title-count')
      const descriptionCount = document.querySelector('#meta-description-count')
      const effectiveTitleLength = title.length
      titleCount?.classList.toggle('count-good', effectiveTitleLength >= 30 && effectiveTitleLength <= 60)
      titleCount?.classList.toggle('count-warning', effectiveTitleLength < 30 || effectiveTitleLength > 60)
      descriptionCount?.classList.toggle('count-good', description.length >= 120 && description.length <= 160)
      descriptionCount?.classList.toggle('count-warning', description.length < 120 || description.length > 160)
    }

    function queueAutosave() {
      state.dirty = true
      setSaveState('', 'Unsaved changes')
      clearTimeout(autosaveTimer)
      if (!fields.title.value.trim()) return
      autosaveTimer = setTimeout(() => savePost({ autosave: true }), 1800)
    }

    function blockTemplate(block, index) {
      let content = ''
      if (block.type === 'paragraph') {
        content = `<div class="rich-toolbar">
          <button type="button" data-rich-command="bold"><b>B</b></button><button type="button" data-rich-command="italic"><i>I</i></button><button type="button" data-rich-command="underline"><u>U</u></button><button type="button" data-rich-command="createLink">Link</button><button type="button" data-rich-command="unlink">Unlink</button>
        </div><div class="rich-editor" contenteditable="true" data-field="html" aria-label="Paragraph content">${block.html || ''}</div>`
      } else if (block.type === 'heading') {
        content = `<div class="block-grid"><label><span>Heading level</span><select data-field="level"><option value="2" ${block.level !== 3 ? 'selected' : ''}>H2 section</option><option value="3" ${block.level === 3 ? 'selected' : ''}>H3 subsection</option></select></label><label><span>Heading text</span><input data-field="text" value="${escapeHtml(block.text)}" /></label></div>`
      } else if (block.type === 'image') {
        const asset = state.media.find((item) => item.id === block.media_id)
        content = `<div class="image-block-preview">${asset ? `<img src="${escapeHtml(asset.urls.thumbnail)}" alt="" /><span>${escapeHtml(asset.alt_text)}</span>` : '<span>No image selected.</span>'}<button class="button secondary" type="button" data-choose-image>Choose image</button></div><div class="block-grid"><label><span>Alternative text</span><input data-field="alt" value="${escapeHtml(block.alt)}" /></label><label><span>Caption</span><input data-field="caption" value="${escapeHtml(block.caption)}" /></label><label><span>Layout</span><select data-field="layout"><option value="normal" ${block.layout !== 'wide' ? 'selected' : ''}>Normal</option><option value="wide" ${block.layout === 'wide' ? 'selected' : ''}>Wide</option></select></label></div>`
      } else if (block.type === 'list') {
        content = `<div class="block-grid"><label><span>List style</span><select data-field="style"><option value="bulleted" ${block.style !== 'numbered' ? 'selected' : ''}>Bulleted</option><option value="numbered" ${block.style === 'numbered' ? 'selected' : ''}>Numbered</option></select></label><label><span>One item per line</span><textarea data-field="items" rows="5">${escapeHtml((block.items || []).join('\n'))}</textarea></label></div>`
      } else if (block.type === 'quote') {
        content = `<label><span>Quotation</span><textarea data-field="text" rows="4">${escapeHtml(block.text)}</textarea></label><label><span>Attribution</span><input data-field="attribution" value="${escapeHtml(block.attribution)}" /></label>`
      } else if (block.type === 'table') {
        content = `<label><span>Rows (use | between columns)</span><textarea data-field="rows" rows="7">${escapeHtml((block.rows || []).map((row) => row.join(' | ')).join('\n'))}</textarea></label><label class="checkbox"><input data-field="has_header" type="checkbox" ${block.has_header ? 'checked' : ''} /><span>First row is a heading</span></label>`
      } else if (block.type === 'video') {
        content = `<label><span>YouTube, Vimeo, or video URL</span><input data-field="url" type="url" value="${escapeHtml(block.url)}" /></label><label><span>Caption</span><input data-field="caption" value="${escapeHtml(block.caption)}" /></label>`
      } else if (block.type === 'cta') {
        content = `<div class="block-grid"><label><span>Title</span><input data-field="title" value="${escapeHtml(block.title)}" /></label><label><span>Button label</span><input data-field="button_label" value="${escapeHtml(block.button_label)}" /></label><label><span>Supporting text</span><textarea data-field="text" rows="3">${escapeHtml(block.text)}</textarea></label><label><span>Button URL</span><input data-field="button_url" value="${escapeHtml(block.button_url)}" /></label></div><div class="block-grid"><label class="checkbox"><input data-field="open_in_new_tab" type="checkbox" ${block.open_in_new_tab ? 'checked' : ''} /><span>Open in new tab</span></label><label class="checkbox"><input data-field="nofollow" type="checkbox" ${block.nofollow ? 'checked' : ''} /><span>Mark nofollow</span></label><label class="checkbox"><input data-field="sponsored" type="checkbox" ${block.sponsored ? 'checked' : ''} /><span>Mark sponsored</span></label></div>`
      } else {
        content = '<p class="muted">A visual divider will appear here.</p>'
      }
      return `<section class="editor-block" data-block-index="${index}"><div class="block-topbar"><span class="block-type">${escapeHtml(block.type)}</span><div class="block-actions"><button type="button" data-move="up" aria-label="Move up">↑</button><button type="button" data-move="down" aria-label="Move down">↓</button><button type="button" data-delete-block aria-label="Delete block">×</button></div></div>${content}</section>`
    }

    function renderBlocks() {
      blocksContainer.innerHTML = state.blocks.map(blockTemplate).join('')
    }

    function payload(statusOverride, autosave = false) {
      return {
        title: fields.title.value.trim(),
        excerpt: fields.excerpt.value.trim(),
        slug: fields.slug.value.trim(),
        status: statusOverride || fields.status.value,
        category_id: fields.category.value ? Number(fields.category.value) : null,
        tags: fields.tags.value.split(',').map((tag) => tag.trim()).filter(Boolean),
        featured_image_id: state.featuredImageId,
        scheduled_at: fields.scheduledAt.value ? new Date(fields.scheduledAt.value).toISOString() : null,
        is_featured: fields.featured.checked,
        seo_title: fields.seoTitle.value.trim(),
        meta_description: fields.metaDescription.value.trim(),
        focus_keyword: fields.focusKeyword.value.trim(),
        canonical_url: fields.canonicalUrl.value.trim(),
        robots_index: fields.robotsIndex.checked,
        content: state.blocks,
        _autosave: autosave,
      }
    }

    async function savePost({ status, autosave = false } = {}) {
      if (state.saving || (!fields.title.value.trim() && autosave)) return null
      if (!fields.title.value.trim()) {
        showToast('Enter an article title before saving.', true)
        fields.title.focus()
        return null
      }
      if (status === 'published' || status === 'scheduled') {
        const seoTitle = fields.seoTitle.value.trim() || fields.title.value.trim()
        const description = fields.metaDescription.value.trim()
        const issues = []
        if (seoTitle.length < 30 || seoTitle.length > 60) issues.push('SEO title must be 30–60 characters.')
        if (description.length < 120 || description.length > 160) issues.push('Meta description must be 120–160 characters.')
        if (!fields.excerpt.value.trim()) issues.push('Add an article excerpt.')
        if (state.blocks.some((block) => block.type === 'image' && !String(block.alt || '').trim())) {
          issues.push('Add alternative text to every article image.')
        }
        let previousLevel = 1
        for (const block of state.blocks.filter((item) => item.type === 'heading')) {
          const level = Number(block.level || 2)
          if (level > previousLevel + 1) {
            issues.push('Fix heading order: do not skip directly to a lower heading level.')
            break
          }
          previousLevel = level
        }
        if (issues.length) {
          showToast(issues.join(' '), true)
          return null
        }
      }
      state.saving = true
      setSaveState('saving', autosave ? 'Autosaving…' : 'Saving…')
      try {
        const isNew = !state.post?.id
        const response = await apiFetch(isNew ? '/api/admin/posts' : `/api/admin/posts/${state.post.id}`, {
          method: isNew ? 'POST' : 'PATCH',
          body: JSON.stringify(payload(status, autosave)),
        })
        state.post = response.post
        state.blocks = response.post.content || state.blocks
        state.dirty = false
        fields.slug.value = response.post.slug
        fields.status.value = response.post.status
        document.querySelector('#preview-button').disabled = false
        if (isNew) {
          window.history.replaceState({}, '', `${appRoot}/admin/posts/${response.post.id}/edit`)
        }
        setSaveState('saved', `Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
        updateSearchPreview()
        if (!autosave) {
          showToast(response.post.status === 'published' ? 'Article published.' : 'Draft saved.')
          loadRevisions()
        }
        return response.post
      } catch (error) {
        setSaveState('', 'Save failed')
        if (!autosave) showToast(error.message, true)
        return null
      } finally {
        state.saving = false
      }
    }

    async function loadMedia() {
      try {
        const response = await apiFetch('/api/admin/media')
        state.media = response.media || []
        const grid = document.querySelector('#media-grid')
        grid.innerHTML = state.media.length ? state.media.map((asset) => `<article class="media-card"><button class="media-select" type="button" data-media-id="${asset.id}" aria-label="Select ${escapeHtml(asset.alt_text)}"><img src="${escapeHtml(asset.urls.thumbnail)}" alt="${escapeHtml(asset.alt_text)}" /><span>${escapeHtml(asset.alt_text)}</span></button><button class="media-delete" type="button" data-delete-media="${asset.id}" aria-label="Delete ${escapeHtml(asset.alt_text)}">Delete</button></article>`).join('') : '<p class="muted">No images have been uploaded yet.</p>'
        renderFeaturedImage()
      } catch (error) {
        showToast(error.message, true)
      }
    }

    async function loadRevisions() {
      if (!state.post?.id) return
      try {
        const response = await apiFetch(`/api/admin/posts/${state.post.id}/revisions`)
        const list = document.querySelector('#revision-list')
        list.innerHTML = response.revisions.length ? response.revisions.map((revision) => `<div class="revision-item"><span>Version ${revision.version}<br>${new Date(revision.created_at).toLocaleString()}</span><button type="button" data-restore-revision="${revision.id}">Restore</button></div>`).join('') : '<p class="muted">No earlier revisions yet.</p>'
      } catch (error) {
        showToast(error.message, true)
      }
    }

    blocksContainer.addEventListener('input', (event) => {
      const wrapper = event.target.closest('[data-block-index]')
      if (!wrapper || !event.target.dataset.field) return
      const block = state.blocks[Number(wrapper.dataset.blockIndex)]
      const field = event.target.dataset.field
      if (field === 'items') block.items = event.target.value.split('\n')
      else if (field === 'rows') block.rows = event.target.value.split('\n').map((row) => row.split('|').map((cell) => cell.trim()))
      else if (event.target.type === 'checkbox') block[field] = event.target.checked
      else if (field === 'level') block[field] = Number(event.target.value)
      else if (event.target.isContentEditable) block[field] = event.target.innerHTML
      else block[field] = event.target.value
      queueAutosave()
    })
    blocksContainer.addEventListener('change', (event) => event.target.dispatchEvent(new Event('input', { bubbles: true })))
    blocksContainer.addEventListener('mousedown', (event) => {
      const commandButton = event.target.closest('[data-rich-command]')
      if (commandButton) event.preventDefault()
    })
    blocksContainer.addEventListener('click', (event) => {
      const wrapper = event.target.closest('[data-block-index]')
      if (!wrapper) return
      const index = Number(wrapper.dataset.blockIndex)
      const commandButton = event.target.closest('[data-rich-command]')
      if (commandButton) {
        const command = commandButton.dataset.richCommand
        const value = command === 'createLink' ? window.prompt('Enter the destination URL') : null
        if (command !== 'createLink' || value) document.execCommand(command, false, value)
        const editor = wrapper.querySelector('.rich-editor')
        state.blocks[index].html = editor.innerHTML
        queueAutosave()
        return
      }
      if (event.target.closest('[data-delete-block]')) {
        if (!window.confirm('Remove this content block?')) return
        state.blocks.splice(index, 1)
        renderBlocks(); queueAutosave(); return
      }
      const move = event.target.closest('[data-move]')?.dataset.move
      if (move) {
        const destination = move === 'up' ? index - 1 : index + 1
        if (destination >= 0 && destination < state.blocks.length) {
          ;[state.blocks[index], state.blocks[destination]] = [state.blocks[destination], state.blocks[index]]
          renderBlocks(); queueAutosave()
        }
        return
      }
      if (event.target.closest('[data-choose-image]')) {
        state.activeImageIndex = index
        state.activeImageTarget = 'block'
        loadMedia().then(() => mediaDialog.showModal())
      }
    })

    document.querySelectorAll('[data-add-block]').forEach((button) => {
      button.addEventListener('click', () => {
        state.blocks.push(defaultBlock(button.dataset.addBlock))
        renderBlocks(); queueAutosave()
        blocksContainer.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    })
    document.querySelector('[data-close-media]')?.addEventListener('click', () => mediaDialog.close())
    document.querySelector('#media-grid')?.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('[data-delete-media]')
      if (deleteButton) {
        const mediaId = Number(deleteButton.dataset.deleteMedia)
        const usedInUnsavedArticle = state.featuredImageId === mediaId || state.blocks.some((block) => block.type === 'image' && block.media_id === mediaId)
        if (usedInUnsavedArticle) {
          showToast('Remove this image from the article and save your changes before deleting it.', true)
          return
        }
        if (!window.confirm('Permanently delete this image and all optimized versions?')) return
        deleteButton.disabled = true
        apiFetch(`/api/admin/media/${mediaId}`, { method: 'DELETE' })
          .then(() => {
            state.media = state.media.filter((asset) => asset.id !== mediaId)
            deleteButton.closest('.media-card')?.remove()
            showToast('Image deleted.')
          })
          .catch((error) => {
            deleteButton.disabled = false
            showToast(error.message, true)
          })
        return
      }
      const button = event.target.closest('[data-media-id]')
      if (!button || !state.activeImageTarget) return
      const asset = state.media.find((item) => item.id === Number(button.dataset.mediaId))
      if (state.activeImageTarget === 'featured') {
        state.featuredImageId = asset.id
        renderFeaturedImage()
      } else {
        const block = state.blocks[state.activeImageIndex]
        block.media_id = asset.id
        block.alt = block.alt || asset.alt_text
        block.caption = block.caption || asset.caption
        renderBlocks()
      }
      state.activeImageTarget = null
      state.activeImageIndex = null
      mediaDialog.close(); queueAutosave()
    })
    document.querySelector('#media-upload-form')?.addEventListener('submit', async (event) => {
      event.preventDefault()
      const button = event.currentTarget.querySelector('button[type="submit"]')
      button.disabled = true
      try {
        const response = await apiFetch('/api/admin/media', { method: 'POST', body: new FormData(event.currentTarget) })
        event.currentTarget.reset()
        await loadMedia()
        showToast(`Uploaded ${response.media.original_filename}.`)
      } catch (error) {
        showToast(error.message, true)
      } finally {
        button.disabled = false
      }
    })
    document.querySelector('#revision-list')?.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-restore-revision]')
      if (!button || !window.confirm('Restore this earlier revision? The current version will remain in history.')) return
      try {
        const response = await apiFetch(`/api/admin/posts/${state.post.id}/revisions/${button.dataset.restoreRevision}/restore`, { method: 'POST' })
        window.location.reload()
        return response
      } catch (error) { showToast(error.message, true) }
    })

    function renderFeaturedImage() {
      const preview = document.querySelector('#featured-image-preview')
      if (!preview) return
      const asset = state.media.find((item) => item.id === state.featuredImageId)
      preview.innerHTML = asset
        ? `<img src="${escapeHtml(asset.urls.thumbnail)}" alt="" /><span>${escapeHtml(asset.alt_text)}</span>`
        : '<span>No featured image selected.</span>'
    }

    document.querySelector('#choose-featured-image')?.addEventListener('click', () => {
      state.activeImageTarget = 'featured'
      state.activeImageIndex = null
      loadMedia().then(() => mediaDialog.showModal())
    })

    Object.values(fields).forEach((field) => field?.addEventListener('input', () => {
      if (field === fields.title) autoSizeTitle()
      updateSearchPreview(); queueAutosave()
    }))
    document.querySelector('#save-draft-button')?.addEventListener('click', () => savePost({ status: 'draft' }))
    document.querySelector('#publish-button')?.addEventListener('click', () => savePost({ status: 'published' }))
    document.querySelector('#preview-button')?.addEventListener('click', async () => {
      const post = state.dirty ? await savePost({ status: fields.status.value }) : state.post
      if (post?.id) window.open(`${appRoot}/admin/preview/${post.id}`, '_blank', 'noopener')
    })
    window.addEventListener('beforeunload', (event) => {
      if (state.dirty && !state.saving) { event.preventDefault(); event.returnValue = '' }
    })

    renderBlocks(); autoSizeTitle(); updateSearchPreview(); loadMedia(); loadRevisions()
  }

  if (page === 'login') initializeLogin()
  if (page === 'dashboard') initializeDashboard()
  if (page === 'editor') initializeEditor()
})()
