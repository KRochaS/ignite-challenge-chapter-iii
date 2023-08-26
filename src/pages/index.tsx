/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import Head from 'next/head';
import { FiCalendar, FiUser } from "react-icons/fi";
import Header from '../components/Header';


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
                <div>
                    <h1>
                    Como utilizar Hooks  
                    </h1>
                    <p>Pensando em sincronização em vez de ciclos de vida.</p>
                    <div>
                        <span> <FiCalendar /> 15 Mar 2021</span>
                        <span> <FiUser /> Joseph Oliveira</span>
                    </div>
                </div>
            </article>

            <article className={styles.article}>
                <div>
                    <h1>
                    Como utilizar Hooks  
                    </h1>
                    <p>Pensando em sincronização em vez de ciclos de vida.</p>
                    <div>
                        <span> <FiCalendar /> 15 Mar 2021</span>
                        <span> <FiUser /> Joseph Oliveira</span>
                    </div>
                </div>
            </article>

            <article className={styles.article}>
                <div>
                    <h1>
                    Como utilizar Hooks  
                    </h1>
                    <p>Pensando em sincronização em vez de ciclos de vida.</p>
                    <div>
                        <span> <FiCalendar /> 15 Mar 2021</span>
                        <span> <FiUser /> Joseph Oliveira</span>
                    </div>
                </div>
            </article>
           </div>
           </main>

           
        </>
    )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
