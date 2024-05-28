import React from "react";
import { Product } from "../types/product";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
  color: string;
  clickable?: boolean;
}

export default function ProductCard({
  product,
  color,
  clickable = false,
}: Props) {
  if (clickable) {
    return (
      <Link
        href={`/ssg/${product.id}`}
        className="border rounded-lg shadow-lg  p-2 mb-3 dark:border-gray-500 border-gray-400"
      >
        <div className="relative w-full h-[250px] overflow-hidden mb-1">
          <Image
            src={product.image}
            fill
            priority
            alt={product.name}
            className="object-cover"
          />
        </div>
        <h2 className={`text-sm md:text-xl font-bold mb-2 ${color}`}>
          {product.name}
        </h2>
        <div className="dark:text-white text-gray-500">
          <p className="text-sm line-clamp-2 max-w-[250px] mb-2">
            {product.description}
          </p>
          <p className="text-sm hidden md:block">
            Price: {product.price} Stock: {product.stock}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="border rounded-lg shadow-lg  p-2 mb-3 dark:border-gray-500 border-gray-400">
      <div className="relative w-full h-[250px] overflow-hidden mb-1">
        <Image
          src={product.image}
          fill
          priority
          alt={product.name}
          className="object-cover"
        />
      </div>
      <h2 className={`text-sm md:text-xl font-bold mb-2 ${color}`}>
        {product.name}
      </h2>
      <div className="dark:text-white text-gray-500">
        <p className="text-sm line-clamp-2 max-w-[250px] mb-2">
          {product.description}
        </p>
        <p className="text-sm hidden md:block">
          Price: {product.price} Stock: {product.stock}
        </p>
      </div>
    </div>
  );
}
