import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { TblPravilo } from './pravilo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SerPravilaService {
  pravilas: TblPravilo[];
  // _url = 'locapi';
  _url = '/odds/php';  // for production url
  constructor(private _http: HttpClient) { }

  /** Read */
  readPravila(): Observable<TblPravilo[]> {
    const locURL = `${this._url}/select.php?tbl=pravila`;
    return (this._http.get(locURL)
      .pipe(
        map(res => res as TblPravilo[])
      ));
  }

  /** INSERT */
  insertPravila(pravilo): Observable<TblPravilo[]> {
    const locURL = `${this._url}/insertpravilo.php`;
    return this._http.post(
      locURL,
      pravilo,
      httpOptions
    )
      .pipe(
        map((res) => res as TblPravilo[])
      );
  }

  /** DELETE */
  deletePravilo(id) {
    const locURL = `${this._url}/deletepravilo.php`;
    return this._http.post(locURL, { id: id }, httpOptions)
      .pipe(
        map((res) => res)
      );
  }
}
