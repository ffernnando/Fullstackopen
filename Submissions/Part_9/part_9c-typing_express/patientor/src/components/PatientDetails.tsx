import { Button, Divider, Typography } from "@mui/material";
import { Gender, Patient } from "../types";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  patient: Patient | undefined
}

const PatientDetails = ({patient}: Props ) => {
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
    </div>
  );
};


export default PatientDetails;