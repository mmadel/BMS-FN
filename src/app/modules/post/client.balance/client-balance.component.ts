import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, filter, finalize, switchMap, tap } from 'rxjs';
import { CustomDdateRanges } from '../../invoice/area/session.list/constant/custom.date.ranges';
import { PostingEmitterService } from '../../invoice/service/emitting/posting-emitter.service';
import { PatientService } from '../../patient/service/patient.service';
import { Role } from '../../secuirty/model/roles';
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
  componentRole: string[] = [Role.PAYMENT_ROLE, Role.BALANCE_STATEMENT_PAYMENT_ROLE];
  isLoading = false;
  postingFilterModel: PostingFilterModel = {};
  filteredPatients: any;
  patientClient = new FormControl();
  customRanges = CustomDdateRanges.dateRnage;
  enteredClientName: string;
  selectedSearchOption: string = "none";
  searchFlag: boolean = false;
  settingsVisible: boolean = false;
  @ViewChild('pendingInsurance') pendingInsuranceComponent: PendingInsuranceComponent;
  @ViewChild('finalizeCharge') finalizeChargeComponent: FinalizeChargeComponent;
  constructor(private patientService: PatientService
    , private postingEmitterService: PostingEmitterService
    , private clientBalanceService: ClientBalanceService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.findPatientByNameAutoComplete();
    this.clientBalanceService.clientPaymentUpdated$.pipe(
      filter(result => result !== null),
    ).subscribe(result => {
      if (result === 0)
        this.pendingInsuranceComponent.find()
      if (result === 1)
        this.finalizeChargeComponent.find()
    })
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

    this.postingEmitterService.searchPostingInsuranceCompany$.next(this.postingFilterModel)
  }

  clear(filterType: number) {
    this.searchFlag = false;
  }
  clearDOSFilter(){
    this.postingFilterModel.searchStartDate = undefined;
    this.postingFilterModel.searchEndDate = undefined;
  }
  export() {
    var clientBalanceInvoice: ClientBalanceInvoice = {
      pendingClientBalance: this.pendingInsuranceComponent.selectedPendingClientBalance,
      finalizedClientBalance: this.finalizeChargeComponent.selectedfinalizeClientBalance
    }
    if ((clientBalanceInvoice.finalizedClientBalance !== undefined &&
      clientBalanceInvoice.finalizedClientBalance.length > 0) ||
      clientBalanceInvoice.pendingClientBalance !== undefined
      && clientBalanceInvoice.pendingClientBalance.length > 0) {
      this.clientBalanceService.export(clientBalanceInvoice).subscribe(result => {
        this.constructExportedFile(result, 'invoice-', 'pdf')
      }, error => {
      })
    } else {
      this.toastr.error("Select atleast One row ")
      this.scrollUp()
    }
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
  toggleSettingsVisible() {
    this.settingsVisible = !this.settingsVisible
  }
  openSettings() {
    this.settingsVisible = true;
  }
  changeClientBalanceSettings(event: any) {
    this.settingsVisible = false;
  }
  scrollUp() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }
}
