import { useEffect, useState, SyntheticEvent, ChangeEvent } from "react";
import { Diary, NewDiary } from "./types";
import { getAllDiaries } from "./services/diaryService";
import { createDiary } from "./services/diaryService";
import axios from "axios";

function App() {
  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();

    createDiary({ date, weather, visibility, comment })
      .then((data) => {
        setDiaries(diaries.concat(data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
          setError(error.response?.data);
        } else {
          console.error(error);
        }
      });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  const handleVisibilityOptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setVisibility(event.target.value);
  };

  const handleWeatherOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value);
  };

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Add new entry</h1>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={submitForm}>
          date{" "}
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <br />
          visibility great
          <input
            name="visibility"
            type="radio"
            value="great"
            onChange={handleVisibilityOptionChange}
          />
          good
          <input
            name="visibility"
            type="radio"
            value="good"
            onChange={handleVisibilityOptionChange}
          />
          ok
          <input
            name="visibility"
            type="radio"
            value="ok"
            onChange={handleVisibilityOptionChange}
          />
          poor
          <input
            name="visibility"
            type="radio"
            value="poor"
            onChange={handleVisibilityOptionChange}
          />
          <br />
          weather sunny
          <input
            name="weather"
            type="radio"
            value="sunny"
            onChange={handleWeatherOptionChange}
          />
          rainy
          <input
            name="weather"
            type="radio"
            value="rainy"
            onChange={handleWeatherOptionChange}
          />
          cloudy
          <input
            name="weather"
            type="radio"
            value="cloudy"
            onChange={handleWeatherOptionChange}
          />
          stormy
          <input
            name="weather"
            type="radio"
            value="stormy"
            onChange={handleWeatherOptionChange}
          />
          windy
          <input
            name="weather"
            type="radio"
            value="windy"
            onChange={handleWeatherOptionChange}
          />
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

      <h1>Diary entries</h1>
      {diaries?.map((d) => (
        <div key={d.id}>
          <p>{d.date}</p>
          visiblity: {d.visibility}
          <br />
          weather: {d.weather}
        </div>
      ))}
    </div>
  );
}

export default App;
