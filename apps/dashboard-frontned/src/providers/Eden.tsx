import { treaty } from "@elysiajs/eden";
import type { App } from "app"
import { createContext, useContext } from "react";

const client = treaty<App>("http://localhost:3000", {
  fetch: {
    credentials: "include",
  },
}); // get all the backend api types

export const ElysiaClientContext = createContext(client) // It creates a global container that can hold some value. for now that is client

export const ElysiaClientContextProvider = ElysiaClientContext.Provider;
export const useElysiaClient = () => {
  return useContext(ElysiaClientContext);
};