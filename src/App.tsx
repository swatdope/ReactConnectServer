import { useState } from "react";
import ProductList from "./components/ProductList";

const App = () => {
  const [category, setCategory] = useState("");

  return (
    <>
      <select
        className="form-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </>
  );
};

export default App;
