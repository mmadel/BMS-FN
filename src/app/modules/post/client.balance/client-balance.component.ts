import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CustomDdateRanges } from '../../invoice/area/session.list/constant/custom.date.ranges';
import { PatientService } from '../../patient/service/patient.service';
import { PostingFilterModel } from '../bip/filter/posting.filter.model';

@Component({
  selector: 'app-client-balance',
  templateUrl: './client-balance.component.html',
  styleUrls: ['./client-balance.component.scss']
})
export class ClientBalanceComponent implements OnInit {
  isLoading = false;
  postingFilterModel: PostingFilterModel = {};
  filteredPatients: any;
  patientClient = new FormControl();
  customRanges = CustomDdateRanges.dateRnage;
  enteredClientName: string;
  selectedSearchOption: string = "none";
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.findPatientByNameAutoComplete();
  }
  changePatientValue(event: any) {
    this.postingFilterModel.entityId = event;
  }
  private findPatientByNameAutoComplete() {
    this.patientClient.valueChanges
      .pipe(
        filter(text => {
          if (text === undefined)
            return false;
          if (text.length > 0) {
            return true
          } else {
            this.filteredPatients = [];
            return false;
          }
        }),
        debounceTime(500),
        tap((value) => {
          this.enteredClientName = value;
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
  search(){

  }
  
  clear(filterType: number) {
    
  }
}
