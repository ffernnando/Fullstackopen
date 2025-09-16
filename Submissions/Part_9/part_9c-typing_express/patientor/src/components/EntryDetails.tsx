import { Diagnosis, type Entry } from "../types";
import { Box, Typography } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import HealingIcon from '@mui/icons-material/Healing';
const assertNever = (value: never): never => {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
};

interface Props {
  entry: Entry | undefined;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({entry, diagnoses}: Props) => {
  let content: JSX.Element;

  if (!entry) {
    return (
      <div>
        <Typography variant="body1">No entries on record</Typography>
      </div>
    );
  }

  switch(entry.type) {
    case 'HealthCheck':
      content = 
      <div>
        <div style={{display: "flex"}}>
          <Typography variant="body1">{entry.date}</Typography>
          <MedicalInformationIcon htmlColor="black" style={{marginLeft: 5, marginRight: 5}} />
        </div>
        <Typography variant="body1"><i>{entry.description}</i></Typography>
        <Typography variant="body1">Health check rating:  {entry.healthCheckRating} </Typography>
        <ul>
          {entry.diagnosisCodes?.map(dc => {
            const diagnosisDescription = diagnoses.find(d => d.code === dc)?.name;
            return(
              <li key={dc}><Typography variant="body1">{`${dc} ${diagnosisDescription}`}</Typography></li>
            );
          })}
        </ul>
        <Typography variant="body1">Diagnosed by {entry.specialist} </Typography>
      </div>;
      break;
    case 'Hospital':
      content = 
      <div>
        <div style={{display: "flex"}}>
          <Typography variant="body1">{entry.date}</Typography>
          <HealingIcon htmlColor="black" style={{marginLeft: 5, marginRight: 5}} />
        </div>
        <Typography variant="body1"><i>{entry.description}</i></Typography>
        { entry.discharge 
          ? <div>
              <Typography variant="body1">Discharge date: {entry.discharge?.date}</Typography>
              <Typography variant="body1">Discharge criteria: {entry.discharge?.criteria}</Typography>
            </div>
          : <></> 
        }
        <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
      </div>;
      break;
    case 'OccupationalHealthcare':
      content = 
      <div>
        <div style={{display: "flex"}}>
          <Typography variant="body1">{entry.date}</Typography>
          <WorkIcon htmlColor="black" style={{marginLeft: 5, marginRight: 5}}/>
          <Typography variant="body1"><i>{entry.employerName}</i></Typography>
        </div>
        <Typography variant="body1"><i>{entry.description}</i></Typography>
        {entry.sickLeave 
          ? <div>
              <Typography variant="body1">Sick leave start date: {entry.sickLeave.startDate}</Typography>
              <Typography variant="body1">Sick leave end date: {entry.sickLeave.endDate}</Typography>
            </div>
          : <></>
        }
        <Typography variant="body1">Diagnosed by {entry.specialist}</Typography>
      </div>;
      break;
    default:
      return assertNever(entry);
  }

  return(
    <Box borderRadius={1} border={1} padding={"1em"} marginTop={"1em"}>
      {content}
    </Box>
  );
};

export default EntryDetails;