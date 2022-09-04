import { render, screen } from '@testing-library/react'

import FilmsPage from './index.page'
import filmsMock from '../lib/mocks/films.json'

describe('Films page', () => {
  it('should render correctly', () => {
    render(<FilmsPage films={filmsMock} />)

    const allFilms = screen.getAllByRole('article')
    expect(allFilms).toHaveLength(filmsMock.length)

    expect(
      screen.getByRole('heading', { name: 'Studio Ghibli Films' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Castle in the Sky (1986)',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /castle in the sky/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/the orphan sheeta inherited a mysterious crystal/i)
    ).toBeInTheDocument()
  })
})
