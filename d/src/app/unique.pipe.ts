import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    return array.filter((value:any, index:any, self:any) => {
      return index === self.findIndex((obj:any) => obj[field] === value[field]);
    });
  }

  
}
