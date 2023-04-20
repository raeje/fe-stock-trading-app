import axios from "axios";
import { getCurrentUser } from "./localStorage_helper";

const STOCK_URL = process.env.REACT_APP_STOCK_URL;
//const Authorization =
//  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2ODE5NjUzNjF9.iiRI1sh78GYTlUn9uPWuPY9jYQ8nml0fVhIpTNhpEoI";
const Authorization = getCurrentUser()?.token;

// ============================================================================
// Authentication
// ============================================================================
const signup = async ({
  name,
  role,
  email,
  password,
  password_confirmation,
}) => {
  return await axios
    .post(`${STOCK_URL}/signup`, {
      name,
      email,
      password,
      password_confirmation,
      role,
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const login = async ({ email, password }) => {
  return await axios
    .put(`${STOCK_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};
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
// Stocks
// ============================================================================
const getStocks = async () => {
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

const getStock = async ({ id }) => {
  return await axios
    .get(`${STOCK_URL}/stocks/${id}}`, {
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
// Users
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

const getMyOrders = async () => {
  return await axios
    .get(`${STOCK_URL}/users/orders`, {
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

// ============================================================================
// Orders
// ============================================================================
const createOrder = async ({ category, price, quantity, stocks_id }) => {
  return await axios
    .post(
      `${STOCK_URL}/orders/new`,
      { category, price, quantity, stocks_id },
      {
        headers: { Authorization },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};
export {
  signup,
  login,
  getPortfolio,
  getStocks,
  getStock,
  getUser,
  getMyOrders,
  getMyInfo,
  createOrder,
};
