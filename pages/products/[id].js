import { useContext } from 'react'
import { ShoppingContext } from '../../src/context/shoppingCart'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/templates/Layout'
import { getAllProductIds, getProductData } from '../../lib/products'
import style from '../../styles/Product.module.css'

export default function Produce({ productData }) {
    //cart context
    const { items, itemsSetter } = useContext(ShoppingContext)

    //Update shopping cart context
    function setCart(item) {
        let obj = { ...items };
        const key = item.product_name;
        const value = {
            price: item.product_price,
            image: item.product_image,
            number: 1
        };
        obj[key] = value
        itemsSetter(obj)
    }

    return (
        <div>
            <Layout>
                <h2 style={{ textAlign: 'center', margin: '40px 0' }}>{productData.product_name}</h2>
                <div className={style.productContain}>

                    <div className={style.imageContain}>
                        <div style={{ width: '70%', margin: 'auto', border: '5px solid var(--drama-pink)' }}>
                            <Image
                                src={'/' + productData.product_image}
                                alt={productData.product_image_alt || ''}
                                layout="responsive"
                                objectFit="contain"
                                width={"30"}
                                height={"30"}
                            />
                        </div>
                    </div>

                    <div className={style.description}>
                        <div className={style.textContain}>
                            {productData.product_description}
                        </div>
                        <div className={style.productPrice}>
                            Price: €{productData.product_price}
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

export async function getStaticPaths() {
    const paths = getAllProductIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const productData = getProductData(params.id)
    return {
        props: {
            productData
        }
    }
}