import Contact from "./Contact";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import ReadAllItem from "./CRUD/ReadAllItem"
import ReadOne from "./CRUD/ReadOne"
import UpdateItem from "./CRUD/UpdateItem"
import CreateItem from "./CRUD/CreateItem"
function App() {
  return (
    <>
  <NavigationBar/>
      <Routes>
        <Route path="/" element={<ReadAllItem/>} />
        <Route path="/createItem" element={<CreateItem/>} />
        <Route path="/readOne/:id" element={<ReadOne/>} />
        <Route path="/updateItem/:id" element={<UpdateItem/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </>
  );
}

export default App;
