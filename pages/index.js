import Head from 'next/head'
import Layout from '../components/templates/Layout'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Drama Fruit</title>
        <meta name="description" content="Fresh Fruit by Marek Kalianko" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <Layout>


      </Layout>

    </div>
  )
}
