import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { useInView } from 'react-intersection-observer';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Diccionario de estilos para cada caso
const styles = {
  1: 'flex h-full justify-center',
  2: 'flex h-full justify-end',
  3: 'flex h-full justify-start',
};

export default function InfiniteScrollProducts({ products, addToCartHandler }) {
  const [bottomRef, inView] = useInView();
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [rowStyles, setRowStyles] = useState([]);

  useEffect(() => {
    // Initially, render the first batch of products
    setVisibleProducts(products.slice(0, 10));
  }, [products]);

  useEffect(() => {
    // When inView becomes true, render more products
    if (inView) {
      setVisibleProducts((prevProducts) => [
        ...prevProducts,
        ...products, // Concatenate the existing products array with itself
      ]);
    }
  }, [inView, products]);

  useEffect(() => {
    // Set random style for each row
    const newStyles = [];
    for (let i = 0; i < visibleProducts.length; i++) {
      newStyles.push(getRandomNumber(1, 3));
    }
    setRowStyles(newStyles);
  }, [visibleProducts]);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 px-10">
      {visibleProducts.map((product, index) => (
        <div
          key={product._id}
          className={`${styles[rowStyles[index]]} md:col-span-${getRandomNumber(1, 2)}`}
        >
          <ProductItem product={product} addToCartHandler={addToCartHandler} />
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
