import Image from "next/image";
import { useState } from "react";

const images = ["image-1.jpg", "image-2.jpg", "image-3.jpg", "image-4.jpg"];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [movementCount, setMovementCount] = useState(0);
  const [displayImages, setDisplayImages] = useState(false);
  const [staticImages, setStaticImages] = useState([]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
    setMovementCount((prevCount) => prevCount + 1);

    // Mostrar imágenes después de cada 10 movimientos del mouse
    if (movementCount % 10 === 0) {
      setDisplayImages(true);
      setStaticImages([
        ...staticImages,
        { x: mousePosition.x, y: mousePosition.y }
      ]);
    } else {
      setDisplayImages(false);
    }

    // Limitar el número de imágenes estáticas a 10
    if (staticImages.length > 10) {
      setStaticImages(staticImages.slice(1));
    }
  };

  return (
    <div
      className="bg-colored-intense h-screen flex mt-4 px-4 pt-10 items-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Image src="/logo.svg" alt="HotMamas" className="h-96 w-96 mx-auto z-10" fill="#fff000" />

      {/* Renderizar las imágenes estáticas */}
      {staticImages.map((position, index) => (
        <Image
          key={index}
          src={`/images/hero-images/${images[index % images.length]}`}
          alt={`Image ${index + 1}`}
          className="h-36 w-36 absolute opacity-80"
          style={{
            top: position.y - 16,
            left: position.x - 16,
            maxWidth: "calc(100% - 32px)", // Limitar el ancho máximo para que no se salga del canvas
            maxHeight: "calc(100% - 32px)", // Limitar el alto máximo para que no se salga del canvas
            objectFit: "cover" // Ajustar el tamaño de la imagen para que llene completamente su contenedor
          }}
        />
      ))}

      {/* Renderizar las imágenes cerca del cursor del mouse */}
      {displayImages &&
        images.map((image, index) => (
          <Image
            key={index}
            src={`/images/hero-images/${image}`}
            alt={`Image ${index + 1}`}
            className="h-32 w-32 absolute"
            style={{
              top: mousePosition.y - 16,
              left: mousePosition.x - 16 + index * 30, // Ajustar la posición horizontal para cada imagen
              maxWidth: "calc(100% - 32px)", // Limitar el ancho máximo para que no se salga del canvas
              maxHeight: "calc(100% - 32px)", // Limitar el alto máximo para que no se salga del canvas
              objectFit: "cover" // Ajustar el tamaño de la imagen para que llene completamente su contenedor
            }}
          />
        ))}
    </div>
  );
}
