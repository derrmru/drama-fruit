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
        <title>Drama Fruit - The Home of Original Clothing</title>
        <meta name="description" content={items && items.fields.seoDescription} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.dramafruit.com/" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icons/apple-touch-icon-iphone-60x60.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-touch-icons/somedir/apple-touch-icon-ipad-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icons/somedir/apple-touch-icon-iphone-retina-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-touch-icons/somedir/apple-touch-icon-ipad-retina-152x152.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: org() }} />
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