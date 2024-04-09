import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CustomDdateRanges } from '../../invoice/area/session.list/constant/custom.date.ranges';
import { PostingEmitterService } from '../../invoice/service/emitting/posting-emitter.service';
import { PatientService } from '../../patient/service/patient.service';
import { PostingFilterModel } from '../bip/filter/posting.filter.model';
import { ClientBalanceInvoice } from '../model/clinet.balance.invoice';
import { ClientBalanceService } from '../service/client-balance.service';
import { FinalizeChargeComponent } from './finalize.charge/finalize-charge.component';
import { PendingInsuranceComponent } from './pending.insurance/pending-insurance.component';

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
  searchFlag: boolean = false;
  @ViewChild('pendingInsurance') pendingInsuranceComponent: PendingInsuranceComponent;
  @ViewChild('finalizeCharge') finalizeChargeComponent: FinalizeChargeComponent;
  constructor(private patientService: PatientService
    , private postingEmitterService: PostingEmitterService
    , private clientBalanceService: ClientBalanceService) { }

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
  search() {
    this.searchFlag = true;
    if (this.postingFilterModel.searchStartDate !== undefined)
      this.postingFilterModel.startDate = moment(this.postingFilterModel.searchStartDate).unix() * 1000

    if (this.postingFilterModel.searchEndDate !== undefined)
      this.postingFilterModel.endDate = moment(this.postingFilterModel.searchEndDate).unix() * 1000

    console.log(JSON.stringify(this.postingFilterModel))
    this.postingEmitterService.searchPostingInsuranceCompany$.next(this.postingFilterModel)
  }

  clear(filterType: number) {
    this.searchFlag = false;
  }
  export() {
    var clientBalanceInvoice: ClientBalanceInvoice = {
      pendingClientBalance: this.pendingInsuranceComponent.selectedPendingClientBalance,
      finalizedClientBalance: this.finalizeChargeComponent.selectedfinalizeClientBalance
    }
    this.clientBalanceService.export(clientBalanceInvoice).subscribe(result => {
      this.constructExportedFile(result, 'invoice-', 'pdf')
      console.log('exported');
    }, error => {
      console.log('error during exporting');
    })
  }
  constructExportedFile(response: any, fileName: string, extention: string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(response)
    a.href = objectUrl
    var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    a.download = fileName + nameDatePart + '.' + extention;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
}
