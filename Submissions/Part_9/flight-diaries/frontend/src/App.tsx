import DiaryEntries from "./components/DiaryEntries";
import NewEntryForm from "./components/NewEntryForm";
import { getAll } from "./services/diaryServices";

import {type DiaryEntry} from './types'
import { useEffect, useState } from "react";

const App = () => {

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    console.log('FETCHING DIARY ENTRIES!');
    getAll().then(data => {
      setDiaryEntries(data);
    })
    console.log('diaryEntries: ', diaryEntries)
  }, [])
  return(
    <div>
      <NewEntryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries}/>
      <DiaryEntries diaryEntries={diaryEntries}/>
    </div>
  );
};

export default App
