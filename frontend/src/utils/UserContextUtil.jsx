import { createContext } from "react";

const UserContextProvider = createContext({
  userContext: {
    username: null,
    userId: null,
  },
  setUserContext: () => {},
});

export default UserContextProvider;
