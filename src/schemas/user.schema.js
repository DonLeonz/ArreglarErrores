import z from "zod";

export const userSchema = z.object({
    username: z .string({
        required_error: "Este campo es obligatorio",
    }).regex(new RegExp(/^[\w\d\W]{3,29}$/), {
        message: "El nombre de usuario debe tener entre 3 y 29 caracteres válidos (solo letras, números o símbolos permitidos).",
    }),
    password: z.string({
        required_error: "Este campo es obligatorio",
    }).regex(new RegExp(/^(?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[^a-zA-Z\d]+)[\w\d\W]{7,30}$/), {
        message: "La contraseña debe tener entre 7 y 30 caracteres, incluir mayúsculas, minúsculas, un número y un símbolo.",
    }),
    email: z.string({
        required_error: "Este campo es obligatorio",
    }).regex(new RegExp(/^[\w.%+-]+@[A-Za-z\d.-]{2,}\.[a-z]{2,6}$/), {
        message: "Formato de correo electrónico inválido."
    }),
    name: z.string({
        required_error: "Este campo es obligatorio",
    }).regex(new RegExp(/^[A-ZÑ][A-Za-zÀ-ÿ]+(\s[A-Za-zÀ-ÿ0]+){1,4}$/), {
        message: "El nombre debe comenzar con mayúscula y tener entre 2 y 5 palabras válidas."
    }),
})