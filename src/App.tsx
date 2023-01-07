import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "@pages/MainPage";
import Header from "@components/common/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route element={<Header />}>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
