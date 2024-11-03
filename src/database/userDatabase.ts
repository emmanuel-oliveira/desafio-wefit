import { UserFactory } from "../models/user/factory";
import { PF, PJ, User } from "../models/user/user";
import { CustomError } from "../Resources/CustomError";
import { KnexError, setupKnex } from "./database";

export async function createUserDB(user: User) {
    const trx = await setupKnex.transaction();

    try {
        const [userId] = await trx("Users").insert({
            name: user.name,
            celPhone: user.celPhone,
            phone: user.phone,
            email: user.email,
            type: user.type,
            cpf: user.type === "PF" ? (user as PF).cpf : null,
            cnpj: user.type === "PJ" ? (user as PJ).cnpj : null,
        });

        await trx("Addresses").insert({
            userId: userId,
            street: user.address.street,
            city: user.address.city,
            state: user.address.state,
            zipCode: user.address.zipCode,
            neighborhood: user.address.neighborhood,
        });

        console.log("Usuário criado com sucesso:", userId);
        
        await trx.commit();
    } catch (error) {
        await trx.rollback();

        const knexError = error as KnexError;

        if (knexError instanceof Error) {

            if (knexError.code === 'ER_DUP_ENTRY') {
                const duplicateField = knexError.sqlMessage.match(/Duplicate entry '([^']+)' for key '([^']+)'/);
                const message = duplicateField 
                    ? `${duplicateField[2].replace("_UNIQUE", "")} já registrado`
                    : "Usuário já registrado";
                throw new CustomError({ message: message, statusCode: 409 });
            }

            throw new CustomError({ message: "Erro ao criar usuário", statusCode: 500 });
        } else {
            console.log("Erro desconhecido:", error);
            throw new CustomError({ message: "Erro inesperado", statusCode: 500 });
        }
    }
}




export async function listUsersDB() : Promise<User[]>{
    try {

        const data = await setupKnex("Users").leftJoin("Addresses", "Users.id", "userId").select()


        const response = data.map(user => {
            const { id, street, city, zipCode, neighborhood, state, number, ...rest } = user;
          
            return {
              ...rest,
              address: {
                id,
                street,
                city,
                zipCode,
                neighborhood,
                state,
                number,
              },
            };
          });
          
          
          const users = response.map(user => UserFactory.createUser(user));
          
          
          return users;


    } catch (error) {
        console.log("Erro desconhecido:", error);
        throw new CustomError({ message: "Erro inesperado", statusCode: 500 });
    }
}


