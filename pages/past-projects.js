import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'
import { fetchEntries } from '../lib/contentful'
import Layout from '../components/templates/Layout'
import style from '../styles/News.module.css'

const News = () => {

    //fetch posts from contentful
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
          const allPosts = await fetchEntries({
            content_type: "blog",
        })
          setPosts([...allPosts])
        }
        getPosts()
    }, [])

    //increment through posts
    const [inc, setInc] = useState(0)
    const postsPerPage = 6;
    const increment = (direction) => {
        if (direction === 'up') {
            inc < posts.length - postsPerPage && setInc(inc + postsPerPage)
        }
        if (direction === 'down') {
            inc >= postsPerPage && setInc(inc - postsPerPage)
        }
    }

    return (
        <div>
            <Head>
                <title>Past Projects - Drama Fruit</title>
                <meta name="description" content="Latest news from Drama Fruit" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <PageTitle title="Past Projects" />
                <div className={style.postContainer}>
                    {
                        posts
                            .slice(inc, inc + postsPerPage)
                            .map((post, i) => {
                            return <div
                                key={'blogPost' + i}
                                className={style.card + ' fade-in'}
                                >
                                    <img 
                                        src={post.fields.mainImage.fields.file.url}
                                        alt={post.fields.mainImage.fields.description || ''}
                                        width="90%"
                                        height="auto"
                                        />
                                    <h3 className={style.cardTitle}>{post.fields.title}</h3>
                                    <p>{post.fields.extract}</p>
                                    <Link
                                        href={'/past-projects/' + post.fields.slug}
                                        >
                                        <a className={style.continueReading}>
                                            Continue Reading
                                        </a>
                                    </Link>
                            </div>
                        })
                    }
                </div>
                {
                    posts.length > postsPerPage && <div
                        className={style.navButtons}
                        >
                        <button
                            onClick={() => increment('down')}
                            >
                            Previous
                        </button>
                        <button
                            onClick={() => increment('up')}
                            >
                            Next
                        </button>
                    </div>
                }
            </Layout>
        </div>
    )
}

export default News