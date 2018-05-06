import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'userSearch'
})
export class FlimTitlesPipe implements PipeTransform {
  transform(items: any[], nameSearch: string, genderSearch: string,birthyearSearch:string){
    if (items && items.length){
        return items.filter(item =>{
            if (nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
                return false;
            }
            if (genderSearch && item.gender.toLowerCase().indexOf(genderSearch.toLowerCase()) === -1){
                return false;
            }
            if (birthyearSearch && item.birth_year.toLowerCase().indexOf(birthyearSearch.toLowerCase()) === -1){
                return false;
            }
            return true;
       })
    }
    else{
        return items;
    }
}
}
