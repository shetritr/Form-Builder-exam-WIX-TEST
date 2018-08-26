import axios from "axios";

export const fetchSubmissions = SubmissionsPageId => {
  return axios
    .get("/api/Submissions/" + SubmissionsPageId)
    .then(resp => resp.data);
};

export const fetchContest = contestId => {
  return axios.get("/api/contests/" + contestId).then(resp => resp.data);
};

export const fetchContestsList = () => {
  return axios.get("/api/contests").then(resp => resp.data.contests);
};

export const addForm = (name, fields) => {
  return axios.post("/api/newform", { name: name, fields: fields });
};
export const addSubmission = (id, fields) => {
  return axios.post("/api/newSubmission", { id: id, fields: fields });
};
