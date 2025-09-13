import Entry from "./DiaryEntry";
import { type DiaryEntry} from '../types'

interface DiaryEntriesParams {
  diaryEntries: DiaryEntry[];
}

const DiaryEntries = (props: DiaryEntriesParams) => {
  const { diaryEntries } = props;
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map(d => <Entry key={d.id} diaryEntry={d}/>)}

    </div>
  );
};

export default DiaryEntries;