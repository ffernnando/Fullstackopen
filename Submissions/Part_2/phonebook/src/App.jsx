import { useState, useEffect } from 'react'
import Persons from './components/persons';
import Filter from './components/filter';
import PersonForm from './components/personform';
import Notification from './components/notification';
import personServices from './services/persons';



const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        console.log("Retrieved persons: ", response)
        setPersons(response.concat({name: "Edsger Dijsktra", number: 987654321}));
        setNewNotification({message: null, type: null})
      })
  }, []);

  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNotification, setNewNotification] = useState({notification: null, type: null});

  const shownPersons = (newFilter != "") ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons;

  const showNotif = (notifContent, notifType) => {
    setNewNotification({message: notifContent, type: notifType});
    setTimeout(() => {
      setNewNotification({message: null, type: null});
    }, 5000);
  }

  //onSubmit event handler
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const copy = persons.find(person => person.name === newName)
    if(copy){
      if(window.confirm(`${copy.name} is already added to phonebook, replace the old number with a new one?`)){
        copy.number = newNumber;
        personServices
          .changePerson(copy.id, copy)
          .then(response => {
            setPersons(persons.map(person => person.id === response.id ? response : person));
            showNotif(`Changed ${copy.name}'s phone number to ${copy.number}`, "change")
          });
      }
    }else{
      const personObject = { name: newName, number: newNumber };
      personServices
        .addNew(personObject)
        .then(response => {
          setPersons(persons.concat(response));
          showNotif(`Added ${response.name}`, 'add')

          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          console.log("HELLO THERE! ", error.response.data.error)
          showNotif(error.response.data.error, 'error')

          setNewName("");
          setNewNumber("");
        })
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleDelete = (id, name="") => {
    console.log(id);
    if(window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)){
      personServices
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotif(`Deleted ${name}`, 'delete')
        })
        .catch( () => {
          showNotif(`Information of ${name} has already been removed from server`, 'delete')
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification.message} type={newNotification.type}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      <PersonForm handleFormSubmit={handleFormSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons shownPersons={shownPersons} handleDelete={handleDelete}/>      
    </div>
  )
}

export default App