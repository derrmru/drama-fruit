const Product = (productData) => {
    console.log(productData)
    return `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${productData.fields.title}",
        "image": ["${productData.fields.productImage.fields.file.url}"],
        "description": "${productData.fields.seoDescription}",
        "brand": {
            "@type": "Brand",
            "name": "Drama Fruit"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://www.dramafruit.com/drama-shop/${productData.fields.slug}/",
            "priceCurrency": "EUR",
            "price": "${productData.fields.productPrice}",
            "seller": {
                "@type": "Organization",
                "name": "Drama Fruit"
            }
        }
    }`
}

export default Product