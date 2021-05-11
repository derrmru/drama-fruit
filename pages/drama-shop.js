import Head from 'next/head'
import Image from 'next/image'
import { attributes } from '../content/home.md'
import Layout from '../components/templates/Layout'
import { useEffect, useContext } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
import styles from '../styles/Home.module.css'

const DramaShop = () => {
    //shopping cart context
    const { items, itemsSetter } = useContext(ShoppingContext)

    //Update shopping cart context
    function setCart(image) {
        let obj = { ...items };
        const key = attributes[image + '_subtitle'];
        const value = {
            price: attributes[image + '_price'],
            image: attributes[image],
            number: 1
        };
        obj[key] = value
        itemsSetter(obj)
    }

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
            </Head>

            <Layout>
                <h2 style={{ textAlign: 'center' }}>Fresh Fruit</h2>
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
                                    onClick={() => setCart(image)}
                                >
                                    <Image
                                        src={'/' + attributes[image]}
                                        alt={attributes[image + '_alt'] || ''}
                                        width={"200px"}
                                        height={"200px"}
                                    />
                                    <hr className={styles.cardHr} />
                                    <p className={styles.imageSubtitle + ' ' + styles.subTop}>
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

export default DramaShop