export class User {
    name: string;
    celPhone: string;
    phone: string;
    email: string;
    address: Address;
    type: string


    constructor(props: { name: string; celPhone: string; phone: string; email: string; address: Address }) {
        this.name = props.name;
        this.celPhone = props.celPhone;
        this.phone = props.phone;
        this.email = props.email;
        this.address = props.address;
    }
}

export class PF extends User {
    cpf: string;
    type: string = "PF";

    constructor(props: { name: string; celPhone: string; phone: string; email: string; address: Address; cpf: string }) {
        super(props); 
        this.cpf = props.cpf; 
    }
}

export class PJ extends User {
    type: string = "PJ";
    cnpj: string;

    constructor(props: { name: string; celPhone: string; phone: string; email: string; address: Address; cnpj: string }) {
        super(props); 
        this.cnpj = props.cnpj;
    }
}




