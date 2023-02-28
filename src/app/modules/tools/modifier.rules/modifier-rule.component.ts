import { Component, OnInit } from '@angular/core';
import usersData from './_data';
@Component({
  selector: 'app-modifier-rule',
  templateUrl: './modifier-rule.component.html',
  styleUrls: ['./modifier-rule.component.scss']
})
export class ModifierRuleComponent implements OnInit {
  usersData = usersData
  columns = [
    'modifier',
    'CPT',
    'addto',
    'perm',
    {
      key: 'delete',
      label: '',
      _style: { width: '20%' }
    }
  ];
  clickAddRule(){
    
  }
  constructor() { }

  ngOnInit(): void {
  }

}
