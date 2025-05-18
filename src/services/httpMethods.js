import axios from "axios";
import axiosClient from "../redux/APIs/axios";

// [GET]
const getRequest = async (url) => {
  try {
    const res = await axiosClient.get(`${url}`);
    return res;
  } catch (error) {
    return console.log(error);
  }
};

// [GET] -> params
const getRequestParams = async (url, params) => {
  try {
    const res = await axiosClient.get(`${url}`, { params: params });
    return res;
  } catch (error) {
    return console.log(error);
  }
};

const postRequestParams = async (url, params) => {
  try {
    // Convert newProduct object to query parameters
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const res = await axiosClient.post(fullUrl, null);
    return res;
  } catch (error) {
    return console.log(error);
  }
};

// [POST]
const postRequest = async (url, payload) => {
  try {
    const res = await axiosClient.post(`${url}`, payload);
    return res;
  } catch (error) {
    return error.response;
  }
};
const postRequestMultipartFormData = async (url, payload) => {
  try {
    const res = await axios.post(`${url}`, payload, {
      headers: {
        Accept: "application/json, text/plain, */*",
        ContentType: "multipart/form-data",
        Authorization: sessionStorage.getItem("token"),
      },
    });
    return res;
  } catch (error) {
    return console.log(error);
  }
};
// [POST] -> multipart/form-data (file, ...)
const postRequestFormData = async (url, payload) => {
  try {
    const res = await axiosClient.post(`${url}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return console.log(error);
  }
};

// [DELETE]
const deleteRequest = async (url, payload) => {
  try {
    const res = await axiosClient.delete(`${url}`, payload);
    return res;
  } catch (error) {
    return console.log(error);
  }
};

// [PUT]
const putRequest = async (url, payload) => {
  try {
    const res = await axiosClient.put(`${url}`, payload);
    return res;
  } catch (error) {
    return console.log(error);
  }
};

// [PUT] -> params
const putRequestParams = async (url, params) => {
  try {
    // Convert params object to query parameters
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const res = await axiosClient.put(fullUrl, null);
    return res;
  } catch (error) {
    return console.log(error);
  }
};

// [PUT] -> multipart/form-data (file, ...)
const putRequestFormData = async (url, payload) => {
  try {
    const res = await axiosClient.put(`${url}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return console.log(error);
  }
};
// [PATCH]
const patchRequest = async (url, payload) => {
  try {
    const res = await axiosClient.patch(`${url}`, payload);
    return res;
  } catch (error) {
    return error.response;
  }
};

export {
  getRequest,
  getRequestParams,
  postRequest,
  deleteRequest,
  putRequest,
  patchRequest,
  postRequestParams,
  postRequestFormData,
  putRequestParams,
  putRequestFormData,
  postRequestMultipartFormData,
};
