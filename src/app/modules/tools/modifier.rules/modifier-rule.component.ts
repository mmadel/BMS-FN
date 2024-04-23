import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModifierRule } from './model/modifier.rule';
import { ModifierRuleService } from './service/modifier-rule.service';
import usersData from './_data';
@Component({
  selector: 'app-modifier-rule',
  templateUrl: './modifier-rule.component.html',
  styleUrls: ['./modifier-rule.component.scss']
})
export class ModifierRuleComponent implements OnInit {
  modifierRules: ModifierRule[]
  public addRuleVisible = false;
  usersData = usersData
  columns = [
    'modifier',
    'cptCode',
    'appender',
    {
      key: 'actions',
      label: '',
      _style: { width: '20%' }
    }
  ];
  clickAddRule() {
    this.addRuleVisible = !this.addRuleVisible;
  }
  constructor(private modifierRuleService: ModifierRuleService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.find();
  }
  toggleAddRule() {
    this.addRuleVisible = !this.addRuleVisible;
  }
  handleAddRuleChange(event: boolean) {
    this.addRuleVisible = event;
  }
  edit() {

  }
  delete() {

  }
  private find() {
    this.modifierRuleService.findAll().subscribe((result: any) => {
      this.modifierRules = result
    }, error => {
      this.toastr.error('error during getting modifier rules');
    })
  }
}
