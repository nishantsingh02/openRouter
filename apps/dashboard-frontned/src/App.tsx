import type { App } from "app";
import "./App.css";
import { treaty } from "@elysiajs/eden";
import {BrowserRouter, Route, Routes} from "react-router"
import {Signin} from "./pages/Signin"
import {Signup} from "./pages/Signup"
import {Dashboard} from "./pages/Dashboard"
import { Credits } from "./pages/Credits";
import { ApiKeys } from "./pages/ApiKeys"
import { Landing } from "./pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {ElysiaClientContextProvider} from "./providers/Eden"

const queryClient = new QueryClient()

const client = treaty<App>("http://localhost:3000");

export function App() {

  return (
    <ElysiaClientContextProvider value={client} >
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/api-keys"} element={<ApiKeys />} />
        <Route path={"/credits"} element={<Credits />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </ElysiaClientContextProvider>
  );
}

export default App;
