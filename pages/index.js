import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/templates/Layout'
import { attributes } from '../content/home.md'
import { getProductsData } from '../lib/products'
import style from '../styles/Home.module.css'

export async function getStaticProps() {
  const allProducts = getProductsData()
  return {
    props: {
      allProducts
    }
  }
}

export default function Home({ allProducts }) {
  console.log(allProducts.filter(item => Object.values(attributes).indexOf(item.product_name) >= 0))
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
        <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Fresh Fruit!</h2>
        <div className={style.homeProductsContainer}>
          {//fetch the selected products to showcase on the homepage
            allProducts.filter(item => Object.values(attributes).indexOf(item.product_name) >= 0).map((item, i) => {
              return <div
                key={'homepage-items' + i}
                className={style.homeProduct}
              >
                <Image
                  src={'/' + item.product_image}
                  alt={item.product_image_alt || ''}
                  width={"200px"}
                  height={"200px"}
                />
                <div>{item.product_name}</div>
                <div>€{item.product_price}</div>
              </div>
            })
          }
        </div>
      </Layout>
    </div>
  )
}
