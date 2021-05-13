import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const productsDirectory = path.join(process.cwd(), 'content/products')

export function getProductsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(productsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(productsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getProductData(slug) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(productsDirectory)

  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(productsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })

  // Combine the data with the id
  // Sort posts by date
  return allPostsData.filter(post => post.product_name.toLowerCase().split(' ').join('-') === slug)[0]
}

export function getAllProductIds() {
  const fileNames = fs.readdirSync(productsDirectory)
  return fileNames.map(fileName => {
    const fullPath = path.join(productsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    return {
      params: {//id is sluggerised product name
        id: matterResult.data.product_name.toLowerCase().split(' ').join('-')
      }
    }
  })
}