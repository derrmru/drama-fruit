import Head from 'next/head'
import Layout from '../components/templates/Layout'
import HomeShowCases from '../components/Home/HomeShowCases'
import PageTitle from '../components/PageTitle'
import { useState, useEffect } from 'react'
import { fetchEntries } from '../lib/contentful'

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
        <meta name="description" content={items && items.fields.seoDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageTitle title="Fresh Fruit!" />
        <HomeShowCases items={items} />
      </Layout>
    </div>
  )
}
