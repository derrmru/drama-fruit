import Navigation from '../Navigation'
import style from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Navigation 
                navItems={[
                    ['Home', '/'],
                    ['News', '/news'],
                    ['Drama Shop', '/drama-shop'],
                    ['About', '/about'],
                    ['FAQ\'s', '/faq'],
                    ['Contact', '/contact']
                ]}
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