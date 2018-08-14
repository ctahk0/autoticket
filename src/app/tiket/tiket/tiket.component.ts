import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatchService } from '../../match.service';

// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs4';

@Component({
  selector: 'app-tiket',
  templateUrl: './tiket.component.html',
  styleUrls: ['./tiket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiketComponent implements OnInit {
    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['dTime', 'HomeTeam', 'AwayTeam', 'tip', 'odds', 'curr', 'napomena', 'razlika', 'rezultat', 'profit'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    showAll = 0;
    tiket = [];
    tiketall = [];
    // tiketsum = 0;
    // private chRef: ChangeDetectorRef
    constructor(private matchService: MatchService, private chRef: ChangeDetectorRef ) { }

    ngOnInit() {
        this.showTiket();
        // console.log(this.oddsSum().sumodds);
    }
    toggleAll(tg: number) {
        tg === 1 ? this.showAll = 1 : this.showAll = 0;
        this.updateTiket();
    }
    getCurrentOdds(tip: string, ah1: number, ah2: number) {
        return (tip === '1' ? ah1 : ah2);
    }

    oddsSum() {
        let sumo = 0;
        let sumc = 0;
        this.tiket.forEach(el => {
            sumo += Number(el.odds);
            sumc += (el.tip === '1' ? Number(el.cah0_1) : Number(el.cah0_2));
            // console.log(el.HomeTeam, ' prof: ',  Number(el.profit));
        });
        return {
            'sumodds': sumo.toFixed(1),
            'sumcurr': sumc.toFixed(1)
        };
    }

    /** GET total sum profit */
    profitSum() {
        return this.tiket.map(t => Number(t.profit)).reduce((acc, value) => acc + value, 0);
    }

    // this is filter from material table
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }
    showTiket() {
        this.matchService.readTiket()
        .subscribe((data: any[]) => {
            this.tiket = data;
            // this.tiket.push('profit', data['rezultat'] * data['odds']);
            // this.tiket = this.calcProfit(this.tiket);   // just add some extra fields to array object tiket
            if (!this.showAll) {
                this.tiket = this.tiket.filter(function(t) {
                    return t.rezultat == 3;
                });
            }
            // console.log(this.tiket);
            this.chRef.detectChanges();
            console.log(this.profitSum());
            // console.log(this.tiket);

            this.dataSource = new MatTableDataSource(this.tiket);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    /** UPDATE from table */
    updateTiket() {
        this.matchService.readTiket()
        .subscribe((data: any[]) => {
            this.tiket = data;
            if (!this.showAll) {
                this.tiket = this.tiket.filter(function(t) {
                    return t.rezultat == 3;
                });
            }
            this.chRef.detectChanges();
            this.dataSource = new MatTableDataSource(this.tiket);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.chRef.detectChanges(); // comment this to prevent updates to bet slip
        });
    }

    /** DELETE */
    deleteTiket(id: number, index: number) {
        // delete data from database
        this.matchService.deleteTiket(id)
        .subscribe(
            ret => {
                // show an alert to tell the user if product was created or not
                console.log(ret);
            },
            error => console.log(error)
        );
        this.tiket.splice(index, 1);
        // this.updateTiket();
        // this.dataTable.row(index).remove().draw();
    }

    /** UPDATE */
    rezultTiket(rez: number, gameID: string, napomena: string) {
        console.log('napm: ', napomena);
        const foundIndex = this.tiket.findIndex(x => x.gameID === gameID && x.napomena === napomena);
        console.log(gameID, ' - Found index', foundIndex);
        if (rez === 1) {
            this.tiket[foundIndex].profit += Number(this.tiket[foundIndex].odds) - 1;
            console.log('WIN TIKET !');
        } else if (rez === 0) {
            this.tiket[foundIndex].profit = 0;
            console.log('VOID!');
        } else {
            this.tiket[foundIndex].profit = -1;
            console.log('LOSS!');
        }
        this.chRef.detectChanges();
        // this.tiket[foundIndex].profit += 25;
        // console.log(this.tiket);

        this.matchService.updateTiket(rez, gameID)
            .subscribe(
                ret => {
                    // show an alert to tell the user if product was created or not
                    console.log(ret);
                    // this.chRef.detectChanges();
                    // this.updateTiket();
                },
                error => console.log(error)
            );
    }

}
