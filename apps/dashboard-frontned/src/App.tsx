import type { App } from "app";
import "./App.css";
import { treaty } from "@elysiajs/eden";

export function App() {
  const client = treaty<App>("localhost:3000");

  function signin() {
    client.auth["sign-in"]
      .post({ email: "email", password: "123random" })
      .then((result) => {
        if (result.status === 200) {
          const data = result.data;
          alert("signIn")
        }
      });
  }

  return (
    <>
      <div>
        <input placeholder="Email" />
        <input placeholder="password" />
        <button onClick={signin}>Sign-in</button>
      </div>
    </>
  );
}

export default App;
