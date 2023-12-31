/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import Link from 'next/link';
import styles from './header.module.scss';



export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
            <a>
            <img src="/images/logo.svg" alt="logo" />

            </a>
            </Link>
        </header>
    )
}
