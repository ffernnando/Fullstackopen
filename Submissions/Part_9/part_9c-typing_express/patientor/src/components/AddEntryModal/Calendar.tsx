import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BaseState } from "../../types";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  label: string,
  baseData: BaseState,
  setBaseData: React.Dispatch<React.SetStateAction<BaseState>>,
}
const Calendar = ({label, baseData, setBaseData}: Props) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label={label} 
        value={baseData.date ? dayjs(baseData.date) : null}
        onChange={(newValue: Dayjs | null) => {
          if (newValue) {
            setBaseData({ ...baseData, date: newValue.format("YYYY-MM-DD")});
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;