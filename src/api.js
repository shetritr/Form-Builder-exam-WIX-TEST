import axios from "axios";

export const fetchContest = contestId => {
  return axios.get("/api/contests/" + contestId).then(resp => resp.data);
};
export const fetchContestsList = () => {
  return axios.get("/api/contests").then(resp => resp.data.contests);
};
