import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { FaCartPlus } from "@react-icons/all-files/fa/FaCartPlus";

export default function ProductItem({ product, addToCartHandler }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 2 });
    tl.to(card, {
      y: -20 + Math.random() * 10,
      duration: 2 + Math.random() * 2,
      ease: 'power1.inOut',
    }).to(card, {
      y: 0,
      duration: 2 + Math.random() * 2,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col border z-0 m-1 rounded-full">
      <div>
        <Link href={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-96 w-full"
          />

        </Link>
      </div>
      <div className="rounded-b-lg bg-primary-light px-4 py-2">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg uppercase text-start justify-start">{product.name}</h2>
        </Link>
        <div className='flex justify-between w-full text-start'>
          <p className='flex text-md text-gray-600 text-start'>CLP ${product.price}</p>
          <button className="flex"
            type="button"
            onClick={() => addToCartHandler(product)}
          >
            <FaCartPlus className="h-5 w-5" />
          </button>
        </div>


      </div>
    </div>
  );
}
