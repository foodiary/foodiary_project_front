import "./styles/globals.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "@pages/MainPage";
import Header from "@components/common/Header";
import QuillEditor from "@pages/QuillEditor";
import RankingPage from "@pages/RankingPage";
import ExplorePage from "@pages/ExplorePage";
import ExploreDetail from "@pages/ExploreDetail";
import WritingDetails from "@pages/WritingDetails";
import Search from "@pages/Search";
import SearchResult from "@pages/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<QuillEditor />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/explore/details" element={<ExploreDetail />} />
        <Route path="/writing/details/:id" element={<WritingDetails />} /> 
        <Route path="/search" element={<Search />} /> 
        <Route path="/search/result" element={<SearchResult />} /> 

        <Route element={<Header />}></Route>
        <Route path="/hot" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
