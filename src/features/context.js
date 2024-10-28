import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("smUser"));
    const usrId = localStorage.getItem("smUserId");
    return user ? user._id : usrId ? usrId : null;
  });

  const [user, setUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("smUser"));
    return user ? user : null;
  });

  const [jwtToken, setJwtToken] = useState(() => {
    const token = localStorage.getItem("smJwtToken");
    return token ? token : null;
  });

  const [personDetails, setPersonDetails] = useState(() => {
    const person = JSON.parse(localStorage.getItem("smPersonDetails"));
    return person ? person : null;
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("smUser"));
    const storedUID = localStorage.getItem("smUserId");
    const uId = storedUser ? storedUser._id : storedUID ? storedUID : null;
    setUserId(uId);
    setJwtToken(localStorage.getItem("smJwtToken"));
    setPersonDetails(JSON.parse(localStorage.getItem("smPersonDetails")));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        jwtToken,
        setJwtToken,
        user,
        setUser,
        personDetails,
        setPersonDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
