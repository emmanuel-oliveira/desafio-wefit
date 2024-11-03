import { ZodError } from "zod";
import { PFSchema, PJSchema } from "./schema";
import { CustomError } from "../../Resources/CustomError";
import { parseZodErrors } from "../../Resources/ZodErrors";
import { PF, PJ, User } from "./user";

export class UserFactory {
    static createUser(props: any) : User {
        try{
                switch (props.type) {
                    case "PF":
                        PFSchema.parse(props);
                        return new PF(props);

                    case "PJ":
                        PJSchema.parse(props);
                        return new PJ(props);

                    default:
                        throw new CustomError({message: "Tipo de pessoa inválido", statusCode: 400})
                }

        }catch (error){
            if (error instanceof ZodError) {
                const message = parseZodErrors(error.errors[0]);
                throw new CustomError({message: message, statusCode: 400 });
            }

            if (error instanceof CustomError) {
                throw error;
            }

            console.error(error);
            throw new CustomError({ message: "Erro interno", statusCode: 500 });
        }
        }
    }


