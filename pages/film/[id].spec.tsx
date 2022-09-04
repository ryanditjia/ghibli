import { render, screen } from '@testing-library/react'

import FilmDetailPage from './[id]'
import filmMock from '../../lib/mocks/castle-in-the-sky.json'
import charactersMock from '../../lib/mocks/castle-in-the-sky-chars.json'

describe('Film detail page', () => {
  it('should render correctly', () => {
    render(<FilmDetailPage film={filmMock} characters={charactersMock} />)

    expect(
      screen.getByRole('link', { name: /‹ all films/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Castle in the Sky (1986)' })
    ).toBeInTheDocument()

    expect(screen.getAllByRole('listitem')).toHaveLength(charactersMock.length)

    charactersMock.forEach((c) => {
      expect(screen.getByText(c)).toBeInTheDocument()
    })
  })
})
