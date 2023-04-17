import axios from "axios";

const STOCK_URL = process.env.REACT_APP_STOCK_URL;
const Authorization =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2ODE3NDM4MTF9.Mw7m0JoulT6R0G1p1Bfvc3Fh8wnXfPDydE6rY8GoKsk";

// ============================================================================
// Portfolio
// ============================================================================
const getPortfolio = async () => {
  return await axios
    .get(`${STOCK_URL}/users/portfolio`, {
      headers: { Authorization },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

// ============================================================================
// Stock
// ============================================================================
const getStock = async ({ id }) => {
  return await axios
    .get(`${STOCK_URL}/stocks/`, {
      headers: { Authorization },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

// ============================================================================
// Stock
// ============================================================================
const getUser = async ({ id }) => {
  return await axios
    .get(`${STOCK_URL}/users/${id}`, {
      headers: { Authorization },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const getMyInfo = async () => {
  return await axios
    .get(`${STOCK_URL}/users/me`, {
      headers: { Authorization },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

export { getPortfolio, getStock, getUser, getMyInfo };
