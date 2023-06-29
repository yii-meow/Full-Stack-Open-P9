import { SyntheticEvent, useState } from "react";
import { NewDiary } from "../types";
import { createDiary } from "../services/diaryService";

const NewDiaryForm = () => {
  const [newDiary, setNewDiary] = useState<NewDiary[]>([]);

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("hello");
    createDiary({ date, visibility, weather, comment });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={submitForm}>
        date{" "}
        <input
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <br />
        visibility{" "}
        <input
          name="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        ></input>
        <br />
        weather{" "}
        <input
          name="weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        ></input>
        <br />
        comment{" "}
        <input
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
