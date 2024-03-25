import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { SessionHistory } from '../../model/session.history';
import { SessionHistoryService } from '../../service/session-history.service';

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
  constructor(private sessionHistoryService: SessionHistoryService) { }
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
  search(){
    
  }
}
