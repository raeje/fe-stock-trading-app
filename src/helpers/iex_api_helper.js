import axios from "axios";

const IEX_LIST_URL = process.env.REACT_APP_IEX_LIST_URL;
const TOKEN = process.env.REACT_APP_IEX_TOKEN;

const getMostActive = async () => {
  return await axios
    .get(`${IEX_LIST_URL}/list?collectionName=mostactive&token=${TOKEN}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getGainers = async () => {
  console.log(IEX_LIST_URL);
  console.log(TOKEN);
  return await axios
    .get(`${IEX_LIST_URL}/list?collectionName=gainers&token=${TOKEN}`)
    .then((response) => response.data)
    .catch((error) => error);
};

const getLosers = async () => {
  console.log(IEX_LIST_URL);
  console.log(TOKEN);
  return await axios
    .get(`${IEX_LIST_URL}/list?collectionName=losers&token=${TOKEN}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export { getMostActive, getGainers, getLosers };
