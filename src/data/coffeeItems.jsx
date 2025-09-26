import espressoImg from "../assets/img/menu/espresso.jpg";
import americanoImg from "../assets/img/menu/americano.jpg";
import macchiatoImg from "../assets/img/menu/macchiato.jpg";
import espressoDobleImg from "../assets/img/menu/espresso-doble.jpg";
import campesinoImg from "../assets/img/menu/campesino.jpg";
import irlandesImg from "../assets/img/menu/irlandes.jpg";
import bombonImg from "../assets/img/menu/bombon.jpg";
import carajilloImg from "../assets/img/menu/carajillo.jpg";
import cappuccinoImg from "../assets/img/menu/cappuccino.jpg";
import mocaccinoImg from "../assets/img/menu/mocaccino.jpg";

const coffeeItems = [
  {
    id: 1,
    title: "Espresso Sencillo",
    price: "$5.200",
    origin: "Colombia",
    roastLevel: "Tostado Medio",
    flavorProfile: "Fuerte y Audaz",
    description: "La esencia pura del café en su forma más concentrada.",
    img: espressoImg,
    isPopular: false,
    recommendation:
      "Perfecto para empezar el día con energía. Nuestro espresso premium tiene un balance perfecto entre acidez y cuerpo.",
    benefits: [
      "Despierta tus sentidos",
      "Alto contenido de antioxidantes",
      "Aroma intenso",
    ],
    ingredients: ["Café espresso", "Agua caliente"],
    preparation:
      "Preparado con una máquina de espresso aplicando presión para extraer el café concentrado.",
  },
  {
    id: 2,
    title: "Americano",
    price: "$6.000",
    origin: "Colombia",
    roastLevel: "Tostado Medio",
    flavorProfile: "Suave y Balanceado",
    description:
      "Café suave y diluido para quienes prefieren un sabor menos intenso.",
    img: americanoImg,
    isPopular: false,
    recommendation:
      "Una opción ligera y prolongada ideal para una conversación larga.",
    benefits: ["Hidratación prolongada", "Bajo en calorías", "Sabor suave"],
    ingredients: ["Café espresso", "Agua caliente adicional"],
    preparation: "Agrega agua caliente al espresso para diluirlo.",
  },
  {
    id: 3,
    title: "Macchiato",
    price: "$7.000",
    origin: "Italia",
    roastLevel: "Tostado Medio",
    flavorProfile: "Cremoso y Rico",
    description: "Espresso con un toque de leche vaporizada.",
    img: macchiatoImg,
    isPopular: false,
    recommendation:
      "Ideal si te gusta el espresso con un pequeño giro cremoso.",
    benefits: [
      "Equilibrio entre fuerte y suave",
      "Menor acidez",
      "Aroma suave",
    ],
    ingredients: ["Espresso", "Espuma de leche"],
    preparation:
      "Servido con una pequeña cantidad de leche vaporizada sobre el espresso.",
  },
  {
    id: 4,
    title: "Espresso Doble",
    price: "$6.500",
    origin: "Colombia",
    roastLevel: "Tostado Oscuro",
    flavorProfile: "Intenso y Robusto",
    description: "El doble de energía en una taza intensa.",
    img: espressoDobleImg,
    isPopular: true,
    recommendation: "Para días exigentes o amantes del sabor fuerte.",
    benefits: [
      "Energía prolongada",
      "Sabor intenso",
      "Alta concentración de antioxidantes",
    ],
    ingredients: ["Doble dosis de café molido", "Agua"],
    preparation:
      "Mismo proceso que un espresso simple, pero con el doble de café.",
  },
  {
    id: 5,
    title: "Campesino",
    price: "$8.000",
    origin: "Colombia",
    roastLevel: "Tostado Medio",
    flavorProfile: "Especiado y Dulce",
    description: "Receta tradicional colombiana con panela y canela.",
    img: campesinoImg,
    isPopular: false,
    recommendation: "Un sabor típico y reconfortante de las montañas.",
    benefits: ["Energía natural", "Dulzor tradicional", "Mejora la digestión"],
    ingredients: ["Café filtrado", "Panela", "Canela"],
    preparation:
      "El café se prepara con panela derretida y un toque de canela.",
  },
  {
    id: 6,
    title: "Irlandés",
    price: "$12.000",
    origin: "Irlanda",
    roastLevel: "Tostado Oscuro",
    flavorProfile: "Alcohólico y Cremoso",
    description: "Café con un toque de whisky y crema batida.",
    img: irlandesImg,
    isPopular: true,
    recommendation: "Perfecto para las tardes frías o para cerrar el día.",
    benefits: ["Relajante", "Sabor profundo", "Textura cremosa"],
    ingredients: ["Café fuerte", "Whisky", "Crema batida"],
    preparation: "Se mezcla el café con whisky y se cubre con crema batida.",
  },
  {
    id: 7,
    title: "Bombón",
    price: "$9.000",
    origin: "España",
    roastLevel: "Tostado Medio",
    flavorProfile: "Dulce y Cremoso",
    description: "Café con leche condensada. Dulce y cremoso.",
    img: bombonImg,
    isPopular: false,
    recommendation: "Un postre en forma de café.",
    benefits: ["Alto en energía", "Textura sedosa", "Ideal como digestivo"],
    ingredients: ["Café espresso", "Leche condensada"],
    preparation: "Se sirve el café sobre una base de leche condensada.",
  },
  {
    id: 8,
    title: "Carajillo",
    price: "$10.000",
    origin: "España",
    roastLevel: "Tostado Oscuro",
    flavorProfile: "Fuerte y con Alcohol",
    description: "Mezcla de café y licor fuerte, usualmente brandy.",
    img: carajilloImg,
    isPopular: false,
    recommendation: "Perfecto para cerrar una buena comida con intensidad.",
    benefits: ["Digestivo", "Combina energía y relajación", "Sabor único"],
    ingredients: ["Café espresso", "Brandy o licor"],
    preparation:
      "Se mezcla el café caliente con el licor justo antes de servir.",
  },
  {
    id: 9,
    title: "Cappuccino",
    price: "$9.000",
    origin: "Italia",
    roastLevel: "Tostado Medio",
    flavorProfile: "Saborizado y Espumoso",
    description: "Espresso, leche vaporizada y espuma equilibrados.",
    img: cappuccinoImg,
    isPopular: true,
    recommendation: "La opción clásica para cualquier hora del día.",
    benefits: [
      "Espuma suave",
      "Sabor equilibrado",
      "Ideal para acompañar postres",
    ],
    ingredients: ["Espresso", "Leche vaporizada", "Espuma de leche"],
    preparation: "Se sirve con partes iguales de café, leche y espuma.",
  },
  {
    id: 10,
    title: "Mocaccino",
    price: "$15.000",
    origin: "Mezcla Especial",
    roastLevel: "Tostado Medio",
    flavorProfile: "Chocolateado y Dulce",
    description: "El matrimonio perfecto entre café y chocolate.",
    img: mocaccinoImg,
    isPopular: true,
    recommendation:
      "Nuestro dulce recomendado para hoy. La combinación perfecta para los amantes del chocolate.",
    benefits: [
      "Balance perfecto café-chocolate",
      "Textura cremosa",
      "Endulzado natural",
    ],
    ingredients: ["Café espresso", "Chocolate", "Leche vaporizada"],
    preparation: "Se mezcla el café con chocolate y se añade leche vaporizada.",
  },
];

export default coffeeItems;
