import Head from 'next/head'
import Link from 'next/link'
import { fetchEntries } from '../lib/contentful'
import Layout from '../components/templates/Layout'
import { useState, useContext, useEffect } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
import styles from '../styles/Shop.module.css'

const DramaShop = () => {
    //shopping cart context
    const { items, itemsSetter } = useContext(ShoppingContext)

    //Update shopping cart context
    function setCart(item, slug) {
        let obj = { ...items };
        const key = item.fields.title;
        const value = {
            price: item.fields.productPrice,
            image: item.fields.productImage.fields.file.url,
            number: 1,
            slug: '/drama-shop/' + item.fields.slug
        };
        obj[key] = value
        itemsSetter(obj)
    }

    //fetch posts from contentful
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
          const allProducts = await fetchEntries({
            content_type: "products",
        })
          setProducts([...allProducts])
        }
        getProducts()
    }, [])

    //product pagination
    const [page, setPage] = useState(0);
    const productsPerPage = 6;
    const incUp = () => {
        if (page < products.length - productsPerPage) {
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
                        products.slice(page, page + productsPerPage).map((item, i) => {
                            const slug = item.fields.title.toLowerCase().split(' ').join('-');
                            return <div
                                key={'shopItem' + i}
                                className={styles.homeImages + ' fade-in'}
                            >
                                <div style={{ width: '90%' }}>
                                    <Link href={'/drama-shop/' + slug}>
                                        <a>
                                            <img
                                                src={item.fields.productImage.fields.file.url}
                                                alt={item.fields.imageAltText || ''}
                                                width="100%"
                                                height="auto"
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <hr className={styles.cardHr} />
                                <p className={styles.imageSubtitle + ' ' + styles.subTop}>
                                    {item.fields.title}
                                </p>
                                <p className={styles.imageSubtitle}>
                                    €{item.fields.productPrice}
                                </p>
                                <div className={styles.atcContainer}>
                                    <button
                                        onClick={() => setCart(item, slug)}
                                        className={styles.addToCart}
                                    >
                                        Add To Cart
                                    </button>
                                    {//if item is in cart offer a checkout button
                                        Object.keys(items).filter(name => name === item.fields.title).length > 0 ? <Link href='/checkout'>
                                            <a className={styles.checkoutButton + ' fade-in'}>
                                                Go To Checkout
                                            </a>
                                        </Link> : <Link href={'/drama-shop/' + slug}>
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
                    products.length > productsPerPage && <div className={styles.pageButtons}>
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