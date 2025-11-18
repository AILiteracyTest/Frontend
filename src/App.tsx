// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import { useFontStore } from "./store/useFontStore";

function App() {
  const fontSize = useFontStore((state) => state.fontSize);
  const baseFontSizeClass = fontSize === "large" ? "text-xl" : "text-base";
  return (
    <div className={baseFontSizeClass}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
