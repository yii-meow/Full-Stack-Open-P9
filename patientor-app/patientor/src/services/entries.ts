import axios from "axios";
import { Entry, NewEntry, Patient } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (object: NewEntry, id:string) => {
    const {data} = await axios
    .post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, object);

    return data;
}

export default {create};