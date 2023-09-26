import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactList from './ContactList'
import { type Contact } from '../types'

describe('ContactList component', () => {
  it('should render a list of contacts', () => {
    const contacts: Contact[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123-456-7890',
        id: 1
      },
      {
        firstName: 'Jane',
        lastName: 'Does',
        phoneNumber: '987-654-3210',
        id: 2
      }
    ]

    render(<ContactList contacts={contacts} />)

    expect(screen.getByRole('heading')).toBeDefined()
    expect(screen.getByText('Contact List')).toBeDefined()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('John Doe')).toBeDefined()
    expect(screen.getByText('Jane Does')).toBeDefined()
  })
})
