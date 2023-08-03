import { message } from "antd";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
export const getAllJobs = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(`${API_URL}/api/jobs/getalljobs`);
    dispatch({ type: "GET_ALL_JOBS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const postJob = (values) => async (dispatch) => {
  values.postedBy = JSON.parse(localStorage.getItem("user"))._id;

  dispatch({ type: "LOADING", payload: true });
  try {
    // eslint-disable-next-line 
    const response = await axios.post(`${API_URL}/api/jobs/postjob`, values);

    dispatch({ type: "LOADING", payload: false });
    message.success("Job Posted Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editJob = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  
  try {
    // eslint-disable-next-line 
    const response = await axios.post(`${API_URL}/api/jobs/editjob`, values);

    dispatch({ type: "LOADING", payload: false });
    message.success("Job Updated Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};


export const applyJob = (job) => async (dispatch) => {


  const user = JSON.parse(localStorage.getItem("user"))
  // eslint-disable-next-line 
  dispatch({ type: "LOADING", payload: true });
  try {
    // eslint-disable-next-line 
    const response = await axios.post(`${API_URL}/api/jobs/applyjob`, {job , user});

    dispatch({ type: "LOADING", payload: false });
    message.success("Job applied Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};



export const searchJobs = (searchKey) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(`${API_URL}/api/jobs/getalljobs`);

    const jobs = response.data

    const filteredJobs = jobs.filter(job=>job.title.toLowerCase().includes(searchKey.toLowerCase()))

    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};


export const sortJobs = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(`${API_URL}/api/jobs/getalljobs`);

    const jobs = response.data

    var filteredJobs = jobs

    if(values.experience !== undefined) {

         filteredJobs = jobs.filter(job=>job.experience <= values.experience)

    }
    if(values.salary!==undefined){
      filteredJobs = jobs.filter(job=>job.salaryTo >= values.salary)
    }

    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};



