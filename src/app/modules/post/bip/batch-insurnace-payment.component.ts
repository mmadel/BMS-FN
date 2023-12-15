import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs';
import { PatientService } from '../../patient/service/patient.service';

@Component({
  selector: 'app-batch-insurnace-payment',
  templateUrl: './batch-insurnace-payment.component.html',
  styleUrls: ['./batch-insurnace-payment.component.scss']
})
export class BatchInsurnacePaymentComponent implements OnInit {
  patientClient = new FormControl();
  selectedSearchOption: string = "none";
  filteredPatients: any;
  isLoading = false;

  constructor(private patientService: PatientService) {
  }
  ngOnInit(): void {
    this.findPatientByNameAutoComplete();
  }

  private findPatientByNameAutoComplete() {
    this.patientClient.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 1) {
            return true
          } else {
            this.filteredPatients = [];
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.filteredPatients = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          return this.patientService.findByName(value)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
        }
        )
      )
      .subscribe(data => {
        console.log(JSON.stringify(data))
        if (data == undefined) {
          this.filteredPatients = [];
        } else {
          this.filteredPatients = data;
        }
      },
        error => {
          this.isLoading = false
        });
  }
}
