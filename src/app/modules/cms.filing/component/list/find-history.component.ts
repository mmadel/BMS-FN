import { Component, OnInit } from '@angular/core';
import { ListTemplate } from 'src/app/modules/model/template/list.template';

@Component({
  selector: 'app-find-history',
  templateUrl: './find-history.component.html',
  styleUrls: ['./find-history.component.scss']
})
export class FindHistoryComponent extends ListTemplate implements OnInit {

  constructor() { super()}

  ngOnInit(): void {
  }

}
