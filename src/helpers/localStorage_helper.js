const getCurrentUser = () => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
};

const setCurrentUser = (data) => {
  localStorage.setItem("currentUser", data ? JSON.stringify(data) : null);
};
const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};

export { getCurrentUser, setCurrentUser, removeCurrentUser };
