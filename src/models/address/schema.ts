import { z } from "zod";

export const AddressSchema = z.object({
    street: z.string(),
    city: z.string().regex(/^[a-zA-ZÀ-ÿ\s]+$/, {
        message: "Cidade inválida. Apenas letras e espaços são permitidos."
    }),
    state: z.string().regex(/^[a-zA-ZÀ-ÿ\s]+$/, {
        message: "Estado inválido. Apenas letras e espaços são permitidos."
    }),
    zipCode: z.string().regex(/^[0-9]{8}$/, {message: "CEP Inválido"}),
    neighborhood: z.string(),
    number: z.number()
});
