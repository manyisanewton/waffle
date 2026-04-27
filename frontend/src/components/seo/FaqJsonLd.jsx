function FaqJsonLd({ items }) {
  const entityItems = (items || []).map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }))

  if (!entityItems.length) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: entityItems,
        }),
      }}
    />
  )
}

export default FaqJsonLd
