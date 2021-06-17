import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../../styles/Home.module.css'

const ShopCase = ({
    items
}) => {
    console.log(items)
    return (
        <div className={style.bannerContainer + ' fade-in'}>
            <div 
                className={style.bannerImage}
                style={{borderColor: 'var(--drama-pink)'}}
                >
                <img
                    className={style.theImage} 
                    src={items && items.fields.bannerImage.fields.file.url} 
                    />
            </div>
            <div 
                className={style.bannerText + ' ' + style.shopText}
                style={{borderColor: 'var(--drama-pink)'}}
                >
                <div>
                    {documentToReactComponents(items && items.fields.shopText)}
                    <Link href="/drama-shop"><a>Shop &#8594;</a></Link>
                </div>
            </div>
        </div>
    )
}

export default ShopCase