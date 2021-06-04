//create client
export const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

//fetch posts
export const fetchEntries = async (type) => {
    const entries = await client.getEntries(type)
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

//fetch entry
export const getEntry = async (id) => {
    const entry = await client.getEntry(id)
    if (entry) return entry
}

export const updateStock = async (id, num) => {
    const stock = require('contentful-management').createClient({
        accessToken: process.env.NEXT_PUBLIC_CONTENT_MANAGEMENT_KEY
    })

    stock.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
        .then((space) => space.getEnvironment('master'))
        .then((envir) => envir.getEntry(id))
        .then((entry) => {
            entry.fields.stock['en-GB'] -= num
            entry.update()
            return entry.publish()
        })
        .catch((error) => console.log(error))
}