import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/templates/Layout'
import { useState, useEffect } from 'react'
import { fetchEntries } from '../lib/contentful'
import style from '../styles/Home.module.css'

export default function Home() {
  //fetch posts from contentful
  const [items, setItems] = useState()

  useEffect(() => {
      const getProducts = async () => {
        const selection = await fetchEntries({
          content_type: "homePage",
      })
        setItems(...selection)
      }
      getProducts()
  }, [])

  return (
    <div>
      <Head>
        <title>Drama Fruit</title>
        <meta name="description" content="Fresh Fruit by Marek Kalianko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Fresh Fruit!</h2>
        <div className={style.homeProductsContainer + ' fade-in'}>
          {//fetch the selected products to showcase on the homepage
            items && items.fields.showCases.map((item, i) => {
              return <div
                key={'homepage-items' + i}
                className={style.homeProduct}
              >
                <div 
                  className={style.itemCard}
                  >
                  <Link href={'/drama-shop/' + item.fields.slug}>
                    <a>
                      <img
                        src={item.fields.productImage.fields.file.url}
                        alt={item.fields.imageAltText || ''}
                        className={style.cardImage}
                        object-fit="cover"
                        width="100%"
                        height="100%"
                      />
                    </a>
                  </Link>
                </div>
                <div>{item.fields.title}</div>
                <div>€{item.fields.productPrice}</div>
              </div>
            })
          }
        </div>
      </Layout>
    </div>
  )
}
