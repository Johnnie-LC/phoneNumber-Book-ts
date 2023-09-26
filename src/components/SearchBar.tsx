import { useState } from 'react'
import { type Contact } from '../types'

interface Props {
  contacts: Contact[]
}

function SearchBar ({ contacts }: Props): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Contact[]>([])

  const handleSearch = () => {
    const filteredContacts = contacts.filter((contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(filteredContacts)
  }

  return (
    <div className="search-container">
      <div className="search-container-input">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <span>{result.firstName} {result.lastName}</span>
            <span>{result.phoneNumber}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar
