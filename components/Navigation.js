import Cart from './Cart'
import Search from './Search'
import Link from 'next/link'
import Image from 'next/image'
import style from './Navigation.module.css'

const Navigation = ({ navItems }) => {
    return (
        <>
            <div className={style.logoTitleIcons + ' fade-in'}>
                <div className={style.iconsContainer}></div>
                
                <Link href="/">
                    <a style={{textDecoration: 'none'}}>
                        <span className={style.headerTitle}>
                            <h1>Drama</h1> 
                            <div style={{width: '100px'}} className={style.bannerLogo}>
                                <Image
                                    src="/images/drama_fruit_logo.png"
                                    alt="Drama Fruit Logo"
                                    layout="responsive"
                                    width={"100"}
                                    height={"100"}
                                />
                            </div>
                            <h1>Fruit</h1>
                        </span>
                    </a>
                </Link>
                <div
                    className={style.iconsContainer}
                    >
                    <div className={style.cartOverlay}>
                        <Search />
                    </div>
                    <Cart />
                </div>
            </div>
            <hr className={style.navHR} />
                <nav className={style.desktopNav}>
                    {
                        navItems.map((item, i) => {
                            return <Link 
                                key={'nav-item' + i} 
                                href={item[1]}
                                >
                                <a>
                                    <li>
                                        {item[0]}
                                    </li>
                                </a>
                            </Link>
                        })
                    }
                </nav>
            <hr className={style.navHR} />
        </>
    )
}

export default Navigation