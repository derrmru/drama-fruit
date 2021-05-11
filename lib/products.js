import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const productsDirectory = path.join(process.cwd(), 'content/products')

export function getProducts() {
    const fileNames = fs.readdirSync(productsDirectory);
    const allProductsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(productsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    })
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else {
          return -1
        }
      })
}