import { useState } from "react";
import { type DiaryEntry, type NewDiaryEntry } from "../types";
import { createEntry } from "../services/diaryServices";

interface EntryFormParams {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

const NewEntryForm = (props: EntryFormParams) => {

  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
   
    const newEntry: NewDiaryEntry = {
      date, visibility, weather, comment
    };
    
    createEntry(newEntry)
      .then(data => {
        props.setDiaryEntries(props.diaryEntries.concat(data));
      })
      .catch(error => console.log(error.message));
   
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p>Error...</p>
      <form onSubmit={addNewEntry}>
        <div> date <input type="text" value={date} onChange={({ target }) => { setDate(target.value) }}/> </div>
        <div> visibility <input type="text" value={visibility} onChange={({ target }) => { setVisibility(target.value) }} /> </div>
        <div> weather <input type="text" value={weather} onChange={({ target }) => { setWeather(target.value) }} /> </div>
        <div> comment <input type="text" value={comment} onChange={({ target }) => { setComment(target.value) }} /> </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;