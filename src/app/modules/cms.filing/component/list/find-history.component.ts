import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
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
  sessionsHistorys: SessionHistory[]
  pageSize: number = 5;
  pageIndex: number = 0;
  totalItems = 0;
  sessionHistoryCriteria: SessionHistoryCriteria
  constructor(private sessionHistoryService: SessionHistoryService) {
  }
  ngOnInit(): void {
    this.find()
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
    }
  }
}
