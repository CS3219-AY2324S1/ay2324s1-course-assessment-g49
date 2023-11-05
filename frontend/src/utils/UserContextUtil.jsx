import { createContext } from "react";

const UserContextProvider = createContext({
  userContext: {
    userId: null,
  },
  setUserContext: () => {},
});

export default UserContextProvider;
