import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, InputLabel, MenuItem, OutlinedInput } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntry } from "../types";
import Select from "react-select";
import Selection, { SelectChangeEvent } from "@mui/material/Select";

interface Option {
  value: number;
  label: string;
}

interface Props {
  onSubmit: (values: NewEntry) => void;
  codes: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const HealthCheckEntryForm = ({ onSubmit, codes }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<Option>({
    value: 0,
    label: "Healthy",
  });
  const [specialist, setSpecialist] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!healthCheckRating || healthCheckRating.value === null) {
      alert("Please select a health check rating");
      return;
    }
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: selectedCodes,
      healthCheckRating: healthCheckRating.value,
      type: "HealthCheck",
    });
  };

  const healthCheckRatingOptions = [
    { value: 0, label: "Healthy" },
    { value: 1, label: "LowRisk" },
    { value: 2, label: "HighRisk" },
    { value: 3, label: "CriticalRisk" },
  ];

  const handleChange = (healthCheckRating: any) => {
    setHealthCheckRating(healthCheckRating);
  };

  const handleCodeChange = (event: SelectChangeEvent<typeof selectedCodes>) => {
    const {
      target: { value },
    } = event;

    setSelectedCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <Box
        sx={{
          color: "black",
          border: "2px dotted black",
          padding: 1,
        }}
      >
        <h3>New HealthCheck Entry</h3>
        <Stack
          component="form"
          sx={{
            width: "100%",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="standard-basic"
            type="date"
            label="Date"
            variant="standard"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Specialist"
            variant="standard"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
          <Select
            defaultValue={healthCheckRating}
            onChange={handleChange}
            options={healthCheckRatingOptions}
          />
          <InputLabel id="diagnosis-codes">Diagnosis Codes</InputLabel>
          <Selection
            labelId="diagnosis-codes"
            id="diagnosis-codes"
            multiple
            value={selectedCodes}
            onChange={handleCodeChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            MenuProps={MenuProps}
          >
            {codes.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                {c.code}
              </MenuItem>
            ))}
          </Selection>
        </Stack>
        <Button variant="contained" color="error">
          CANCEL
        </Button>
        <Button variant="contained" color="success" onClick={addEntry}>
          ADD
        </Button>
      </Box>
    </div>
  );
};

export default HealthCheckEntryForm;
