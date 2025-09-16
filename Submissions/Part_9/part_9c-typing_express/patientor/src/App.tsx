import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";
import diagnosisService from "./services/diagnoses";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
    void fetchDiagnosisList();
  }, []);

  const match = useMatch('/patients/:id');
  useEffect(() => {
    if (match?.params.id) {
      patientService.findPatient(match?.params.id)
        .then(data => setSelectedPatient(data))
        .catch(error => {
          console.error('Error fetching patient: ', error);
        });
    }
    
  }, [match]);

  return (
    <div className="App">
      
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientDetails patient={selectedPatient} diagnoses={diagnoses} setSelectedPatient={setSelectedPatient} />}/>
          </Routes>
        </Container>
      
    </div>
  );
};

export default App;
