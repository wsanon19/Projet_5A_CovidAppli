import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtre'
})
export class FiltrePipe implements PipeTransform {

  transform(value:any[], mot: string, propMot:string): any[]{
    const result: any = [];

    if(!value || mot ==='' || propMot ===''){
      return value;
    }

    value.forEach((a:any)=>{
      if(a[propMot].trim().toLowerCase().includes(mot.toLowerCase())){
        result.push(a);
      } //trim() si on rentre en majuscule ou min la valeur est acceptée dans le champ recherche
    })
    return result;
  }

}
