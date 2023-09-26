import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect } from 'vitest'
import { suite, test } from '@vitest/runner'
import ContactForm from './ContactForm'
import { type Contact } from '../types'
import { PLACEHOLDER } from '../constants'

suite('ContactForm', () => {
  // Mock de la función onAddContact para capturar las llamadas
  let capturedContact: Contact | null = null
  const mockOnAddContact = (newContact: Contact) => {
    capturedContact = newContact
  }

  const user = userEvent.setup()

  const renderContactForm = () => {
    return render(<ContactForm onAddContact={mockOnAddContact} />)
  }

  // Limpia el contacto capturado antes de cada prueba
  beforeEach(() => {
    capturedContact = null
    renderContactForm()
  })

  afterEach(cleanup)

  test('renders the contact form with placeholders', () => {
    expect(screen.getByPlaceholderText(PLACEHOLDER.firstName)).toBeDefined()
    expect(screen.getByPlaceholderText(PLACEHOLDER.lastName)).toBeDefined()
    expect(screen.getByPlaceholderText(PLACEHOLDER.phoneNumber)).toBeDefined()
  })

  test('handles input changes', async () => {
    const firstNameInput = screen.getByPlaceholderText(PLACEHOLDER.firstName)
    const lastNameInput = screen.getByPlaceholderText(PLACEHOLDER.lastName)
    const phoneNumberInput = screen.getByPlaceholderText(PLACEHOLDER.phoneNumber)

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(phoneNumberInput, '123-456-7890')

    expect(firstNameInput).toBeTruthy()
    expect(lastNameInput).toBeTruthy()
    expect(phoneNumberInput).toBeTruthy()
  })

  test('submits the form with the correct contact', async () => {
    const firstNameInput = screen.getByPlaceholderText(PLACEHOLDER.firstName)
    const lastNameInput = screen.getByPlaceholderText(PLACEHOLDER.lastName)
    const phoneNumberInput = screen.getByPlaceholderText(PLACEHOLDER.phoneNumber)

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(phoneNumberInput, '123-456-7890')

    const addButton = screen.getByText('Add Contact')
    await user.click(addButton)

    expect(capturedContact).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123-456-7890',
      id: expect.any(String) // Verifica que se haya generado un ID
    })
  })
})
