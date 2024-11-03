
export class CustomError {
    message: string;
    statusCode: number;

    constructor(props: { message: string; statusCode: number }) {
        this.message = props.message; 
        this.statusCode = props.statusCode;
    }
}
