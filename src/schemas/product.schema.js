import z from "zod";

export const productSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
    })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(80, { message: "No debe superar los 80 caracteres" })
    .regex(/^[A-ZÑÁÉÍÓÚ][A-Za-zÀ-ÿ0-9\s'.,-]*$/, {
      message:
        "El nombre debe comenzar con mayúscula y solo puede contener letras, números y espacios",
    }),

  description: z
    .string()
    .max(400, { message: "La descripción no puede superar los 400 caracteres" })
    .optional(),

  category: z
    .string({
      required_error: "La categoría es obligatoria",
    })
    .min(1, { message: "Debes seleccionar una categoría" }),

  price: z
    .number({
      required_error: "El precio es obligatorio",
      invalid_type_error: "El precio debe ser un número",
    })
    .min(0, { message: "El precio no puede ser negativo" })
    .max(9999999, { message: "El precio es demasiado alto" }),

  stock: z
    .number({
      invalid_type_error: "El stock debe ser un número",
    })
    .min(0, { message: "El stock no puede ser negativo" })
    .max(100, { message: "El stock máximo permitido es 100" })
    .optional(),

  origin: z
    .string({
      invalid_type_error: "El país de origen debe ser texto",
    })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "El país de origen solo puede contener letras y espacios",
    })
    .optional(),

  recommendations: z
    .string({
      required_error: "Las recomendaciones son obligatorias",
    })
    .min(10, { message: "Debe tener al menos 10 caracteres" })
    .max(500, { message: "Máximo 500 caracteres" }),

  benefits: z
    .array(
      z
        .string({
          invalid_type_error: "Cada beneficio debe ser texto",
        })
        .min(3, { message: "Cada beneficio debe tener al menos 3 caracteres" })
    )
    .max(10, { message: "Máximo 10 beneficios permitidos" })
    .optional(),
});