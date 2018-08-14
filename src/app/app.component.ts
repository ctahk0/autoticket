import { Component, ViewChild } from '@angular/core';
import { MatchService } from './match.service';
import { interval } from 'rxjs';

// import * as $ from 'jquery';
// import { ChangeDetectionStrategy } from '@angular/core';
// import { Observable } from 'rxjs';
import { Tim } from './timovi';
import { SerPravilaService } from './pravila/serPravila.service';
import { TiketComponent } from './tiket/tiket/tiket.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(TiketComponent) child: TiketComponent;
  show = false;
  showodds = false;
  buttonName = 'Pravila';
  buttonOdds = 'Show odds';
  title = 'Hello there';
  teams = [];
  a = 30;
  pravila = [];
  datajsn = [];
  // displayedColumns: string[] = ['dtime', 'hometeam', 'o_ah1', 'o_ah2', 'awayteam'];
  // dataSource;
  // dataSource: Tim[] = [];

  constructor (private matchService: MatchService, private pravilaServ: SerPravilaService) { }

  ngOnInit() {
    this.getOdds();
    this.getPravila();
    // this.jq();
    // console.log(this.a);
    const myObservable = interval(1000);
    myObservable.subscribe(
      x => {
        this.a --;
        // tslint:disable-next-line:triple-equals
        if (this.a == 10) {
          // console.log('sad okidaj', this.a);
          this.insertMatches();
        // tslint:disable-next-line:triple-equals
        } else if (this.a == 5) {
          this.playTiket();
        // tslint:disable-next-line:triple-equals
        } else if (this.a == 0) {
          this.a = 30;
          this.getOdds();
          // this.playTiket();
          this.child.updateTiket();
        }
      }
    );
  }

  /** PLAY ticket */

  playTiket() {
    this.datajsn = [];
    // console.log(this.pravila);
    this.pravila.forEach(pravilo => {
        // console.log(pravilo.kvota1);
        this.teams.forEach(team => {
          const r1 = team.o_ah1 - team.c_ah1;
          const r2 = team.o_ah2 - team.c_ah2;
          // za procenat
          // rt1 = 1 / o1 * 100
          // rt2 = 1 / c1 * 100
          // r1 = rt2 - rt1
          // razllika za AH0 - 1
          const ro1 = 1 / team.o_ah1 * 100;
          const rc1 = 1 / team.c_ah1 * 100;
          const pr1 = rc1 - ro1;
          // razllika za AH0 - 2
          const ro2 = 1 / team.o_ah2 * 100;
          const rc2 = 1 / team.c_ah2 * 100;
          const pr2 = rc2 - ro2;

          if (pr1 > 0 || pr2 > 0) {
            if (pravilo.opis == 'procenat') {
              if (team.o_ah1 >= pravilo.kvota1 && team.o_ah1 < pravilo.kvota2) {
                if (pr1 >= pravilo.razlika) {
                  this.datajsn.push ({
                    'gameid' : team.id,
                    'tip' : '1',
                    'odds' : team.c_ah1,
                    'razlika'  : pr1,
                    'currodds' : team.c_ah1,
                    'napomena' : 'procenat'
                  });
                }
              }
              if (team.o_ah2 >= pravilo.kvota1 && team.o_ah2 < pravilo.kvota2) {
                if (pr2 >= pravilo.razlika) {
                  this.datajsn.push ({
                    'gameid' : team.id,
                    'tip' : '2',
                    'odds' : team.c_ah2,
                    'razlika'  : pr2,
                    'currodds' : team.c_ah2,
                    'napomena' : 'procenat'
                  });
                }
              }
            }
          }


          if (r1 > 0 || r2 > 0) {
            if (pravilo.opis == 'razlika') {
              if (team.o_ah1 >= pravilo.kvota1 && team.o_ah1 < pravilo.kvota2) {
                // console.log(team.hometeam, '-', team.awayteam, ' ' , team.o_ah1, ':', pravilo.kvota1, '-', pravilo.kvota2);
                if (r1 >= pravilo.razlika) {
                  // igraj tiket
                  // kreira json za post
                  this.datajsn.push ({
                    'gameid' : team.id,
                    'tip' : '1',
                    'odds' : team.c_ah1,
                    'razlika'  : r1,
                    'currodds' : team.c_ah1,
                    'napomena' : 'razlika'
                  });
                  // console.log('Tiket:', this.datajsn);
                }
              }

              if (team.o_ah2 >= pravilo.kvota1 && team.o_ah2 < pravilo.kvota2) {
                // console.log(team.hometeam, '-', team.awayteam, ' ' , team.o_ah1, ':', pravilo.kvota1, '-', pravilo.kvota2);
                if (r2 >= pravilo.razlika) {
                  // igraj tiket
                  // kreira json za post
                  this.datajsn.push ({
                    'gameid' : team.id,
                    'tip' : '2',
                    'odds' : team.c_ah2,
                    'razlika'  : r2,
                    'currodds' : team.c_ah2,
                    'napomena' : 'razlika'
                  });
                  // console.log('Tiket:', this.datajsn);
                }
              }
            }
          }
        });
    });
    this.matchService.insertTiket(this.datajsn);
  }

  /** Get pravila from table and store into array */
  getPravila() {
    this.pravilaServ.readPravila()
      .subscribe(ret => {
        this.pravila = ret;
        // console.log(this.pravila);
      });
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    this.show ? this.buttonName = 'X' : this.buttonName = 'Pravila';
  }

  toggleOdds() {
    this.showodds = !this.showodds;
    // CHANGE THE NAME OF THE BUTTON.
    this.showodds ? this.buttonOdds = 'Hide' : this.buttonOdds = 'Show odds';
  }

  trackElement(index: string, element: any) {
    return element ? element['x-id'] : null;
  }

  getOdds() {
    const teams1 = [];
    this.matchService.getData().subscribe(
      response => {
        const data = (response.data);
        // const data = (response);
          for (const tim in data) {
            if (data.hasOwnProperty(tim)) {
              let d;
              d = new Date (data[tim]['time']);
              d.setHours(d.getHours(d) + 2);
              teams1.push(new Tim(
                data[tim]['x-id'],
                d,
                data[tim]['hometeam'],
                data[tim]['awayteam'],
                data[tim]['first']['1'],
                data[tim]['first']['2'],
                data[tim]['last']['1'],
                data[tim]['last']['2']
              ));

            }
          }
          this.insert(this.teams, teams1);
          // console.log('Teams ', this.teams);
          // console.log('Teams1 ', teams1);
          // this.dataSource = this.teams;
      }
    );
  }

  insert(arr, data) {
    function iter(arr) {
          arr.forEach(function (a) {
              if (!('id' in a)) {
                  return;
              }
              if (o[a.id] !== a) {
                  o[a.id] = a;
              }
              Object.keys(a).forEach(function (k) {
                  Array.isArray(a[k]) && iter(a[k]);
              });
          });
    }

    const o = {};

    iter(arr);
      data.forEach(function (a) {
          if (o[a.id]) {
              Object.keys(a).forEach(function (k) {
                  o[a.id][k] = a[k];
              });
              return;
          }
          arr.push(a);
    });
  }

  insertMatches() {
    this.matchService.insertData();
    //  .subscribe();
  }



}

