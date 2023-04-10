import { Component } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { RickAndMortyDataService } from '../service/rick-and-morty-data.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchTerm$ = new Subject<string>();
  characters$! : Observable<any[]>;

constructor( private searchSvc:RickAndMortyDataService ){  
  this.characters$ = this.searchTerm$.pipe(
    filter((termino:string) => termino.length >= 3), //Hasta que no se ingresen como minimo 3 letras no se van disparar la busqueda
    debounceTime(1000),
    distinctUntilChanged(),// si el ultimo valor emitido/ingresado por el usuario es el mismo entonces no hace otra solicitud a la api
    switchMap((term :string)=> this.searchSvc.filterCharacter(term))
  )
}
search(event:Event):void{
  const element = event.currentTarget as HTMLInputElement;
  this.searchTerm$.next(element.value);
}
}
