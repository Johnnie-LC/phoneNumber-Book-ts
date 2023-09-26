import { type Contact } from '../types'

interface Props {
  contacts: Contact[]
}

function ContactList ({ contacts }: Props): JSX.Element {
  return (
    <div className="contact-list-container">
      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <span>{contact.firstName} {contact.lastName}</span> <span>{contact.phoneNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContactList
