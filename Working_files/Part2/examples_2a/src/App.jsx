import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from './services/notes'
import Footer from "./components/Footer";

const Notification = ({message}) => {
  if(message === null){
    return null;
  };

  return(
    <div className="error">
      {message}
    </div>
  );
};



const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");


  useEffect(() => {
    console.log(noteService.getAll())
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
      
  }, [])


  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important);
  
  const addNote = (event) => {
    event.preventDefault();
    console.log("Button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }
    noteService
      .create(noteObject)
      .then(returnedNote  => {
        setNotes(notes.concat(returnedNote ))
        setNewNote("")
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note));
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })
    console.log(`Importance of ${id} needs to be toggled`);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
      <Footer />
    </div>
  );
};

export default App;