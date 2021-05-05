import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/templates/Layout'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  //console.log(attributes)

  //re route for invited users
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
        {/*netlify cms identity script*/}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <Layout>
        <div className={styles.imageContainer}>
          {/*//map images from CMS
            Object.keys(attributes).map((key, i) => {
              return <div
                key={'homeImage' + i}
                className={styles.homeImages}
                >
                <Image
                  src={'/' + attributes[image]}
                  alt={attributes[alt_text] || ''}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            })
          */}
        </div>
      </Layout>

    </div>
  )
}
