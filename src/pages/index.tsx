/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import Head from 'next/head';
import Link from 'next/link';
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

export default function Home() {
    return (
        <>
            <Head>
                <title> Home | spacetraveling. </title>
            </Head>
            <main className={styles.contentContainer}>
                <Header />

                <div>

                    <article className={styles.article}>
                        <Link href={'#'}>
                            <a>
                                <h1>
                                    Como utilizar Hooks
                                </h1>
                                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                                <div>
                                    <span> <FiCalendar /> 15 Mar 2021</span>
                                    <span> <FiUser /> Joseph Oliveira</span>
                                </div>

                            </a>
                        </Link>
                    </article>

                    <article className={styles.article}>
                        <Link href='#'>
                            <a>
                                <h1>
                                    Criando um app CRA do zero
                                </h1>
                                <p> Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
                                <div>
                                    <span> <FiCalendar /> 15 Mar 2021</span>
                                    <span> <FiUser /> Joseph Oliveira</span>
                                </div>

                            </a>
                        </Link>
                    </article>

                    <article className={styles.article}>
                        <Link href={'#'}>
                            <a>
                                <h1>
                                    Como utilizar Hooks
                                </h1>
                                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                                <div>
                                    <span> <FiCalendar /> 15 Mar 2021</span>
                                    <span> <FiUser /> Joseph Oliveira</span>
                                </div>

                            </a>
                        </Link>
                    </article>

                    <article className={styles.article}>
                        <Link href={'#'}>
                            <a>

                                <h1>
                                    Como utilizar Hooks
                                </h1>
                                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                                <div>
                                    <span> <FiCalendar /> 15 Mar 2021</span>
                                    <span> <FiUser /> Joseph Oliveira</span>
                                </div>

                            </a>
                        </Link>
                    </article>

                    <article className={styles.article}>
                        <Link href={'#'}>
                            <a>
                                <h1>
                                    Como utilizar Hooks
                                </h1>
                                <p>Pensando em sincronização em vez de ciclos de vida.</p>
                                <div>
                                    <span> <FiCalendar /> 15 Mar 2021</span>
                                    <span> <FiUser /> Joseph Oliveira</span>
                                </div>

                            </a>
                        </Link>
                    </article>

                    <button className={styles.button} type='button'>
                        Carregar mais posts
                    </button>
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

const postPagination = {
    next_page: postsResponse.next_page,
    results: posts
}

return {
    props: {
        postPagination,
    },
    revalidate: 60 * 60 * 24 // 24h
}
  // TODO
};

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
