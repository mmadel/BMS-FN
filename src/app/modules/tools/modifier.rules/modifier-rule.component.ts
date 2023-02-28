import { Component, OnInit } from '@angular/core';
import usersData from './_data';
@Component({
  selector: 'app-modifier-rule',
  templateUrl: './modifier-rule.component.html',
  styleUrls: ['./modifier-rule.component.scss']
})
export class ModifierRuleComponent implements OnInit {
  public addRuleVisible = false;
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
  clickAddRule() {
    this.addRuleVisible = !this.addRuleVisible;
  }
  constructor() { }

  ngOnInit(): void {
  }
  toggleAddRule() {
    this.addRuleVisible = !this.addRuleVisible;
  }
  handleAddRuleChange(event: boolean) {
    this.addRuleVisible = event;
  }

}
