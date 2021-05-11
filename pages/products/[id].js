import Layout from '../../components/templates/Layout'
import { getProducts } from '../../lib/products'

export async function getStaticPaths() {
  const paths = getProducts()
  return {
    paths,
    fallback: false
  }
}

export default function Post() {
  return <Layout>...</Layout>
}