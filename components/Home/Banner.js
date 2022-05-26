import Image from 'next/image'
import style from '../../styles/Home.module.css'

const Banner = ({
    items
}) => {
    return (
        <div className={style.bannerContainer + ' fade-in'}>
            <div className={style.bannerText + ' ' + style.mainText}>
                <h1>For Everyone<br />Unafraid<br />To Stand Out</h1>
            </div>
            <div className={style.bannerImage + ' ' + style.mainImage}>
                <Image
                    className={style.theImage}
                    src={`https:${items?.fields.bannerImage.fields.file.url}`}
                    alt={items?.fields.altDescription}
                    layout='responsive'
                    width={100}
                    height={100}
                    sizes='40vw'
                />
            </div>
        </div>
    )
}

export default Banner