import { Typography } from "@mui/material";
import { Diagnosis, Gender, Patient } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}

const PatientDetails = ({patient, diagnoses}: Props ) => {
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
      <Typography variant="h6">entries</Typography>
      {patient.entries?.map(e => {
        return(
          <div>
            <Typography variant="body1">
              {e.date} | <i>{e.description}</i>
            </Typography>
            <ul>
              {e.diagnosisCodes?.map(dc => {
                const diagnosisDescription = diagnoses.find(d => d.code === dc)?.name;
                return(
                  <li key={dc}><Typography variant="body1">{`${dc} ${diagnosisDescription}`}</Typography></li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};


export default PatientDetails;