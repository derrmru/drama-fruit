import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../../styles/Home.module.css'

const ShopCase = ({
    items
}) => {
    console.log(items)
    return (
        <div className={style.bannerContainer + ' fade-in ' + style.blogReverse}>
            <div 
                className={style.bannerText + ' ' + style.blogText}
                style={{borderColor: 'var(--drama-yellow)'}}
                >
                <div>
                    {documentToReactComponents(items && items.fields.blogText)}
                    <Link href="/past-projects"><a>Blog &#8594;</a></Link>
                </div>
            </div>
            <div 
                className={style.bannerImage}
                style={{borderColor: 'var(--drama-yellow)'}}
                >
                <img
                    className={style.theImage} 
                    src={items && items.fields.bannerImage.fields.file.url} 
                    />
            </div>
        </div>
    )
}

export default ShopCase