/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';




interface Post {
    first_publication_date: string | null;
    data: {
        title: string;
        banner: {
            url: string;
        };
        author: string;
        content: {
            heading: string;
            body: {
                text: string;
            }[];
        }[];
    };
}

interface PostProps {
    post: Post;
}

export default function Post({ post }: PostProps) {
    const route = useRouter();

    if (route.isFallback) {
        return <p>Carregando...</p>;
    }

    const totalTime = post.data.content.reduce((acc, content) => {
        const total = RichText.asText(content.body).split(' ');

        const min = Math.ceil(total.length / 200);
        return acc + min;
    }, 0);

    return (
        <>
            <Head>
                <title>Post | spacetraveling</title>
            </Head>
            <div className={styles.contentContainer}>
                <Header />
            </div>


            <div className={styles.banner}>
                <img src={post.data?.banner.url} alt="banner" />
            </div>

            <main className={styles.contentPost}>

                <article>
                    <h1> {post.data?.title} </h1>

                    <div>
                        <span>
                            <FiCalendar />

                            {format(
                                new Date(post?.first_publication_date || new Date()),
                                'dd MMM yyyy',
                                {
                                    locale: ptBR,
                                }
                            )}
                        </span>
                        <span> <FiUser /> {post.data?.author}</span>

                        <span> <FiClock /> {totalTime} min</span>
                    </div>

                    <section className={styles.postContent}>
                        {post.data.content.map(p => (
                            <div key={p.heading}>
                                <strong>{p.heading}</strong>
                                <div className={styles.content}
                                    dangerouslySetInnerHTML={{ __html: RichText.asHtml(p.body) }}
                                />
                            </div>
                        ))}
                    </section>
                </article>
            </main>

        </>
    )

}

export const getStaticPaths = async () => {
    const prismic = getPrismicClient({});
    const postsResponse = await prismic.getByType('post', {
        pageSize: 2,
    });

    const paths = postsResponse.results.map(post => ({
        params: { slug: post.uid },
    }));

    return {
        paths,
        fallback: true,
    };

};

export const getStaticProps = async ({ params }) => {
    const { slug } = params;
    const prismic = getPrismicClient({});
    const response = await prismic.getByUID('post', String(slug), {});




    const post = {
        first_publication_date: response.first_publication_date,
        data: {
            title: response.data.title,
            banner: {
                url: response.data.banner.url,
            },
            author: response.data.author,
            content: [...response.data.content],
        }
    }


    return {
        props: {
            post
        },
        revalidate: 60 * 60 * 24 // 24h
    }

};
