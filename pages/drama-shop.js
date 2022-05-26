import Head from 'next/head'
import { fetchEntries } from '../lib/contentful'
import Layout from '../components/templates/Layout'
import PageTitle from '../components/PageTitle'
import ProductCards from '../components/Shop/ProductCards'
import NavButtons from '../components/Shop/NavButtons'
import Filter from '../components/Filter'
import { useState, useContext, useEffect } from 'react'
import { ShoppingContext } from '../src/context/shoppingCart'
// import { getPlaiceholder } from 'plaiceholder'
import styles from '../styles/Shop.module.css'

const DramaShop = ({ products }) => {

    //shopping cart context
    const { items, itemsSetter } = useContext(ShoppingContext)

    //Update shopping cart context
    function setCart(item) {
        let obj = { ...items };
        const key = item.fields.title;
        const value = {
            price: item.fields.productPrice,
            image: item.fields.productImage.fields.file.url,
            number: 1,
            maxNumber: item.fields.stock,
            slug: '/drama-shop/' + item.fields.slug,
            environment: item.sys.environment.sys.id,
            id: item.sys.id
        };
        obj[key] = value
        itemsSetter(obj)
    }

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

    //Select Categories
    const [productCategories, setProductCategories] = useState([]);
    const [select, setSelect] = useState('Select');
    useEffect(() => {
        if (products) setProductCategories(Object.keys(products).reduce((total, product) => {
            const pc = products[product].fields.productCategory
            if (pc && total.indexOf(pc) < 0) total.push(pc)
            return total
        }, []))
    }, [products])

    return (
        <div className={styles.container}>
            <Head>
                <title>Shop - Drama Fruit</title>
                <meta name="description" content="Browse our shop to buy loud and original pieces of clothing. Pick yourself a Drama Fruit, ripe to wear!" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.dramafruit.com/drama-shop/" />
                <link rel="apple-touch-icon" href="/images/apple-touch-icons/apple-touch-icon-iphone-60x60.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-touch-icons/somedir/apple-touch-icon-ipad-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-touch-icons/somedir/apple-touch-icon-iphone-retina-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-touch-icons/somedir/apple-touch-icon-ipad-retina-152x152.png" />
            </Head>

            <Layout>
                <PageTitle title="Drama Shop" />
                <Filter
                    options={productCategories}
                    selected={select}
                    setSelect={(selected) => setSelect(selected)}
                    setPage={() => setPage(0)}
                />
                <ProductCards
                    products={products}
                    select={select}
                    page={page}
                    productsPerPage={productsPerPage}
                    items={items}
                    setCart={(item) => setCart(item)}
                />
                <NavButtons
                    products={products}
                    select={select}
                    productsPerPage={productsPerPage}
                    incUp={() => incUp()}
                    incDown={() => incDown()}
                />
            </Layout>

        </div>
    )
}

export async function getStaticProps() {
    //fetch posts from contentful
    const fetchedProducts = await fetchEntries({
        content_type: "products",
    })
    // const newProducts = await Promise.all(fetchedProducts.map((product) => {
    //     const img = getPlaiceholder(`https:${product.fields.productImage.fields.file.url}`)
    //     return { ...product, placeholder: img }
    // }))
    return {
        props: { products: fetchedProducts }, // will be passed to the page component as props
    }
}

export default DramaShop