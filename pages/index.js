import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/templates/Layout'
import { attributes } from '../content/home.md'
import { getProductsData } from '../lib/products'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const allProducts = getProductsData()
  return {
    props: {
      allProducts
    }
  }
}

export default function Home({ allProducts }) {
  console.log(allProducts)
  console.log(attributes)
  return (
    <div>
      <Head>
        <title>Drama Fruit</title>
        <meta name="description" content="Fresh Fruit by Marek Kalianko" />
        <link rel="icon" href="/favicon.ico" />
        {/*netlify cms identity script*/}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Layout>
        {
          allProducts.filter(item => item.product_name === attributes.home_product[0]).map((item, i) => {
            return <div>
              {item.home_product}
            </div>
          })
        }
      </Layout>
    </div>
  )
}
