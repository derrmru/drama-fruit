import styles from '../../styles/Shop.module.css'

const NavButtons = ({
    products,
    productsPerPage,
    disableIncUp,
    disableIncDown,
    incUp,
    incDown
}) => {
    return <>
        {
            products.length > productsPerPage && <div className={styles.pageButtons}>
                <button
                    className={styles.navButtons}
                    disabled={disableIncDown}
                    onClick={() => incDown()}
                >
                    Previous
                </button>
                <button
                    className={styles.navButtons}
                    disabled={disableIncUp}
                    onClick={() => incUp()}
                >
                    Next
                </button>
            </div>
        }
    </>
}

export default NavButtons