import { Rider } from '../rider/rider';
import { Car } from '../car/car';
import { Route } from '../route/route';
import { Address } from '../address/address';

export class Ride {
    id: number;
    startTime: Date;
    endTime: Date;
    rider: Rider;
    car: Car;
    route: Route;
    start: Address;
    destination: Address;
    distance: number;
    duration: number;
    type: string;
    
}
