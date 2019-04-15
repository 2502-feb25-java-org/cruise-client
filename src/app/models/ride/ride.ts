import { Rider } from '../rider/rider';
import { Car } from '../car/car';
import { Address } from '../address/address';

export class Ride {
    id: number;
    cost: number;
    startTime: Date;
    endTime: Date;
    rider: Rider;
    car: Car;
    start: Address[];
    destination: Address[];
    distance: number;
    duration: number;
    type: string;
    
}
