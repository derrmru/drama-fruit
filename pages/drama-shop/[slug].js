import { useContext } from 'react'
import { ShoppingContext } from '../../src/context/shoppingCart'
import Link from 'next/link'
import Layout from '../../components/templates/Layout'
import { client } from '../../lib/contentful'
import style from '../../styles/Product.module.css'

export default function Produce({ productData }) {
    //cart context
    const { items, itemsSetter } = useContext(ShoppingContext)

    //Update shopping cart context
    function setCart(item) {
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

    return (
        <div>
            <Layout>
                <h2 style={{ textAlign: 'center', margin: '40px 0' }}>{productData.fields.title}</h2>
                <div className={style.productContain}>

                    <div className={style.imageContain}>
                        <div className={style.image} style={{ margin: 'auto', border: '5px solid var(--drama-pink)' }}>
                            <img
                                src={'/' + productData.fields.productImage.fields.file.url}
                                alt={productData.fields.imageAltText || ''}
                                object-fit="contain"
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>

                    <div className={style.description}>
                        <div className={style.textContain}>
                            {productData.fields.productDescription.content.map((paragraph, i) => {
                                return <p key={'para' + i}>{paragraph.content[0].value}</p>
                            })}
                        </div>
                        <div className={style.productPrice}>
                            Price: €{productData.fields.productPrice}
                        </div>
                        <button
                            onClick={() => setCart(productData)}
                        >
                            Add To Basket
                        </button>
                        <Link href='/checkout'>
                            <a className={style.checkoutButton + ' fade-in'}>
                                Go To Checkout
                            </a>
                        </Link>
                    </div>

                </div>
            </Layout>
        </div>
    )
}

export async function getStaticProps(context) {
    // Fetch all results where `fields.slug` is equal to the `slug` param
    const result = await client
        .getEntries({
            content_type: "products",
            "fields.slug": context.params.slug,
        })
        .then((response) => response.items)

    // Since `slug` was set to be a unique field, we can be confident that
    // the only result in the query is the correct post.
    const productData = result.pop()

    // If nothing was found, return an empty object for props, or else there would
    // be an error when Next tries to serialize an `undefined` value to JSON.
    if (!productData) {
        return { props: {} }
    }

    // Return the post as props
    return {
        props: {
            productData,
        },
    }
}

export async function getStaticPaths() {

    // Query Contentful for all blog posts in the space
    const posts = await client
        .getEntries({ content_type: "products" })
        .then((response) => response.items)

    // Map the result of that query to a list of slugs.
    // This will give Next the list of all blog post pages that need to be
    // rendered at build time.
    const paths = posts.map(({ fields: { slug } }) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}