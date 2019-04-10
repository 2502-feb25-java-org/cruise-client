import { Rider } from '../rider/rider';
import { Car } from '../car/car';
import { Route } from '../route/route';

export class Ride {
    id: number;
    startTime: Date;
    endTime: Date;
    rider: Rider;
    car: Car;
    route: Route;
}
