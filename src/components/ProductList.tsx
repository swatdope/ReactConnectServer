import { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    console.log("fetching Products in ", category);
    setProducts(["clothing", "household"]);
  }, [category]);
  return <h1>Product List</h1>;
};

export default ProductList;
