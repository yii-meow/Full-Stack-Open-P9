import axios from "axios";
import { Diary, NewDiary } from "../types";

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>("http://localhost:3001/api/diaries")
    .then((response) => response.data);
};

export const createDiary = (diary: NewDiary) => {
  return axios
    .post<Diary>("http://localhost:3001/api/diaries", diary)
    .then((response) => response.data);
};
