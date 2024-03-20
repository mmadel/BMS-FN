import { Component, OnInit } from '@angular/core';
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
  constructor(private sessionHistoryService: SessionHistoryService) { super() }

  ngOnInit(): void {
    this.find()
  }

  private find(){
    this.SessionsHistory$ = this.sessionHistoryService.find();
  }
}
