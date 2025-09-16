import { Typography } from "@mui/material";
import { Diagnosis, Gender, Patient } from "../types";
import { useNavigate } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./AddEntryModal/NewEntryForm";

interface Props {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const PatientDetails = ({patient, diagnoses, setSelectedPatient}: Props ) => {
  const navigate = useNavigate();

  console.log(patient);
  if (!patient) {
    console.error('No patient!');
    navigate('/');
    return;
  }
  let genderSign: string;
  switch(patient.gender) {
    case Gender.Male: 
      genderSign = '♂';  
      break;
    case Gender.Female:
      genderSign = '♀';
      break;
    case Gender.Other:
      genderSign = 'other';
      break;
    default:
      genderSign = 'unknown';
      break;
  }

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        {patient.name} {genderSign}
      </Typography>
      <Typography variant="body1" >ssn: {patient.ssn ? patient.ssn : 'unknown'}</Typography>
      <Typography variant="body1" >occupation: {patient.occupation}</Typography>

      <NewEntryForm patient={patient} setSelectedPatient={setSelectedPatient}/>

      <Typography variant="h6">entries</Typography>
      {patient.entries?.map(e => {
        return(
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
        );
      })}
    </div>
  );
};

export default PatientDetails;