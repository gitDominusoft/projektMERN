import Contact from "./Contact";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {<Contact />}
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
