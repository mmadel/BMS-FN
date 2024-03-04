import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Patient } from 'src/app/modules/model/clinical/patient';
import { SelectedSessionServiceLine } from 'src/app/modules/model/invoice/select.session.service.line';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { PatientService } from 'src/app/modules/patient/service/patient.service';
import { PatientSessionService } from 'src/app/modules/patient/service/session/patient.session.service';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { SessionServiceCodeLine } from '../../model/session.service.code.line';
import { InvoiceEmitterService } from '../../service/emitting/invoice-emitter.service';
import { InvoiceService } from '../../service/invoice.service';
import { CustomDdateRanges } from './constant/custom.date.ranges';
import { ServiceLinesTableColumns } from './constant/service.lines.table.columns';
import { FilterModel } from './filter/filter.model';
import { InvoiceFilter } from './filter/invoice.filter';

@Component({
  selector: 'app-insurance-session-list',
  templateUrl: './insurance-session-list.component.html',
  styleUrls: ['./insurance-session-list.component.scss']
})
export class InsuranceSessionListComponent extends ListTemplate implements OnInit {
  sessionServiceCodeLine: Observable<SessionServiceCodeLine[]>
  selectedSessionServiceCodeLine: SelectedSessionServiceLine[]
  selectedSessionToEditItem: SessionServiceCodeLine
  clientId: Observable<number>
  client: Patient;
  editSessionVisibility: boolean = false;
  editSessionItemVisibility: boolean = false;
  editPatientProfileVisibility: boolean = false
  createinvoiceVisibility: boolean = false;

  sessionItemType: string;

  filterModel: FilterModel = {};
  isSearchAllowed: boolean = false;
  constructor(
    private invoiceEmitterService: InvoiceEmitterService
    , private emitPatientSessionService: EmitPatientSessionService
    , private patientSessionService: PatientSessionService
    , private invoiceService: InvoiceService
    , private patientService: PatientService) { super() }

  customRanges = CustomDdateRanges.dateRnage;
  columns = ServiceLinesTableColumns.columns;
  ngOnInit(): void {
    this.initListComponent();
    this.find();
    this.invoiceEmitterService.linesInvoiced$.subscribe(result => {
      if (result)
        this.find();
    })
  }
  search() {
    var invoiceFilter: InvoiceFilter = new InvoiceFilter();
    if (invoiceFilter.isValid(this.filterModel)) {
      this.filterModel.startDate = this.filterModel.searchEndDate !== undefined ? moment(this.filterModel.searchEndDate).unix() * 1000 : undefined
      this.filterModel.endDate = this.filterModel.searchEndDate !== undefined ? moment(this.filterModel.searchEndDate).unix() * 1000 : undefined
      this.sessionServiceCodeLine = this.invoiceService.findByClientFilter(this.apiParams$, this.client.id, this.filterModel)
        .pipe(
          filter((result) => result !== null),
          tap((response: any) => {
            this.totalItems$.next(response.number_of_records);
            if (response.number_of_records) {
              this.errorMessage$.next('');
            }
          }),
          map(response => {
            return response.records.map((element: any) => {
              element.dos_str = moment.unix(element.dos / 1000).format('MM/DD/YYYY')
              return element;
            })
          })
        )

    } else {
      this.find();
    }
  }
  onSelectedServiceCode(event: any) {
    this.selectedSessionServiceCodeLine = event.map((value: any) => {
      return {
        sessionId: value.data,
        serviceLine: value.serviceCode
      }
    });
  }
  clearFilter(filter: string) {
    if (filter === 'provider')
      this.filterModel.provider = undefined;
    if (filter === 'case')
      this.filterModel.sessionCase = undefined;
  }
  toggleModal(modal: any) {
    switch (modal) {
      case "session":
        this.editSessionVisibility = !this.editSessionVisibility;
        break;
      case "session_item":
        this.editSessionItemVisibility = !this.editSessionItemVisibility;
        break;
      case "invoice_create":
        this.createinvoiceVisibility = !this.createinvoiceVisibility;
        break;
      case "patient_edit":
        this.editPatientProfileVisibility = !this.editPatientProfileVisibility
        break;
    }
  }
  changeVisibility(component: any) {
    switch (component) {
      case "session":
        this.editSessionVisibility = false;
        this.find();
        break;
      case "session-item":
        this.editSessionItemVisibility = false;
        this.find();
        break
      case "invoice":
        this.createinvoiceVisibility = false;
        break;
      case "profile":
        this.editPatientProfileVisibility = false;
        break;

    }
  }
  executeAction(action: string, event?: any, extra?: any) {
    switch (action) {
      case "edit_session":
        this.patientSessionService.findSessionById(event.data.id)
          .subscribe((result) => {
            this.editSessionVisibility = true;
            this.emitPatientSessionService.patientSession$.next(result.records);
          })
        break;
      case "edit_session_item":
        this.sessionItemType = extra;
        this.selectedSessionToEditItem = event;
        this.editSessionItemVisibility = true;
        break;
      case "create_invoice":
        this.createinvoiceVisibility = true;
        break;
      case "edit_patient":
        this.editPatientProfileVisibility = true;
        break;
    }
  }
  private find() {
    this.sessionServiceCodeLine = this.invoiceEmitterService.clientId$.pipe(
      filter((result) => result !== null),
      switchMap(clientId => this.patientService.findById(clientId)),
      tap((client: Patient) => this.client = client),
      switchMap((result: Patient) => this.invoiceService.findByClient(this.apiParams$, result.id)),
      tap((response: any) => {
        this.isSearchAllowed = response.number_of_records === 0 ? false : true
        this.totalItems$.next(response.number_of_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
      }),
      map(response => {
        return response.records.map((element: any) => {
          element.dos_str = moment.unix(element.dos / 1000).format('MM/DD/YYYY')
          return element;
        })
      })
    );
  }
}
