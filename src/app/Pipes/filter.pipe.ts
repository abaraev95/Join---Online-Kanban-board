import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: string) :any {
    if (!items || !filter) {
        return items;
    }
    let filteredArray: any[] = [];

    items.forEach((item) => {
      if(item.location == filter) {
        filteredArray.push(item)
      }
    })

    return filteredArray;
    // return items.filter(item => item.location.indexOf(filter) !== -1);
  }

}
