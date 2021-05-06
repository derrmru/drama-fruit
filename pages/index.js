import Head from 'next/head'
import Image from 'next/image'
import { attributes } from '../content/home.md'
import Layout from '../components/templates/Layout'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  console.log(attributes)

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
        <h2 style={{textAlign: 'center'}}>Fresh Fruit</h2>
        <div className={styles.imageContainer}>
          {//map images from CMS
            Object.keys(attributes)
              .filter((item) => {
                return item.indexOf('alt') < 0 &&
                item.indexOf('subtitle') < 0 &&
                item.indexOf('price') < 0
              })
              .map((image, i) => {
                return <div
                  key={'homeImage' + i}
                  className={styles.homeImages + ' fade-in'}
                  >
                  <Image
                    src={'/' + attributes[image]}
                    alt={attributes[image + '_alt'] || ''}
                    width={"100%"}
                    height={"100%"}
                  />
                  <p className={styles.imageSubtitle + ' ' + styles.subTop}>
                    <hr className={styles.cardHr} />
                    {attributes[image + '_subtitle']}
                  </p>
                  <p className={styles.imageSubtitle}>
                    €{attributes[image + '_price']}
                  </p>
                </div>
              })
          }
        </div>
      </Layout>

    </div>
  )
}
