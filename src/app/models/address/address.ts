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

    static stringify(address: Address) : string {
        let addressString = "";
        addressString += address.line1 + ", " + address.city + ", " + address.state;
        if (address.zipcode != null)
            addressString += " " + address.zipcode + ", " + address.country;
        if (address.country != null)
            addressString += ", " + address.country;
        return addressString;
    }

    static parse(addressString: string) : Address{
        console.log("Parsing address string: " + addressString)
        let address = new Address();
        let addressParts = addressString.split(',');
        console.log("Address array:")
        console.log(addressParts);
        while (addressParts.length > 4)
            addressParts.splice(1,1);
        let length = addressParts.length;
        if (length > 0)
            address.line1 = addressParts[0].trim();
        if (length > 1)    
            address.city = addressParts[1].trim();
        if (length > 2) {
            let stateAndZipcode = addressParts[2].trim().split(' ');
            address.state = stateAndZipcode[0];
        if (stateAndZipcode.length > 1)
            address.zipcode = stateAndZipcode[1];
        }
        if (length > 3)
            address.country = addressParts[3].trim();
        console.log("Address object:")
        console.log(address);
        return address;
    }
}
