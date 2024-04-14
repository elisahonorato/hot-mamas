import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { useInView } from 'react-intersection-observer';


export default function InfiniteScrollProducts({ products, addToCartHandler }) {
  const [bottomRef, inView] = useInView();
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [rowStyles, setRowStyles] = useState([]);

  useEffect(() => {
    // Initially, render the first batch of products
    setVisibleProducts(products.slice(0, 10));
  }, [products]);




  return (
    <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 px-10">
      {visibleProducts.map((product, index) => (
        <div
          key={product._id}
          className={`flex h-full justify-center`}
        >
          <ProductItem product={product} addToCartHandler={addToCartHandler} />
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
