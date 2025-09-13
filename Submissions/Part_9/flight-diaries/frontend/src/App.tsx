import DiaryEntries from "./components/DiaryEntries";
import NewEntryForm from "./components/NewEntryForm";
import { getAll } from "./services/diaryServices";

import {type DiaryEntry} from './types'
import { useEffect, useState } from "react";
import Notification from "./components/Notification";

const App = () => {

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    console.log('FETCHING DIARY ENTRIES!');
    getAll()
      .then(data => {
        setDiaryEntries(data);
      })
      .catch(error => {
        setNotification('Error: '.concat(error.message))
      })
    console.log('diaryEntries: ', diaryEntries)
  }, [])
  return(
    <div>
      <h2>Add new entry</h2>
      <Notification notificationMessage={notification} />
      <NewEntryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} setNotification={setNotification} />
      <DiaryEntries diaryEntries={diaryEntries}/>
    </div>
  );
};

export default App
