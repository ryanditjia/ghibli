import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

import { Film } from '../../lib/types'

import styles from './[id].module.css'

type DetailProps = {
  film: Film
  characters: string[] // just names for now
}

const FilmDetail: NextPage<DetailProps> = ({ film, characters }) => {
  return (
    <main className={styles.main}>
      <Link href="/">
        <a>&lsaquo; All films</a>
      </Link>

      <h1>
        {film.title} ({film.release_date})
      </h1>

      <h2>Characters</h2>
      <ul>
        {characters.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </main>
  )
}

export default FilmDetail

export const getStaticProps: GetStaticProps<DetailProps> = async (context) => {
  const filmId = context.params?.id
  const res = await fetch(`https://ghibliapi.herokuapp.com/films/${filmId}`)
  const film: Film = await res.json()

  let characters: string[]

  // "Grave of the Fireflies" has a slightly different
  // `people` field, and I don’t have time to fix it for this demo
  // this if block is workaround
  if (film.people[0] === 'https://ghibliapi.herokuapp.com/people/') {
    characters = []
  } else {
    // parallel fetch all characters data
    const allCharactersPromises = film.people.map((character) =>
      fetch(character).then((res) => res.json())
    )
    characters = (await Promise.all(allCharactersPromises)).map(
      (c) => c.name // unpack the name only
    )

  }

  return {
    props: {
      film,
      characters,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://ghibliapi.herokuapp.com/films')
  const films: Film[] = await res.json()

  const paths = films.map((film) => ({
    params: { id: film.id },
  }))

  return {
    paths,
    fallback: false,
  }
}
