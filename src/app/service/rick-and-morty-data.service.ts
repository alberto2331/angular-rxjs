import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyDataService {
private readonly http = inject(HttpClient);

filterCharacter(name:string):Observable<any>{
  const API = `https://rickandmortyapi.com/api/character/?name=${name}`
  return this.http.get(API)
  .pipe(
    map( (res:any)=> res?.results ),
    tap(res => console.log(res)),
  );
}
}
