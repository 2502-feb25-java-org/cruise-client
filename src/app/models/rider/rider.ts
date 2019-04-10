import { Address } from '../address/address';

export class Rider {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    DOB: string;
    picture: string;
    addresses: Address[];
}
