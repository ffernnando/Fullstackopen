import { useState } from "react";
import { Visibility, type DiaryEntry, type NewDiaryEntry } from "../types";
import { createEntry } from "../services/diaryServices";
import { Weather } from "../types";
interface EntryFormParams {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setNotification:  React.Dispatch<React.SetStateAction<string>>;
};

const NewEntryForm = (props: EntryFormParams) => {
  const currDate: string = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(currDate);

  const [visibility, setVisibility] = useState(Visibility.Great.toString());
  const [weather, setWeather] = useState(Weather.Sunny.toString());

  const [comment, setComment] = useState('');

  const addNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
   
    const newEntry: NewDiaryEntry = {
      date, visibility, weather, comment
    };
    
    try {
      const addedEntry = await createEntry(newEntry);
      props.setDiaryEntries(props.diaryEntries.concat(addedEntry));
    } catch (error: unknown) {
      if (error instanceof Error) {
        props.setNotification(error.message)
      } else {
        props.setNotification('Unknown error');
      }
      return;
    }

    setDate(currDate);
    setVisibility('');
    setWeather('');
    setComment('');
  };

  

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.currentTarget.value);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.currentTarget.value);
  };

  return (
    <div>
      <form onSubmit={addNewEntry}>
        <div> date <input type="date" onChange={({ target }) => {setDate(target.value)}} value={date}/> </div>
        <br />
        <fieldset style={{display: "flex"}}>
          <legend>Select observed weather:</legend>
          <div>
            <input type="radio" id="sunny" name="weather" value={Weather.Sunny} onChange={handleWeatherChange} defaultChecked/>
            <label htmlFor="sunny">Sunny</label>
          </div>
          <div>
            <input type="radio" id="windy" name="weather" value={Weather.Windy} onChange={handleWeatherChange} />
            <label htmlFor="windy">Windy</label>
          </div>
          <div>
            <input type="radio" id="rainy" name="weather" value={Weather.Rainy} onChange={handleWeatherChange} />
            <label htmlFor="rainy">Rainy</label>
          </div>
          <div>
            <input type="radio" id="cloudy" name="weather" value={Weather.Cloudy} onChange={handleWeatherChange} />
            <label htmlFor="cloudy">Cloudy</label>
          </div>
          <div>
            <input type="radio" id="stormy" name="weather" value={Weather.Stormy} onChange={handleWeatherChange} />
            <label htmlFor="stormy">Stormy</label>
          </div>
        </fieldset>
        <br/>
        <fieldset style={{display: "flex"}}>
          <legend>Select observed visisbility:</legend>
          <div>
            <input type="radio" id="great" name="visibility" value={Visibility.Great} onChange={handleVisibilityChange} defaultChecked/>
            <label htmlFor="great">Great</label>
          </div>
          <div>
            <input type="radio" id="good" name="visibility" value={Visibility.Good} onChange={handleVisibilityChange} />
            <label htmlFor="good">Good</label>
          </div>
          <div>
            <input type="radio" id="ok" name="visibility" value={Visibility.Ok} onChange={handleVisibilityChange} />
            <label htmlFor="ok">Ok</label>
          </div>
          <div>
            <input type="radio" id="poor" name="visibility" value={Visibility.Poor} onChange={handleVisibilityChange} />
            <label htmlFor="poor">Poor</label>
          </div>
        </fieldset>
        <br />
        <div> comment <input type="text" value={comment} onChange={({ target }) => {setComment(target.value)}} /> </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

/*
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
*/
export default NewEntryForm;