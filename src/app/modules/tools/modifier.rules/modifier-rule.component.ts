import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../secuirty/model/roles';
import { ModifierRule } from './model/modifier.rule';
import { Rule } from './model/rule';
import { ModifierRuleService } from './service/modifier-rule.service';
@Component({
  selector: 'app-modifier-rule',
  templateUrl: './modifier-rule.component.html',
  styleUrls: ['./modifier-rule.component.scss']
})
export class ModifierRuleComponent implements OnInit {
  componentRole: string[] = [Role.BILLING_ROLE, Role.MODIFIER_RULE_BILLING_ROLE];
  modifierRules: ModifierRule[]
  public addRuleVisible = false;
  editRuleVisible: boolean = false;
  hasDefaultRule: boolean = false
  editModifierRule:ModifierRule;
  columns = [
    'name',
    {
      key: 'defaultRule',
      label: 'IsDefault',
    },
    {
      key: 'active',
      label: 'IsActive',
    },
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
  toggleEditRule() {
    this.editRuleVisible = !this.editRuleVisible;
  }
  handleAddRuleChange(event: boolean) {
    this.addRuleVisible = event;
  }
  edit(id: number) {
    this.modifierRuleService.findById(id).subscribe(result => {
      this.editModifierRule = result;
      this.editRuleVisible = true;
    })
  }
  delete(id: number) {
    this.modifierRuleService.deleteById(id).subscribe(result => {
      this.find();
      this.toastr.success("Modifier Rule  deleted.")
    })
  }
  private find() {
    this.modifierRuleService.findAll()
      .subscribe((result: any) => {
        this.modifierRules = result;
        this.hasDefaultRule = this.modifierRules.length === 0 ? true : false
      }, error => {
        this.toastr.error('error during getting modifier rules');
      })
  }
  changeVisibility(event: any) {
    if (event === 'close_create')
      this.addRuleVisible = false;
    if (event === 'close_update')
      this.editRuleVisible = false;
    this.find();
  }
  checkValue(value: ModifierRule) {
    this.modifierRuleService.create(value).subscribe(result => {
      if (value.active)
        this.toastr.success("Modifier Rule set Active");
      if (!value.active)
        this.toastr.success("Modifier Rule set In-Active");

    }, error => {

    })
  }
}
