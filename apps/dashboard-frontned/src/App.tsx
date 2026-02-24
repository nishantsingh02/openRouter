import type { App } from "app";
import './App.css'
import { treaty } from "@elysiajs/eden";

function App() {
  const client = treaty<App>('localhost:3000') 
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hi</h1>
    </>
  )
}

export default App
