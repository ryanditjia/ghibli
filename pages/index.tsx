import Link from 'next/link'
import Image from 'next/image'
import type { GetStaticProps, NextPage } from 'next'

import { Film } from '../lib/types'

import styles from './index.module.css'

type HomeProps = {
  films: Film[]
}

const Home: NextPage<HomeProps> = ({ films }) => {
  return (
    <main className={styles.main}>
      <h1>Studio Ghibli Films</h1>

      {films.map((film) => (
        <article key={film.id} className={styles.film}>
          <Link href={`film/${film.id}`}>
            <a>
              <div className={styles.image_container}>
                <Image
                  src={film.image}
                  alt={film.title}
                  width={100}
                  height={150}
                  objectFit="contain"
                  className={styles.image}
                />
              </div>

              <div className={styles.detail_container}>
                <h2 className={styles.title}>
                  {film.title} ({film.release_date})
                </h2>
                <h3 className={styles.japanese_title}>{film.original_title}</h3>
                <p className={styles.description}>{film.description}</p>
              </div>
            </a>
          </Link>
        </article>
      ))}
    </main>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const res = await fetch('https://ghibliapi.herokuapp.com/films')
  const films = await res.json()

  return {
    props: {
      films,
    },
  }
}
