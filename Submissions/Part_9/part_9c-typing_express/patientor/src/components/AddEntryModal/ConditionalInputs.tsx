import { Box, FormControl, TextField, Typography } from "@mui/material";
import { HospitalState, OccupationalState } from "../../types";

interface HCIprops {
  healthCheckRating: string;
  setHealthcheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthcheckInputs = (props: HCIprops) => {
  return (<TextField label="Healthcheck rating" value={props.healthCheckRating} onChange={({ target }) => props.setHealthcheckRating(target.value)} />);
};

interface OHIprops {
  occupationalData: OccupationalState;
  setOccupationalData: React.Dispatch<React.SetStateAction<OccupationalState>>;
}

const OccupationalHealthcareInputs = (props: OHIprops) => {
  return(
    <div>
      <TextField label="Employer name" value={props.occupationalData.employerName} onChange={({ target }) => props.setOccupationalData({ ...props.occupationalData, employerName: target.value })} />
      <Typography variant="body1">Sick leave</Typography>
      <FormControl>
        <Typography variant="body2" >Start date</Typography>
        <input type="date" value={props.occupationalData.startDate} onChange={({ target }) => props.setOccupationalData({ ...props.occupationalData, startDate: target.value }) } />
      </FormControl>
      <FormControl sx={{display: "flex", flexDirection: "column"}}>
        <Typography variant="body2" >End date</Typography>
        <input type="date" value={props.occupationalData.endDate} onChange={({ target }) => props.setOccupationalData({ ...props.occupationalData, endDate: target.value })} />
      </FormControl>
    </div>
  );
};

interface HIprops {
  hospitalData: HospitalState;
  setHospitalData: React.Dispatch<React.SetStateAction<HospitalState>>;
}
const HospitalInputs = (props: HIprops) => {
  return(
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Typography variant="body1">Discharge</Typography>
      <FormControl>
        <Typography variant="body2" >Discharge date</Typography>
        <input type="date" value={props.hospitalData.dischargeDate} onChange={({ target }) => props.setHospitalData({ ...props.hospitalData, dischargeDate: target.value})} />
      </FormControl>
      <TextField label="Criteria" value={props.hospitalData.dischargeCriteria} onChange={({ target }) => props.setHospitalData({ ...props.hospitalData, dischargeCriteria: target.value })} />
    </Box>
  );
};

export { 
  HealthcheckInputs, 
  OccupationalHealthcareInputs, 
  HospitalInputs
};