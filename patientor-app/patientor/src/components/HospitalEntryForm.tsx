import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, MenuItem, OutlinedInput } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntry } from "../types";
import Selection, { SelectChangeEvent } from "@mui/material/Select";

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

const HospitalEntryForm = ({ onSubmit, codes }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes: selectedCodes,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
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
        <h3>New Hospital Entry</h3>
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
            label="Date"
            type="date"
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
          <TextField
            id="standard-basic"
            label="Discharge Date"
            type="date"
            variant="standard"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Discharge Criteria"
            variant="standard"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
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

export default HospitalEntryForm;
