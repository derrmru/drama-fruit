import Link from 'next/link'
import Navigation from '../Navigation'
import style from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Navigation 
                navItems={[
                    ['Home', '/'],
                    ['Blog', '/past-projects'],
                    ['Shop', '/drama-shop'],
                    ['About', '/about'],
                    ['FAQ', '/faq'],
                    ['Contact', '/contact']
                ]}
                />

            <main className={style.main}>
                {children}
            </main>

            <footer className={style.footer}>
                <p style={{textAlign: 'center', marginTop: '20px'}}><span>©Drama Fruit, 2021 | <Link href="/terms-and-conditions"><a>Terms and Conditions</a></Link> | <Link href="/privacy-policy"><a>Privacy Policy</a></Link></span></p>
                <p style={{width: '100%', textAlign: 'center', marginBottom: '80px'}}>built by <a href="https://thepetersweeney.com">thepetersweeney.com</a></p>
            </footer>

        </>
    )
}

export default Layout