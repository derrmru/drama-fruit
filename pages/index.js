import Head from 'next/head'
import Layout from '../components/templates/Layout'
import Banner from '../components/Home/Banner'
import ShopCase from '../components/Home/ShopCase'
import BlogCase from '../components/Home/BlogCase'
import { fetchEntries } from '../lib/contentful'
import { org } from '../src/rich-snippets/organization'

const Home = ({ items }) => {
  return (
    <div>
      <Head>
        <title>Drama Fruit</title>
        <meta name="description" content={items && items.fields.seoDescription} />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json">{org}</script>
      </Head>
      <Layout>
        <Banner items={items} />
        <ShopCase items={items} />
        <BlogCase items={items} />
      </Layout>
    </div>
  )
}

//get meta and CMS data as initial props
Home.getInitialProps = async () => {
  const selection = await fetchEntries({
    content_type: "homePage",
  })
  return { items: selection[0] }
}

export default Home