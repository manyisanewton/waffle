import { Navigate, useParams } from 'react-router-dom'
import SolutionDetailPageContent from '../components/solutions/SolutionDetailPageContent'
import { getSolutionBySlug } from '../data/solutionsCatalog'

function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    return <Navigate to="/solutions" replace />
  }

  return <SolutionDetailPageContent solution={solution} />
}

export default SolutionDetailPage
