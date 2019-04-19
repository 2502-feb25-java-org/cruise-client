import { Address } from '../address/address';

export class Car {
    id: number;
    status: string;
    make: string;
    model: string;
    maxCapacity: number;
    seatsLeft: number;
    location: Address;
    picture: string;
}
