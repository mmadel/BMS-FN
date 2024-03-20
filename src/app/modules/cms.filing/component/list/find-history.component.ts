import { Component, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { Observable } from 'rxjs';
import { ListTemplate } from 'src/app/modules/model/template/list.template';
import { SessionHistory } from '../../model/session.history';
import { SessionHistoryService } from '../../service/session-history.service';

@Component({
  selector: 'app-find-history',
  templateUrl: './find-history.component.html',
  styleUrls: ['./find-history.component.scss']
})
export class FindHistoryComponent extends ListTemplate implements OnInit {
  SessionsHistory$: Observable<SessionHistory[]>
  details_visible = Object.create({});
  constructor(private sessionHistoryService: SessionHistoryService) { super() }
  columns: (IColumn | string)[] = [
    'submissionId','insuranceCompany','client','provider','submissionType','claimStatus',
    {
      key: 'show',
      label: '',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'actions',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false,
    },
  ]
  ngOnInit(): void {
    this.find()
  }

  private find(){
    this.SessionsHistory$ = this.sessionHistoryService.find();
  }
  getClaimStatus(status:string ){
    switch (status) {
      case 'submit':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'submit':
        return 'warning'
      case 'error':
        return 'danger'
      default:
        return 'primary'
    }
  }
  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }
}
