import axios from "axios";

const productionUrl = process.env.REACT_APP_PRODUCTION_URL;

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const capitalize = (str) => {
  if (!str) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date) => {
  if (!date) return;
  const dt = new Date(date);
  const day = dt.getDate();
  const month = dt.toLocaleString("default", { month: "long" });
  const year = dt.getFullYear();
  return `${day} ${month} ${year}`;
};

export const trimNum = (num, firstDigits, count) => {
  const nm = num.toString();
  const fd = nm.slice(0, firstDigits);
  const ld = nm.slice(-count);
  return fd + ld;
};
