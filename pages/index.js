import Head from 'next/head'
import Layout from '../components/templates/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Drama Fruit</title>
        <meta name="description" content="Fresh Fruit by Marek Kalianko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
          
        
      </Layout>

    </div>
  )
}
