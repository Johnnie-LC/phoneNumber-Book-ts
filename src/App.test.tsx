import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect } from 'vitest'
import { suite, test } from '@vitest/runner'
import App from './App'

suite('App', () => {
  afterEach(cleanup)
  const user = userEvent.setup()
  // Define una función de utilidad para renderizar la aplicación
  const renderApp = () => {
    return render(<App />)
  }

  test('renders the app header', () => {
    const { getByText } = renderApp()
    screen.debug()

    expect(getByText('PhoneNumber Book App')).toBeDefined()
  })

  test('adds a new contact', async () => {
    const { getByText, getByPlaceholderText } = renderApp()

    // Ingresa valores en el formulario de contacto
    await user.type(getByPlaceholderText('First Name'), 'John')
    await user.type(getByPlaceholderText('Last Name'), 'Doe')
    await user.type(getByPlaceholderText('Phone Number'), '555-555-5555')

    // Envía el formulario
    const addButton = getByText('Add Contact')
    await user.click(addButton)

    // Verifica que el nuevo contacto se haya agregado a la lista
    expect(getByText('John Doe')).toBeDefined()
    expect(getByText('555-555-5555')).toBeDefined()
  })

  test('searches for a contact', async () => {
    const { getByPlaceholderText, getByText } = renderApp()

    // Agrega un nuevo contacto
    await user.type(getByPlaceholderText('First Name'), 'Alice')
    await user.type(getByPlaceholderText('Last Name'), 'Johnson')
    await user.type(getByPlaceholderText('Phone Number'), '777-777-7777')
    const addButton = getByText('Add Contact')
    await user.click(addButton)

    // Realiza una búsqueda
    await user.type(getByPlaceholderText('Search by Name'), 'Alice')
    const searchButton = getByText('Search')
    await user.click(searchButton)

    // Verifica que se encuentre el contacto buscado
    expect(screen.getAllByText('Alice Johnson').length).toBe(2)
    expect(screen.getAllByText('777-777-7777').length).toBe(2)
  })

  test('displays all contacts with an empty search', async () => {
    renderApp()

    // Realiza una búsqueda vacía
    const searchButton = screen.getByText('Search')
    await user.click(searchButton)
    screen.debug()
    // Verifica que todos los contactos se muestren
    expect(screen.getAllByText('Sam Wickle').length).toBe(2)
    expect(screen.getAllByText('Lickov Volst').length).toBe(2)
  })
})
