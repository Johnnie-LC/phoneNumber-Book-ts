import { useState } from 'react'
import ContactForm from './components/ContactForm'
import SearchBar from './components/SearchBar'
import ContactList from './components/ContactList'
import './App.css'
import { type Contact } from './types'

const initialContacts: Contact[] = [
  {
    firstName: 'Carlos ',
    lastName: 'Santana',
    phoneNumber: '333-999-1111',
    id: 1
  },
  {
    firstName: 'Sam',
    lastName: 'Wickle',
    phoneNumber: '333-845-4752',
    id: 2
  },
  {
    firstName: 'Lickov ',
    lastName: 'Volst',
    phoneNumber: '333-542-8989',
    id: 3
  }
]

function App () {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)

  const addContact = (newContact: Contact) => {
    setContacts([...contacts, newContact])
  }

  return (
    <div>
      <h1>PhoneNumber Book App</h1>
      <ContactForm onAddContact={addContact} />
      <SearchBar contacts={contacts}/>
      <ContactList contacts={contacts} />
    </div>
  )
}

export default App
