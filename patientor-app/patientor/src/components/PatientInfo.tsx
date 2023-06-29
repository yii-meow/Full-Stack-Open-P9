import axios from "axios";
import { DiagnoseEntry, Diagnosis, Entry, NewEntry, Patient } from "../types";
import React, { useEffect, useState } from "react";
import HospitalEntry from "./Entries/HospitalEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";
import OccupationalHealthcareEntry from "./Entries/OccupationalHealthcareEntry";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import { Alert, Box } from "@mui/material";
import entriesService from "../services/entries";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import DiagnosesService from "../services/diagnoses";

interface Props {
  patient: Patient;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  allPatient: Patient[];
}

const getDiagnoseDescription = async (d: string): Promise<string> => {
  const response = await axios.get<DiagnoseEntry>(
    `http://localhost:3001/api/diagnoses/${d}`
  );
  return response.data.name;
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry />;
    case "HealthCheck":
      return <HealthCheckEntry health={entry.healthCheckRating} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry name={entry.employerName} />;
    default:
      return <HospitalEntry />;
  }
};

const PatientInfo = ({ patient, setPatients, allPatient }: Props) => {
  const [diagnoseDescriptions, setDiagnoseDescriptions] = useState<string[]>(
    []
  );
  const [codes, setCodes] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  const submitNewEntry = async (entry: NewEntry) => {
    try {
      const newEntry: Patient = await entriesService.create(entry, patient.id);
      setPatients(allPatient.map((p) => (p.id === patient.id ? newEntry : p)));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(e.response.data);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    const fetchDiagnoseDescriptions = async () => {
      const descriptions = await Promise.all(
        patient.entries
          .filter((e) => e.diagnosisCodes !== undefined)
          .flatMap((e) => e.diagnosisCodes as string[])
          .map((d) => getDiagnoseDescription(d))
      );
      setDiagnoseDescriptions(descriptions);
    };
    fetchDiagnoseDescriptions();
  }, [patient.entries]);

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      const allCodes = await DiagnosesService.getAll();
      setCodes(allCodes);
    };
    void fetchDiagnosisCodes();
  }, []);

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>gender: {patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation {patient.occupation}</p>
      {error && <Alert severity="error">{error}</Alert>}
      <HealthCheckEntryForm onSubmit={submitNewEntry} codes={codes} />
      <OccupationalHealthcareEntryForm
        onSubmit={submitNewEntry}
        codes={codes}
      />
      <HospitalEntryForm onSubmit={submitNewEntry} codes={codes} />
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <div key={e.id}>
          <Box
            sx={{
              color: "black",
              border: "2px solid black",
              padding: 1,
            }}
          >
            <div>
              {e.date} <EntryDetails entry={e} />
            </div>
            <p>{e.description}</p>
            diagnose by {e.specialist}
          </Box>
          <ul>
            {e.diagnosisCodes?.map((d: string, index: number) => (
              <li key={index}>
                {d} {diagnoseDescriptions[index]}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientInfo;
