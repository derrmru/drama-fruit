export const org = () => {
    return `{
                "@context": "http://schema.org",
                "@type": "Organization",
                "url": "https://www.dramafruit.com",
                "name": "Drama Fruit",
                "logo": "https://www.dramafruit.com/images/drama_fruit_triangle.svg",
                "contactPoint":
                    [{
                        "@type": "ContactPoint",
                        "email": "play@dramafruit.com",
                        "contactType": "customer service"
                    }],
            }`
}