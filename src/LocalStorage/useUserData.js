import { useState } from "react";

export default function useUserData() {
  const getUserData = () => {
    const dataString = localStorage.getItem("userData");
    const userData = JSON.parse(dataString);
    return userData === null ? "" : userData;
  };

  const [userData, setUserData] = useState(getUserData());

  const saveUserData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
  };

  const removeUserData = () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };

  return {
    setUserData: saveUserData,
    removeUserData: removeUserData,
    userData,
  };
}
