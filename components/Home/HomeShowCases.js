import Link from 'next/link'
import style from '../../styles/Home.module.css'

const HomeShowCases = ({ items }) => {
    return (
      <div className={style.homeProductsContainer + ' fade-in'}>
        {//fetch the selected products to showcase on the homepage
            items && items.fields.showCases.map((item, i) => {
                return <div
                  key={'homepage-items' + i}
                  className={style.homeProduct}
                >
                  <div 
                    className={style.itemCard}
                    >
                    <Link href={'/drama-shop/' + item.fields.slug}>
                      <a>
                        <img
                          src={item.fields.productImage.fields.file.url}
                          alt={item.fields.imageAltText || ''}
                          className={style.cardImage}
                          object-fit="cover"
                          width="100%"
                          height="100%"
                        />
                      </a>
                    </Link>
                  </div>
                  <div>{item.fields.title}</div>
                  <div>€{item.fields.productPrice}</div>
                </div>
              })
            }
        </div>
    )
}

export default HomeShowCases