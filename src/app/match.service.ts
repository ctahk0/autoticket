import { Injectable, ApplicationModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
// import { TblTiket } from './pravila/pravilo';

// import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // tslint:disable-next-line:max-line-length
  //     http://www.oddsmath.com/api/v1/dropping-odds.json/?provider_id=1&cat_id=4&interval=5184000&sortBy=1&limit=100&language=en // AH0
  url = 'http://www.oddsmath.com/api/v1/dropping-odds.json/?provider_id=1&cat_id=4&interval=5184000&sortBy=1&limit=100&language=en';
  // url = 'http://localhost:3000/data';

  // change this for production
  // prodUrl = 'locapi';
  prodUrl = '/odds/php';

datajsn: Object;
tiketjsn: Object;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {

    const apiURL = `http://japauto.parts:8080/${this.url}`;
    // const apiURL = `${this.url}`;
    return this.http.get(apiURL);
  }

  /** POST: add a new hero to the database */
  insertData() {
    const apiURL = `http://japauto.parts:8080/${this.url}`;
    const promise = new Promise((resolve, reject) => {
    // const apiURL = `locapi/insertmatch.php`;
    this.http.get(apiURL)
      .toPromise()
      .then(
        res => { // Success
          this.datajsn = res['data'];
          // sada saljemp post na PHP
          const locURL = `${this.prodUrl}/insertmatch.php`;
          this.http.post(locURL, this.datajsn, httpOptions).toPromise().then(
            res1 => {
              console.log('Match: ', res1);
            }
          );
          resolve();
        }
      );
    });
  return promise;
  }

    /** INSERT tiket */
    insertTiket(tiket) {

      // /insertmatch.php'
      const locURL = `${this.prodUrl}/inserttiket.php`;
      const promise = new Promise((resolve, reject) => {
            this.http.post(locURL, tiket, httpOptions).toPromise().then(
              res1 => {
                console.log('Tiket ', res1);
              }
            );
            resolve();
          }
        );
    return promise;
    }

  /** READ tiket */
  readTiket(): Observable<any> {
    const locURL = `${this.prodUrl}/select.php?tbl=t1`;
    return this.http.get(locURL);
  }
  readTiket1(): Observable<any> {
    const locURL = `${this.prodUrl}/select.php?tbl=t2`;
    return this.http.get(locURL);
  }
  /** DELETE */
  deleteTiket(id) {
      const locURL = `${this.prodUrl}/deletetiket.php`;
      return this.http.post(locURL, { id: id }, httpOptions)
        .pipe(
          map((res) => res)
        );
  }

  /** DELETE */
  updateTiket(rez, id) {
      const locURL = `${this.prodUrl}/updatetiket.php`;
      return this.http.post(locURL, {
        id: id,
        rez: rez
      }, httpOptions)
        .pipe(
          map((res) => res)
        );
  }
}

