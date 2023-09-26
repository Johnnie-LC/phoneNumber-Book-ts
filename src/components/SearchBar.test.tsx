import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect } from 'vitest'
import { suite, test } from '@vitest/runner'
import SearchBar from './SearchBar'
import { type Contact } from '../types'

suite('SearchBar', () => {
  afterEach(cleanup)

  // Define una lista de contactos de ejemplo para las pruebas
  const user = userEvent.setup()

  const sampleContacts: Contact[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '987-654-3210'
    },
    {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      phoneNumber: '555-555-5555'
    }
  ]

  // Define una función de utilidad para renderizar el componente
  const renderSearchBar = (contacts: Contact[]) => {
    return render(<SearchBar contacts={contacts} />)
  }

  test('renders the search input', () => {
    const { getByPlaceholderText } = renderSearchBar(sampleContacts)

    expect(getByPlaceholderText('Search by Name')).toBeDefined()
  })

  test('handles search and displays results', async () => {
    renderSearchBar(sampleContacts)

    // Simula la entrada de texto en el campo de búsqueda
    const searchInput = screen.getByPlaceholderText('Search by Name')
    await user.type(searchInput, 'John')

    // Simula hacer clic en el botón de búsqueda
    const searchButton = screen.getByText('Search')
    await user.click(searchButton)

    // Verifica que los resultados se muestren correctamente
    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('123-456-7890')).toBeTruthy()

    // Verifica que otros resultados no estén presentes
    expect(screen.queryByText('Jane Smith')).toBeNull()
    expect(screen.queryByText('Alice Johnson')).toBeNull()
  })

  test('handles empty search and displays all contacts', async () => {
    const { getByText } = renderSearchBar(sampleContacts)

    // Simula hacer clic en el botón de búsqueda sin ingresar un término de búsqueda
    const searchButton = getByText('Search')
    await user.click(searchButton)

    // Verifica que todos los contactos se muestren
    expect(getByText('John Doe')).toBeDefined()
    expect(getByText('Jane Smith')).toBeDefined()
    expect(getByText('Alice Johnson')).toBeDefined()
  })
})
