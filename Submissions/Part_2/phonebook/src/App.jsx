import { useState, useEffect } from 'react'
import Persons from './components/persons';
import Filter from './components/filter';
import PersonForm from './components/personform';
import axios from 'axios';
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
            setNewNotification({message: `Changed ${copy.name}'s phone number to ${copy.number}`, type: "change"});
            setTimeout(() => {
              setNewNotification({message:null, type: null});
            }, 5000);
          });
      }
    }else{
      const personObject = { name: newName, number: newNumber };
      personServices
        .addNew(personObject)
        .then(response => {
          setPersons(persons.concat(response));
          setNewNotification({message: `Added ${response.name}`, type: "add"});
          setTimeout(() => {
              setNewNotification({message: null, type: null});
            }, 5000);
          setNewName("");
          setNewNumber("");
        });
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
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          setNewNotification({message: `Deleted ${name}`, type: "delete"});
          setTimeout(() => {
              setNewNotification({message: null, type: null});
            }, 5000);
        })
        .catch( () => {
          setNewNotification({message: `Information of ${name} has already been removed from server`, type: "delete"});
          setPersons(persons.filter(person => person.id !== id));
          setTimeout(() => {
            setNewNotification({message: null, type: null});
          }, 5000)
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