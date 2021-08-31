import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../../styles/Home.module.css'

const ShopCase = ({
    items
}) => {
    return (
        <div className={style.bannerContainer + ' fade-in ' + style.shopContainer}>
            <div className={style.bannerImage + ' ' + style.shopImage}>
                <img
                    className={style.theImage}
                    src={items && items.fields.shopImage.fields.file.url}
                    alt={items && items.fields.shopAltDescription}
                />
            </div>
            <div className={style.bannerText + ' ' + style.shopText}>
                <div>
                    {documentToReactComponents(items && items.fields.shopText)}
                    <Link href="/drama-shop"><a>Shop &#8594;</a></Link>
                </div>
            </div>
        </div>
    )
}

export default ShopCase