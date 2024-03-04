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
import { FilterModel } from './filter/filter.model';
import { InvoiceFilter } from './filter/invoice.filter';

@Component({
  selector: 'app-insurance-session-list',
  templateUrl: './insurance-session-list.component.html',
  styleUrls: ['./insurance-session-list.component.scss']
})
export class InsuranceSessionListComponent extends ListTemplate implements OnInit {
  editFields: boolean = false;
  invoiceCreationVisible: boolean = false;
  sessionServiceCodeLine: Observable<SessionServiceCodeLine[]>
  clientId: Observable<number>
  client: Patient;
  filteredSessionServiceCodeLine: Observable<SessionServiceCodeLine[]>
  editSessionVisibility: boolean = false;
  editSessionItemVisibility: boolean = false;
  selectedSessionToEditItem: SessionServiceCodeLine
  sessionItemType: string;
  selectedSessionServiceCodeLine: SelectedSessionServiceLine[]
  editPatientProfileVisibility: boolean = false
  isfiltered: boolean = false
  filterModel: FilterModel = {};
  isSearchAllowed: boolean = false;
  constructor(
    private invoiceEmitterService: InvoiceEmitterService
    , private emitPatientSessionService: EmitPatientSessionService
    , private patientSessionService: PatientSessionService
    , private invoiceService: InvoiceService
    , private patientService: PatientService) { super() }
  public customRanges = {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1))
    ],
    'Last 7 Days': [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(new Date())
    ],
    'Last 30 Days': [
      new Date(new Date().setDate(new Date().getDate() - 29)),
      new Date(new Date())
    ],
    'This Month': [
      new Date(new Date().setDate(1)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ],
    'Last Month': [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    ],
    'Clear': [
      undefined,
      undefined
    ]
  };
  columns = [
    {
      key: 'dos_str',
      label: 'Date Of Service'
    },
    'provider',
    {
      key: 'caseTitle',
      label: 'Case'
    },
    {
      key: 'place',
      _style: { width: '5%' },
    },
    {
      key: 'cpt',
      _style: { width: '8%' },
    },
    {
      key: 'unit',
      _style: { width: '5%' },
    },
    {
      key: 'charge',
      _style: { width: '8%' },
    },
    {
      key: 'correct',
      label: 'Correct',
    },
    {
      key: 'actions',
      label: '',
      filter: false,
      sorter: false
    }
  ];
  toggleDetails() {
    this.editFields = !this.editFields;
  }

  clickOnCreateInvoice() {
    this.invoiceCreationVisible = true;
  }
  ngOnInit(): void {
    this.initListComponent();
    this.find();
    this.invoiceEmitterService.linesInvoiced$.subscribe(result => {
      if (result)
        this.find();
    })
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
  editClient() {
    this.editPatientProfileVisibility = true;
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
  editSession(event: any) {
    this.patientSessionService.findSessionById(event.data.id)
      .subscribe((result) => {
        this.editSessionVisibility = true;
        this.emitPatientSessionService.patientSession$.next(result.records);
      })
  }
  editSessionItem(item: any, itemType: string) {
    this.sessionItemType = itemType;
    this.selectedSessionToEditItem = item;
    this.editSessionItemVisibility = true;
  }
  createInvoice() {
    this.invoiceCreationVisible = true;
  }
  toggleEditSession() {
    this.editSessionVisibility = !this.editSessionVisibility;
  }
  toggleEditSessionItem() {
    this.editSessionItemVisibility = !this.editSessionItemVisibility;
  }
  toggleCreateInvoice() {
    this.invoiceCreationVisible = !this.invoiceCreationVisible
  }

  changeSessionEditVisibility(event: any) {
    if (event === 'close') {
      this.editSessionVisibility = false;
      this.find();
    }
  }
  changeSessionItemVisibility(event: any) {
    if (event === 'close')
      this.editSessionItemVisibility = false;
    this.find();
  }
  changeCreateInvoiceVisibility(event: any) {
    if (event === 'close')
      this.invoiceCreationVisible = false;
  }
  toggleViewPatientProfile() {
    this.editPatientProfileVisibility = !this.editPatientProfileVisibility
  }
  changeEditPorfileVisibility(event: any) {
    if (event === 'close')
      this.editPatientProfileVisibility = false;
  }
}
