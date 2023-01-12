import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "@pages/MainPage";
import Header from "@components/common/Header";
import QuillEditor from "@pages/QuillEditor";
import QuestPage from "@pages/QuestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<QuillEditor />} />
        <Route path="/quest" element={<QuestPage />} />
        <Route element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
