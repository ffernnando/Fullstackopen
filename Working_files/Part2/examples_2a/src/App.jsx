import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from './services/notes'
import Footer from "./components/Footer";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";

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
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    console.log(noteService.getAll())
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
      
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important);
  
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote  => {
        setNotes(notes.concat(returnedNote ))
      })
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note));
      })
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })
    console.log(`Importance of ${id} needs to be toggled`);
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    console.log('Something sometimes happens')
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const noteForm = () => {
    return(
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      { user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={({target}) => setUsername(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{ user.name } logged-in <button onClick={logoutHandler}>log out</button></p>
          { noteForm() }
        </div>
      }
     
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
        )}
      </ul>
      
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
      <Footer />
    </div>
  );
};

export default App;