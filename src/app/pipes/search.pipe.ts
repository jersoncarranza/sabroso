import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(lista: any[], texto: string): any[] {

        if(!texto) return lista;
       // return lista.filter(user => user.nombres.indexOf(texto)>-1);

       return lista.filter(
           user => user.nombres.toUpperCase().includes(texto.toUpperCase()) || user.nombres.includes(texto)
           //user =>  user.sexo.indexOf((texto)>'-1') //!== -1;
           //return String.prototype.indexOf.apply(this, arguments) !== -1;

        );
    }

}
