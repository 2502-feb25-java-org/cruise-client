import { Address } from '../address/address';

export class Route {
    id: number;
    start: Address;
    destination: Address;
    distance: number;
    duration: number;
}
