import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import diagnosesService from "../../services/diagnoses";
import { BaseState, EntryFormData, EntryType, HospitalState, OccupationalState, Patient } from "../../types";
import { HealthcheckInputs, HospitalInputs, OccupationalHealthcareInputs } from "./ConditionalInputs";
import Calendar from "./Calendar";
import dayjs from "dayjs";
import patientService from "../../services/patients";

interface Props {
  patient: Patient;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const NewEntryForm = ({ patient, setSelectedPatient }: Props) => {
  const currDate: string = new Date().toISOString().split("T")[0];
  const [codes, setCodes] = useState<string[]>([]);

  //Base useState?
  const initialBaseState: BaseState = {
    type: 'HealthCheck',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  };
  const [baseData, setBaseData] = useState<BaseState>(initialBaseState);
  
  //Healthcheck useState
  const [healthCheckRating, setHealthcheckRating] = useState('');

  //Occupational useState
  const initialOccupationalState: OccupationalState = {
    employerName: '',
    startDate: currDate,
    endDate: currDate,
  };
  const [occupationalData, setOccupationalData] = useState<OccupationalState>(initialOccupationalState);


  //Hospital useState
  const initialHospitalState: HospitalState = {
    dischargeDate: '',
    dischargeCriteria: '',
  };
  const [hospitalData, setHospitalData] = useState<HospitalState>(initialHospitalState);

  const handleSubmit = () => {
  console.log('SUBMITTING IS BEING DONE!');

  let entryData: EntryFormData;

  switch (baseData.type) {
    case 'HealthCheck':
      entryData = {
        type: 'HealthCheck',
        description: baseData.description,
        date: dayjs(baseData.date).format('YYYY-MM-DD'),
        specialist: baseData.specialist,
        diagnosisCodes: baseData.diagnosisCodes,
        healthCheckRating, // must exist
      };
      break;

    case 'OccupationalHealthcare':
      entryData = {
        type: 'OccupationalHealthcare',
        description: baseData.description,
        date: dayjs(baseData.date).format('YYYY-MM-DD'),
        specialist: baseData.specialist,
        diagnosisCodes: baseData.diagnosisCodes,
        ...occupationalData, // employerName, startDate, endDate
      };
      break;

    case 'Hospital':
      entryData = {
        type: 'Hospital',
        description: baseData.description,
        date: dayjs(baseData.date).format('YYYY-MM-DD'),
        specialist: baseData.specialist,
        diagnosisCodes: baseData.diagnosisCodes,
        ...hospitalData, // dischargeDate, dischargeCriteria
      };
      break;
  }

  patientService.createEntry(patient.id, entryData)
    .then(data => {
      if (data) {
        setSelectedPatient({ ...patient, entries: patient.entries?.concat(data)});
      }
    })
    .catch(error => console.error({error: error}));
  
};
//(baseData.type === 'HealthCheck' && healthcheckRating)
  const clearInput = () => {
    setBaseData(initialBaseState);
    setOccupationalData(initialOccupationalState);
    setHospitalData(initialHospitalState);
  };

  useEffect(() => {
    diagnosesService.getCodes()
      .then(codes => {
        setCodes(codes);
        console.log('codes in entry form: ', codes);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const [conditionalContent, setConditionalContent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    console.log('TYPE: ', baseData.type);
    switch(baseData.type) {
      case 'HealthCheck':
        setConditionalContent(<HealthcheckInputs healthCheckRating={healthCheckRating} setHealthcheckRating={setHealthcheckRating} />);
        break;
      case 'OccupationalHealthcare':
        setConditionalContent(<OccupationalHealthcareInputs occupationalData={occupationalData} setOccupationalData={setOccupationalData} />);
        break;
      case 'Hospital':
        console.log('WE HAPPENING!');
        setConditionalContent(<HospitalInputs hospitalData={hospitalData} setHospitalData={setHospitalData} />);
        break;
      default:
        setConditionalContent(<></>);
        break;
    }
  }, [baseData.type]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, border: "dashed", borderRadius: "0.2em", padding: "1em", marginTop: "1em", marginBottom: "1em"}}
    >
      <Typography variant="body1">New {baseData.type} entry</Typography>
      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select label="Type" value={baseData.type} onChange={({ target }) => setBaseData({ ...baseData, type: target.value as EntryType })}>
          <MenuItem value="HealthCheck">Healthcheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Description" value={baseData.description} onChange={({ target }) => setBaseData({ ...baseData, description: target.value })} />
      
      {/* Add the MUI react datepicker */}
      <Calendar label="Date" baseData={baseData} setBaseData={setBaseData}/>


      <TextField label="Specialist" value={baseData.specialist} onChange={({ target }) => setBaseData({ ...baseData, specialist: target.value })} />
      
      {conditionalContent}

      <FormControl>
        <InputLabel>Diganosis codes</InputLabel>
        <Select multiple label="Diagnosis codes" value={baseData.diagnosisCodes} onChange={({ target }) => setBaseData({ ...baseData, diagnosisCodes: target.value as string[]})}>
          {codes.map(c => <MenuItem value={c}>{c}</MenuItem> )}
        </Select>
      </FormControl>
      
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Button type="button" onClick={clearInput} variant="contained" color="error" >CANCEL</Button>
        <Button type="submit" variant="contained" color="success" >ADD</Button>
      </div>
    </Box>
  );
};

export default NewEntryForm;