import React from "react";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  color: string;
  clickable?: boolean;
}

const ListOfProducts: React.FC<Props> = ({
  products,
  color,
  clickable = false,
}) => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            color={color}
            clickable
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfProducts;
