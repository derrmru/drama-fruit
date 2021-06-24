import Link from 'next/link'
import styles from '../../styles/Shop.module.css'

const ProductCards = ({
    products,
    select,
    page,
    productsPerPage,
    items,
    setCart
}) => {
    return <div className={styles.imageContainer}>
    {
        products
        .filter(product => {
            if (select !== "Select") return product.fields.productCategory === select
            return true
        })
        .sort((a, b) => new Date(b.fields.datePublished) - new Date(a.fields.datePublished))
        .slice(page, page + productsPerPage).map((item, i) => {
            return <div
                key={'shopItem' + i}
                className={styles.homeImages + ' fade-in'}
            >
                <div style={{ width: '90%' }}>
                    <Link href={'/drama-shop/' + item.fields.slug}>
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
                        onClick={() => setCart(item)}
                        className={styles.addToCart}
                    >
                        Add To Cart
                    </button>
                    {//if item is in cart offer a checkout button
                        Object.keys(items).filter(name => name === item.fields.title).length > 0 ? <Link href='/checkout'>
                            <a className={styles.checkoutButton + ' fade-in'}>
                                Go To Checkout
                            </a>
                        </Link> : <Link href={'/drama-shop/' + item.fields.slug}>
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
}

export default ProductCards