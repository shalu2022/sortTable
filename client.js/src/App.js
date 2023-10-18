import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={'/'} element={<Dashboard />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
