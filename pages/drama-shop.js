import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getProductsData } from '../lib/products'
import Layout from '../components/templates/Layout'
import { useState, useContext } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
import styles from '../styles/Shop.module.css'

export async function getStaticProps() {
    const allProducts = getProductsData()
    return {
        props: {
            allProducts
        }
    }
}

const DramaShop = ({ allProducts }) => {
    //shopping cart context
    const { items, itemsSetter } = useContext(ShoppingContext)
    console.log(items)

    //Update shopping cart context
    function setCart(item) {
        let obj = { ...items };
        const key = item.product_name;
        const value = {
            price: item.product_price,
            image: item.product_image,
            number: 1,
            slug: item.product_slug
        };
        obj[key] = value
        itemsSetter(obj)
    }

    //product pagination
    const [page, setPage] = useState(0);
    const productsPerPage = 6;
    const incUp = () => {
        if (page < allProducts.length - productsPerPage) {
            setPage(page + productsPerPage)
            window.scrollTo({ top: 100, behavior: 'smooth' });
        }
    }
    const incDown = () => {
        if (page >= productsPerPage) {
            window.scrollTo({ top: 100, behavior: 'smooth' });
            setPage(page - productsPerPage)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Drama Fruit</title>
                <meta name="description" content="Fresh Fruit by Marek Kalianko" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <h2 style={{ textAlign: 'center', margin: '40px 0 20px' }}>Drama Shop</h2>
                <div className={styles.imageContainer}>
                    {//map products from CMS
                        allProducts.slice(page, page + productsPerPage).map((item, i) => {
                            const slug = item.product_name.toLowerCase().split(' ').join('-');
                            return <div
                                key={'shopItem' + i}
                                className={styles.homeImages + ' fade-in'}
                            >
                                <div style={{ width: '90%' }}>
                                    <Link href={'/products/' + slug}>
                                        <a>
                                            <Image
                                                src={'/' + item.product_image}
                                                alt={item.product_image_alt || ''}
                                                layout="responsive"
                                                objectFit="contain"
                                                width={"260"}
                                                height={"260"}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <hr className={styles.cardHr} />
                                <p className={styles.imageSubtitle + ' ' + styles.subTop}>
                                    {item.product_name}
                                </p>
                                <p className={styles.imageSubtitle}>
                                    €{item.product_price}
                                </p>
                                <div className={styles.atcContainer}>
                                    <button
                                        onClick={() => setCart(item)}
                                        className={styles.addToCart}
                                    >
                                        Add To Cart
                                    </button>
                                    {//if item is in cart offer a checkout button
                                        Object.keys(items).filter(name => name === item.product_name).length > 0 ? <Link href='/checkout'>
                                            <a className={styles.checkoutButton + ' fade-in'}>
                                                Go To Checkout
                                            </a>
                                        </Link> : <Link href={'/products/' + slug}>
                                            <a className={styles.findOutButton + ' fade-in'}>
                                                Find Out More
                                            </a>
                                        </Link>
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
                {
                    allProducts.length > productsPerPage && <div className={styles.pageButtons}>
                        <button
                            onClick={() => incDown()}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => incUp()}
                        >
                            Next
                        </button>
                    </div>
                }
            </Layout>

        </div>
    )
}

export default DramaShop