import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address/address';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Pipe({
  name: 'stringify'
})
export class StringifyPipe implements PipeTransform {

  transform(address: Address): string {
    return Address.stringify(address);
  }
}
