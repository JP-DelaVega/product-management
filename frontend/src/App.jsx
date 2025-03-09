import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import { Provider } from "react-redux";
import { useProductStore } from "./store/productslice"; // Import your store

function App() {
  return (
    <Provider store={useProductStore}>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route />
      </Routes>
    </Provider>
  );
}

export default App;
