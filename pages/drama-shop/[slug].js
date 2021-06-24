import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { ShoppingContext } from '../../src/context/shoppingCart'
import { client } from '../../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link'
import Layout from '../../components/templates/Layout'
import PageTitle from '../../components/PageTitle'
import Sizes from '../../components/Shop/Sizes'
import style from '../../styles/Product.module.css'

export default function Produce({ productData }) {
    //cart context
    const { items, itemsSetter } = useContext(ShoppingContext)
    console.log(items)

    //Update shopping cart context
    function setCart(item) {
        let obj = { ...items };
        const key = item.fields.title;
        const value = {
            price: item.fields.productPrice,
            image: item.fields.productImage.fields.file.url,
            number: number,
            size: theSize,
            maxNumber: productData.fields.stock,
            slug: '/drama-shop/' + item.fields.slug,
            environment: item.sys.environment.sys.id,
            id: item.sys.id
        };
        obj[key] = value
        itemsSetter(obj)
    }

    //increment or decrement pages
    const title = productData.fields.title;
    const [number, setNumber] = useState(1)
    const inc = (direction) => {
        setNumber(number + direction)
        //if item is in basked, update basket as well
        if (items[title]) {
            let obj = {...items};
            obj[title]['number'] = number + direction
            itemsSetter(obj)
        }
    }
    
    useEffect(()=> {
        if (items[title]) setNumber(items[title]['number'])
    })

    //handle size selections
    const [theSize, setTheSize] = useState();
    const setSize = (size) => {
        setTheSize(size);
        if (items[title]) {
            let obj = {...items};
            obj[title]['size'] = size
            itemsSetter(obj)
        }
    }

    //select current image
    const [currentImage, setCurrentImage] = useState('');

    return (
        <div>
            <Head>
                <title>{productData.fields.title} - Drama Fruit</title>
                {productData && <meta name="description" content={productData.fields.seoDescription} />}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <PageTitle title={title} />
                <div className={style.productContain}>

                    <div className={style.imageContain}>
                        <div className={style.image} style={{ margin: 'auto', border: '5px solid var(--drama-pink)' }}>
                            <img
                                src={'/' + (currentImage !== '' ? currentImage : productData.fields.productImage.fields.file.url)}
                                alt={productData.fields.imageAltText || ''}
                                object-fit="cover"
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <div className={style.altContainer}>
                        {
                            productData.fields.productPageImages && productData.fields.productPageImages.map((image, i) => {
                                return <div 
                                    key={'altImage' + i}
                                    className={style.altImages + ' fade-in'}
                                    onClick={() => setCurrentImage(image.fields.file.url)}
                                    onMouseOver={() => setCurrentImage(image.fields.file.url)}
                                    >
                                    <img
                                        className={style.altImage}
                                        src={image.fields.file.url}
                                        alt={image.fields.description}
                                        />
                                </div>
                            })
                        }
                        </div>
                    </div>

                    <div className={style.description}>
                        <div className={style.textContain}>
                            {productData.fields.productDescription.content.map((paragraph, i) => {
                                return <div key={'para' + i}>{documentToReactComponents(paragraph)}</div>
                            })}
                        </div>
                        <div className={style.productPrice}>
                            Price: €{productData.fields.productPrice}
                        </div>
                        {
                            productData.fields.stock > 0 ?
                                <>
                                    {
                                        productData.fields.stock === 1 ? 
                                            <>
                                                <p style={{color: 'var(--drama-pink)', margin: '0 0 20px 0'}}>
                                                    This is the last {title} in stock!
                                                </p>
                                            </> :
                                            productData.fields.stock === 0 ?
                                            <>
                                                <p style={{color: 'var(--drama-pink)', margin: '0 0 20px 0'}}>
                                                    This item is no longer in stock :(
                                                </p>
                                            </> :
                                                <>
                                                    <p>Number of items:</p>
                                                    <div className={style.increment}>
                                                        <div
                                                            className={style.incrementButton}
                                                            onClick={() => number > 1 && inc(-1)}
                                                        >
                                                            -
                                                            </div>
                                                            <div style={{width: '30%'}}>{number}</div>
                                                        <div
                                                            className={style.incrementButton}
                                                            onClick={() => number < productData.fields.stock && inc(1)}
                                                        >
                                                            +
                                                        </div>
                                                    </div>
                                                </>
                                    }
                                    <Sizes 
                                        sizes={productData.fields.availableSizes}
                                        theSize={theSize}
                                        setTheSize={(size) => setSize(size)}
                                        />
                                    {
                                        items[title] ?
                                            <p 
                                                className="fade-in" 
                                                style={{color: 'var(--drama-pink', fontSize: '16px', margin: '10px 0'}}
                                                >
                                                {'> Added To Basket'}
                                            </p> :
                                                <button
                                                    onClick={() => setCart(productData)}
                                                >
                                                    Add To Basket
                                                </button>
                                    }
                                    <Link href='/checkout'>
                                        <a className={style.checkoutButton + ' fade-in'}>
                                            Go To Checkout
                                        </a>
                                    </Link>
                                </> :
                                <>
                                    <p style={{ color: 'var(--drama-pink)' }}>
                                        Unfortunately this item is no longer in stock.
                                    </p>
                                    <Link href="/contact">
                                        <a>
                                            Get in touch to request it!
                                        </a>
                                    </Link>
                                </>

                        }
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