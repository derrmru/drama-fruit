//update stock entry in contentful product
export const updateStock = async (environment_id, entry_id, num) => {
    const management = require('contentful-management').createClient({
        accessToken: process.env.NEXT_PUBLIC_CONTENT_MANAGEMENT_KEY
    })
    management.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
        .then((space) => space.getEnvironment(environment_id))
        .then((envir) => envir.getEntry(entry_id))
        .then((entry) => {
            //finish this when ready to implement
            entry.fields.stock['en-GB'] -= num
            console.log(entry)
            return entry.update()
        })
        .then((entry) => console.log(entry))
        .catch((error) => console.log(error))
}