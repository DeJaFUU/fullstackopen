import react, {useState, useEffect} from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newName.toLowerCase()))

  const Countries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length === 1) {
      return (
        <div>
      <h1>{filteredCountries[0].name.common}</h1>
      <p>Capital: {filteredCountries[0].capital}
      <br/>Population: {filteredCountries[0].population}</p>
     <h2>Languages</h2>  
      <ul>
        {Object.values(filteredCountries[0].languages).map(language => <li key={language}>{language}</li>)}
     </ul> 
     <br />
      <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].name.common} />
      </div>
      )
    } else if (filteredCountries.length > 1) {
      return <ul>{filteredCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)}</ul>
    } else {
      return <p>No matches</p>
  }
}

  return (
    <div className="App">
      <form>find countries <input  value={newName} onChange={handleNameChange}/> </form>
      <p>{newName}</p>
      <ul>
        <Countries />
      </ul>
    </div>
  );
}

export default App;
