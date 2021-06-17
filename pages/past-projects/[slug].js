import Head from "next/head"
import Layout from '../../components/templates/Layout'
import { client } from '../../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import PageTitle from '../../components/PageTitle'
import style from '../../styles/PastProject.module.css'

export default function Slug({ post }) {
    return (
        <Layout>
            <Head>
                <title>{post.fields.title} - Drama Fruit</title>
                {post && <meta name="description" content={post.fields.seoDescription} />}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={style.ppContainer + ' fade-in'}>
                <PageTitle title={post.fields.title} />
                {
                    post.fields.body.content.map((paragraph, i) => {
                        console.log(paragraph)
                        if (paragraph.nodeType === 'embedded-asset-block') {
                            return <div
                                key={'paragraph' + i}
                                className={style.paragraph}
                                style={{ textAlign: 'center' }}
                            >
                                <img
                                    key={'paragraph' + i}
                                    src={paragraph.data.target.fields.file.url}
                                    width="50%"
                                    height="auto"
                                    style={{ margin: 'auto' }}
                                />
                            </div>
                        } else {
                            return <div
                                key={'paragraph' + i}
                                className={style.paragraph}
                            >
                                {documentToReactComponents(paragraph)}
                            </div>
                        }
                    })
                }
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    // Fetch all results where `fields.slug` is equal to the `slug` param
    const result = await client
        .getEntries({
            content_type: "blog",
            "fields.slug": context.params.slug,
        })
        .then((response) => response.items)

    // Since `slug` was set to be a unique field, we can be confident that
    // the only result in the query is the correct post.
    const post = result.pop()

    // If nothing was found, return an empty object for props, or else there would
    // be an error when Next tries to serialize an `undefined` value to JSON.
    if (!post) {
        return { props: {} }
    }

    // Return the post as props
    return {
        props: {
            post,
        },
    }
}

export async function getStaticPaths() {

    // Query Contentful for all blog posts in the space
    const posts = await client
        .getEntries({ content_type: "blog" })
        .then((response) => response.items)

    // Map the result of that query to a list of slugs.
    // This will give Next the list of all blog post pages that need to be
    // rendered at build time.
    const paths = posts.map(({ fields: { slug } }) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}