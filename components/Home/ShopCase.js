import Link from 'next/link'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../../styles/Home.module.css'

const ShopCase = ({
    items
}) => {
    return (
        <div className={style.bannerContainer + ' fade-in ' + style.shopContainer}>
            <div className={style.bannerImage + ' ' + style.shopImage}>
                <Image
                    className={style.theImage}
                    src={`https:${items?.fields.shopImage.fields.file.url}`}
                    alt={items?.fields.shopAltDescription}
                    layout='responsive'
                    width={100}
                    height={100}
                    sizes='30vw'
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