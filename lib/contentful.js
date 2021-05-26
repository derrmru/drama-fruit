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

//update stock entry in contentful product
export const updateStock = async (environment_id, entry_id, num) => {
    const management = require('contentful-management').createClient({
        accessToken: process.env.NEXY_PUBLIC_CONTENT_MANAGEMENT_KEY
    })
    management.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
        .then((space) => space.getEnvironment(environment_id))
        .then((envir) => envir.getEntry(entry_id))
        .then((entry) => {
            //finish this when ready to implement
            console.log(entry.fields.stock['en-GB'] = entry.fields.stock['en-GB'] + num)
        })
}