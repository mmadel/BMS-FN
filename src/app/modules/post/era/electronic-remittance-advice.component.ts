import { Component, OnInit } from '@angular/core';
import { result } from 'lodash';
import { filter, map, Observable, tap } from 'rxjs';
import { Patient } from '../../model/clinical/patient';
import { ERADetails } from '../../model/invoice/era/era.details';
import { ERAModel } from '../../model/invoice/era/era.model';
import { ListTemplate } from '../../model/template/list.template';
import { EraService } from '../service/era/era.service';

@Component({
  selector: 'app-electronic-remittance-advice',
  templateUrl: './electronic-remittance-advice.component.html',
  styleUrls: ['./electronic-remittance-advice.component.scss']
})
export class ElectronicRemittanceAdviceComponent extends ListTemplate implements OnInit {
  selectedERAModel: ERAModel;
  earList$!: Observable<ERAModel[]>;
  openERAVisibility: boolean = false;
  editPatientProfileVisibility: boolean = false;
  patient: Patient;
  columns = [
    {
      key: 'seen',
      label: '',
    },
    {
      key: 'receivedDate',
      label: 'Receive Date',
    },
    {
      key: 'payerName',
      label: 'Payer',
    },
    {
      key: 'lines',
      label: 'Lines',
    },
    {
      key: 'unapplied',
      label: 'Unapplied',
    },
    {
      label: 'paid',
      key: 'paidAmount',
    },
    { key: 'actions', _style: { width: '5%' } }
  ];

  constructor(private eraService: EraService) { super() }
  ngOnInit(): void {
    this.find();
    this.initListComponent();
    this.eraService.selectedPatient$.pipe(
      filter(result => result !== undefined || result !== null)
    ).subscribe(result => {
      this.patient = result;
    })
  }

  open(item: any) {
    this.selectedERAModel = item;
    this.openERAVisibility = true;
  }
  archive(item: any) {

  }
  private find() {
    this.earList$ = this.eraService.findAll(this.apiParams$).pipe(
      tap((response: any) => {
        this.totalItems$.next(response.number_of_records);
        if (response.number_of_matching_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    )
  }
  toggleOpenERA() {
    this.openERAVisibility = !this.openERAVisibility
  }
  togglePatientProfileModal() {
    this.editPatientProfileVisibility = !this.editPatientProfileVisibility;
    this.openERAVisibility = true;
  }
  changeOpenERAVisibility(event: any) {
    if (event === 'close') {
      this.openERAVisibility = false;
      this.find();
    }
    if (event === 'open-profile') {
      this.openERAVisibility = false;
      this.editPatientProfileVisibility = true
    }
  }
  changePatientProfileVisibility(event: any) {
    if (event === 'profile') {
      this.editPatientProfileVisibility = false;
      this.openERAVisibility = true;
    }
  }
}
