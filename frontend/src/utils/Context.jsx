import { createContext } from "react";

const userContextProvider = createContext({
  userContext: {
    username: null,
    userId: null,
  },
  setUserContext: () => {},
});

export default userContextProvider;
