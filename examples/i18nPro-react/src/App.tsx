import { useEffect } from "react";

import "./App.css";

import { i18nPro } from "i18n-pro-react";

function App() {
  useEffect(() => {
    i18nPro.loadMessages("en-US", "/en-US.json");
  }, []);

  return (
    <main className="main-container">
      <img className="logo" src="/i18nPro.png" alt="i18nPro" />

      <div className="grid">
        <div>{i18nPro.t("Cognome")}</div>

        <button onClick={() => i18nPro.loadMessages("it-IT", "/it-IT.json")}>
          Change
        </button>
      </div>
    </main>
  );
}

export default App;
