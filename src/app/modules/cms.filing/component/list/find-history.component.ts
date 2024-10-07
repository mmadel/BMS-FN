import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { filter, interval, Subscription } from 'rxjs';
import { CustomDdateRanges } from 'src/app/modules/invoice/area/session.list/constant/custom.date.ranges';
import { EmitPatientSessionService } from 'src/app/modules/patient/service/session/shared/emit-patient-session.service';
import { SessionHistory } from '../../model/session.history';
import { SessionHistoryCriteria } from '../../model/session.history.criteria';
import { SessionHistoryService } from '../../service/session-history.service';
import { SessionHistoryFilter } from '../../util/session.history.filter';

@Component({
  selector: 'app-find-history',
  templateUrl: './find-history.component.html',
  styleUrls: ['./find-history.component.scss']
})
export class FindHistoryComponent implements OnInit {
  subscription: Subscription;
  sessionsHistorys: SessionHistory[]
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems = 0;
  customRanges = CustomDdateRanges.dateRnage;
  sessionHistoryCriteria: SessionHistoryCriteria = {
    selectedStatus: []
  }
  status = [
    { id: 1, name: 'Success', checked: false },
    { id: 2, name: 'Pending', checked: false },
    { id: 3, name: 'acknowledge', checked: false },
    { id: 3, name: 'error', checked: false }
  ];
  constructor(private sessionHistoryService: SessionHistoryService,
    private emitPatientSessionService: EmitPatientSessionService) {
  }
  ngOnInit(): void {
    this.find()
    this.runJob();
    this.emitPatientSessionService.requestSessionsHistorty$.pipe(
      filter(result => result !==undefined || result !== null || !result)
    ).subscribe(re=>{
      this.find();
    })
  }
  private runJob() {
    const source = interval(600000);
    this.subscription = source.subscribe(val => {
      this.find()
    });
  }
  private find() {
    this.sessionHistoryService.find(this.pageIndex, this.pageSize)
      .subscribe((result: any) => {
        this.sessionsHistorys = result.records;
        this.totalItems = result.number_of_records;
      })
  }
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.find();
  }
  getColor(status: string): string {
    switch (status) {
      case 'Success':
        return 'light';
      case 'Pending':
        return 'primary';
      case 'acknowledge':
        return 'success';
      case 'error':
        return 'danger';
    }
    return '';
  }
  search() {
    var validFilter: SessionHistoryFilter = new SessionHistoryFilter();
    if (validFilter.isValid(this.sessionHistoryCriteria)) {
      this.sessionHistoryCriteria.dosStart = this.sessionHistoryCriteria.dosStart_Date !== undefined ? moment(this.sessionHistoryCriteria.dosStart_Date).unix() * 1000 : undefined
      this.sessionHistoryCriteria.dosEnd = this.sessionHistoryCriteria.dosEnd_Date !== undefined ? moment(this.sessionHistoryCriteria.dosEnd_Date).unix() * 1000 : undefined

      this.sessionHistoryCriteria.submitStart = this.sessionHistoryCriteria.submitStart_Date !== undefined ? moment(this.sessionHistoryCriteria.submitStart_Date).unix() * 1000 : undefined
      this.sessionHistoryCriteria.submitEnd = this.sessionHistoryCriteria.submitEnd_Date !== undefined ? moment(this.sessionHistoryCriteria.submitEnd_Date).unix() * 1000 : undefined
      if (this.sessionHistoryCriteria.selectedStatus !== null && this.sessionHistoryCriteria.selectedStatus.length === 0)
        this.sessionHistoryCriteria.selectedStatus = null
      this.sessionHistoryService.search(this.pageIndex, this.pageSize, this.sessionHistoryCriteria)
        .subscribe((result: any) => {
          this.sessionsHistorys = result.records.records;
          this.totalItems = result.records.number_of_records;
        })
    } else {
      this.find();
    }
  }
  clearFilter(filter: string) {
    switch (filter) {
      case 'insurance_company':
        this.sessionHistoryCriteria.insuranceCompany = undefined;
        break;
      case 'client':
        this.sessionHistoryCriteria.client = undefined;
        break;
      case 'provider':
        this.sessionHistoryCriteria.provider = undefined;
        break;
      case 'claim_id':
        this.sessionHistoryCriteria.claimId = undefined;
        break;
    }
  }
  onCheckboxChange(item: any) {
    if (this.sessionHistoryCriteria.selectedStatus === null)
      this.sessionHistoryCriteria.selectedStatus = []
    if (item.checked) {
      this.sessionHistoryCriteria.selectedStatus.push(item.name);
    } else {
      const index = this.sessionHistoryCriteria.selectedStatus.indexOf(item.name);
      if (index > -1) {
        this.sessionHistoryCriteria.selectedStatus.splice(index, 1);
      }
    }
  }
}
