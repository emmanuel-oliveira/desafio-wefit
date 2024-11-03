import { z } from "zod";
import { AddressSchema } from "../address/schema";


const UserSchema = z.object({
    name: z.string().regex(/^[a-zA-ZÀ-ÿ\s]+$/, {
        message: "Nome inválido. Apenas letras e espaços são permitidos."
    }),
    celPhone: z.string().regex(/^(\d{2})(9\d{8})$/, {
        message: "Número de celular inválido. Formato esperado com DDD sem parênteses ou traços"
      })
      ,
    phone: z.string().regex(/^(\d{2})([2-8]\d{7})$/, {
        message: "Número de telefone fixo inválido. Formato esperado com DDD sem parênteses ou traços"
      }),
    email: z.string().email({message: "E-mail inváido"}),
    address: AddressSchema,
});


export const PFSchema = UserSchema.extend({
    type: z.literal("PF"),
    cpf: z.string().regex(/^\d{11}$/, {message: "CPF inválido. Formato esperado apenas números"}), 
});

export const PJSchema = UserSchema.extend({
    type: z.literal("PJ"),
    cnpj: z.string().regex(/^\d{14}$/, {message: "CNPJ inválido. Formato esperado apenas números"}), 
});
