import { Component, OnInit } from '@angular/core';
import { SerPravilaService } from '../serPravila.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TblPravilo } from '../pravilo';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
  providers: [SerPravilaService]
})

export class InsertComponent implements OnInit {
  pravila: TblPravilo[] = [];

  // Form
  insertPravilo_form: FormGroup;

  // initialize 'service' and 'form builder'
  constructor(
    private pravilaService: SerPravilaService,
    private formBuilder: FormBuilder
  ) {
      // based on our html form, build our angular form
      this.insertPravilo_form = formBuilder.group({
        opis: ['', Validators.required],
        kvota1: ['', Validators.required],
        kvota2: ['', Validators.required],
        razlika: ['', Validators.required]
    });
  }

  /** INSERT into db */
  insertPravilo() {
    // send data to server
    this.pravilaService.insertPravila(this.insertPravilo_form.value)
        .subscribe(
            ret => {
                // show an alert to tell the user if product was created or not
                // console.log('Log: ', this.insertPravilo_form.value);
                this.pravila.push(this.insertPravilo_form.value);
                this.insertPravilo_form.reset();
                // go back to list of products
            },
            error => console.log(error)
        );
  }
  /** READ from table */
  showPravila() {
    this.pravilaService.readPravila()
      .subscribe(ret => this.pravila = ret);
  }
  /** DELETE */
  deletePravilo(id: number, index: number) {
    // delete data from database
    this.pravilaService.deletePravilo(id)
    .subscribe(
        ret => {
            // show an alert to tell the user if product was created or not
            console.log(ret);
        },
        error => console.log(error)
    );
    this.pravila.splice(index, 1);
   }

  /** INIT DUNCTION */
  ngOnInit() {
    this.showPravila();
  }

}
