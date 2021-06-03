import styles from '../../styles/Shop.module.css'

const NavButtons = ({
    products,
    select,
    productsPerPage,
    incUp,
    incDown
}) => {
    return <>
        {
            products.filter(product => {
                if (select !== 'Select') return product.fields.productCategory === select
                return true
            }).length > productsPerPage && <div className={styles.pageButtons}>
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
    </>
}

export default NavButtons