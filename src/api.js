import axios from "axios";

export const fetchSubmissions = SubmissionsPageId => {
  return axios
    .get("/api/Submissions/" + SubmissionsPageId)
    .then(resp => resp.data);
};

export const fetchForm = formId => {
  return axios.get("/api/forms/" + formId).then(resp => resp.data);
};

export const fetchFormsList = () => {
  return axios.get("/api/forms").then(resp => resp.data.forms);
};

export const addForm = (name, fields) => {
  return axios.post("/api/newform", { name: name, fields: fields });
};
export const addSubmission = (id, fields) => {
  return axios.post("/api/newSubmission", { id: id, fields: fields });
};
