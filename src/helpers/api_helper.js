import axios from "axios";
import { getCurrentUser } from "./localStorage_helper";

const STOCK_URL = process.env.REACT_APP_STOCK_URL;
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
      return response;
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
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/users/portfolio`, {
      headers: { Authorization: auth },
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
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/stocks/`, {
      headers: { Authorization: auth },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const getStock = async ({ id }) => {
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/stocks/${id}}`, {
      headers: { Authorization: auth },
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
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/users/${id}`, {
      headers: { Authorization: auth },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const getUsers = async () => {
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/users/`, {
      headers: { Authorization: auth },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const updateUser = async ({ id, name, email, is_approved }) => {
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .patch(
      `${STOCK_URL}/users/update/${id}`,
      {
        name,
        email,
        is_approved,
      },
      {
        headers: { Authorization: auth },
      }
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const getMyOrders = async () => {
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/users/orders`, {
      headers: { Authorization: auth },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const getMyInfo = async () => {
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/users/me`, {
      headers: { Authorization: auth },
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
const getOrders = async () => {
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .get(`${STOCK_URL}/orders/`, {
      headers: { Authorization: auth },
    })
    .then((response) => {
      return response.data;
    })
    .catch((errors) => {
      return errors.response.data;
    });
};

const createOrder = async ({ category, price, quantity, stocks_id }) => {
  const currentUser = getCurrentUser();
  const auth = Authorization || currentUser.token;
  return await axios
    .post(
      `${STOCK_URL}/orders/new`,
      { category, price, quantity, stocks_id },
      {
        headers: { Authorization: auth },
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
  getUsers,
  updateUser,
  getMyOrders,
  getMyInfo,
  getOrders,
  createOrder,
};
