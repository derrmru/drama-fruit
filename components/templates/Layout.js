import Navigation from '../Navigation'
import { attributes } from '../../content/navigation.md'
import style from './Layout.module.css'

const Layout = ({ children }) => {
    let { navigation } = attributes;
    return (
        <>
            <Navigation 
                navItems={navigation}
                />

            <main className={style.main}>
                {children}
            </main>

            <footer className={style.footer}>
                <span>©Drama Fruit, 2021 | built by <a href="">thepetersweeney.com</a></span>
            </footer>

        </>
    )
}

export default Layout