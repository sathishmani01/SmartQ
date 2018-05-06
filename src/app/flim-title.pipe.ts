import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flimTitle'
})
export class FlimTitlePipe implements PipeTransform {

  transform(items: any[], args?: any): any {
    if(!args){
      return items;
    }else{
      return items
        ? items.filter(item =>
          item.title && item.title.toLowerCase().indexOf(args.toString().toLowerCase()) != -1):items;

    }
  }

}
