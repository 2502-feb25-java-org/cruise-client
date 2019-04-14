import { Rider } from '../rider/rider';
import { Car } from '../car/car';
import { Address } from '../address/address';

export class Ride {
    id: number;
    cost: number;
    startTime: string;
    endTime: string;
    rider: Rider;
    car: Car;
    origin: Address;
    destination: Address;
    distance: number;
    duration: number;
    type: string;
    
}
