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
                    <a style={{textDecoration: 'none', color: 'black'}}>
                        <span className={style.headerTitle}>
                            <div className={style.bannerLogo}>
                                <Image
                                    src="/images/drama_fruit_logo.png"
                                    alt="Drama Fruit Logo"
                                    layout="responsive"
                                    width={"812"}
                                    height={"307"}
                                />
                            </div>
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
                    <ul style={{
                        listStyleType: 'none', 
                        width: '90%',
                        margin: '0',
                        padding: '0',
                        display: 'flex', 
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        textDecoration: 'none',
                        fontSize: 'inherit'

                    }}>
                    {
                        navItems.map((item, i) => {
                            return <li 
                                key={'nav-item' + i} 
                                >
                                <Link 
                                    href={item[1]}
                                    >
                                    <a style={{textDecoration: 'none'}}>
                                        {item[0]}
                                    </a>
                                </Link>
                            </li>
                        })
                    }
                    </ul>
                </nav>
            <hr className={style.navHR} />
        </>
    )
}

export default Navigation