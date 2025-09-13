import { type DiaryEntry } from "../types";

interface EntryParams {
  diaryEntry: DiaryEntry
};

const Entry = (props: EntryParams) => {
  const { date, comment, visibility, weather } = props.diaryEntry;
  return (
    <div>
      <h3>{date}</h3>
      <div>
        <div>visibility: {visibility}</div>
        <div>weather: {weather}</div>
        <div>comment: {comment}</div>
      </div>
    </div>
  ); 
};

export default Entry;