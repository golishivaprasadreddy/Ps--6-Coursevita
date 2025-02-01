import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
