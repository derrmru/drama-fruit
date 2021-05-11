import Head from 'next/head'
import Layout from '../components/templates/Layout'

export default function Checkout() {
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

      </Layout>
    </div>
  )
}