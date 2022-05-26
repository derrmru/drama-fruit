import Image from 'next/image'
import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../../styles/Home.module.css'

const ShopCase = ({
    items
}) => {
    return (
        <div className={style.bannerContainer + ' fade-in ' + style.blogReverse}>
            <div className={style.bannerText + ' ' + style.blogText}>
                <div>
                    {documentToReactComponents(items && items.fields.blogText)}
                    <Link href="/past-projects"><a>Blog &#8594;</a></Link>
                </div>
            </div>
            <div className={style.bannerImage + ' ' + style.blogImage}>
                <Image
                    className={style.theImage}
                    src={`https:${items?.fields.blogImage.fields.file.url}`}
                    alt={items?.fields.blogAltDescription}
                    layout='responsive'
                    width={100}
                    height={100}
                    sizes='30vw'
                />
            </div>
        </div>
    )
}

export default ShopCase