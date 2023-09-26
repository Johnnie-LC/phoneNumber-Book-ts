import React, { useState } from 'react'
import { type Contact } from '../types'
import { ID_PLACEHOLDER, PLACEHOLDER } from '../constants'

interface Props {
  onAddContact: (newContact: Contact) => void
}

function ContactForm ({ onAddContact }: Props): JSX.Element {
  const [contact, setContact] = useState<{
    firstName: string
    lastName: string
    phoneNumber: string
  }>({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID()
    }

    onAddContact(newContact)

    setContact({
      firstName: '',
      lastName: '',
      phoneNumber: ''
    })
  }

  const handleContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    console.log({ id, value })
    setContact((prevContact) => ({
      ...prevContact,
      [id]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id={ID_PLACEHOLDER.firstName}
        placeholder={PLACEHOLDER.firstName}
        value={contact.firstName}
        onChange={handleContact}
        required
      />
      <input
        type="text"
        id={ID_PLACEHOLDER.lastName}
        placeholder={PLACEHOLDER.lastName}
        value={contact.lastName}
        onChange={handleContact}
        required
      />
      <input
        type="tel"
        id={ID_PLACEHOLDER.phoneNumber}
        placeholder={PLACEHOLDER.phoneNumber}
        value={contact.phoneNumber}
        onChange={handleContact}
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  )
}

export default ContactForm
