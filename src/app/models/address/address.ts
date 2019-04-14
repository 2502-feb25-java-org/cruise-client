import { Statement } from '@angular/compiler';

export class Address {
    id: number;
    type: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;

    stringify() : string {
        return this.line1 + ", " + this.city + ", " + 
            this.state + " " + this.zipcode + ", " + this.country;
    }

    static parse(addressString: string) : Address{
        let address = new Address();
        let addressParts = addressString.split(',');
        while (addressParts.length > 4)
            addressParts.splice(1,1);
        let length = addressParts.length;
        if (length >= 0)
            address.line1 = addressParts[0].trim();
        if (length >= 1)    
            address.city = addressParts[1].trim();
        if (length >= 2)
            address.state = addressParts[2].trim();
        if (length >= 3)
            address.zipcode = addressParts[3].trim();
        if (length >= 4)
            address.country = addressParts[4].trim();
        return address;
    }
}
