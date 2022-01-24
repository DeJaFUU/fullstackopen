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


  return (
    <div className="App">
      <form>find countries <input  value={newName} onChange={handleNameChange}/> </form>
      <p>{newName}</p>
      <ul>
        {countries
          .filter(country => country.name.common.toLowerCase().includes(newName))
          .map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
    </div>
  );
}

export default App;
