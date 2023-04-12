import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Course from "./components/Course";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/account" element={<Account />} />
          <Route path="/course" element={<Course />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
