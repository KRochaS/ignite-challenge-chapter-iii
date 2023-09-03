/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FiCalendar, FiUser } from "react-icons/fi";
import Header from '../components/Header';


import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';



interface Post {
    uid?: string;
    first_publication_date: string | null;
    data: {
        title: string;
        subtitle: string;
        author: string;
    };
}

interface PostPagination {
    next_page: string;
    results: Post[];
}

interface HomeProps {
    postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
    const [posts, setPosts] = useState<Post[]>(postsPagination.results);
    const [nextPage, setNextPage] = useState(postsPagination.next_page);

    function handleLoadMorePages(): void {
        fetch(nextPage)
          .then(response => response.json())
          .then(responseData => {
            setNextPage(responseData.next_page);
    
            const results = responseData.results.map(post => {
              return {
                uid: post.uid,
                first_publication_date: post.first_publication_date,
                data: {
                  title: post.data.title,
                  subtitle: post.data.subtitle,
                  author: post.data.author,
                },
              };
            });
    
            setPosts([...posts, ...results]);
          });
      }

    return (
        <>
            <Head>
                <title> Home | spacetraveling. </title>
            </Head>
            <main className={styles.contentContainer}>
                <Header />

                <div>

                    {posts.map(post => (
                        <article key={post.uid} className={styles.article}>
                              <Link key={post.uid} href={`/post/${post.uid}`}>
                                <a>
                                    <h1>
                                        {post.data.title}
                                    </h1>
                                    <p>{post.data.subtitle}</p>
                                    <div>
                                        <span>
                                            <FiCalendar />
                                            {format(
                                                new Date(post.first_publication_date),
                                                'dd MMM yyyy',
                                                {
                                                    locale: ptBR,
                                                }
                                            )}</span>
                                        <span> <FiUser /> {post.data.author}</span>
                                    </div>

                                </a>
                            </Link>
                        </article>
                    ))}




                    {
                        nextPage && (
                            <button className={styles.button} type='button' onClick={handleLoadMorePages}>
                                Carregar mais posts
                            </button>
                        )
                    }

                </div>
            </main>


        </>
    )
}

export const getStaticProps = async () => {
    const prismic = getPrismicClient({});
    const postsResponse = await prismic.getByType('post', {
        pageSize: 2,
    });

    const posts = postsResponse.results.map((post) => {
        return {
            uid: post.uid,
            first_publication_date: post.first_publication_date,
            data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                author: post.data.author,
            }
        }
    })

    const postsPagination = {
        next_page: postsResponse.next_page,
        results: posts
    }

    return {
        props: {
            postsPagination,
        },
        revalidate: 60 * 60 * 24 // 24h
    }

};

