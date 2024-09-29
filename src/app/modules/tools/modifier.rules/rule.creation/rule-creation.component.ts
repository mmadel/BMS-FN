import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InsuranceCompanyHolder } from 'src/app/modules/model/admin/insurance.company.holder';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { ModifierRule } from '../model/modifier.rule';
import { Rule } from '../model/rule';
import { ModifierRuleService } from '../service/modifier-rule.service';

@Component({
  selector: 'app-rule-creation',
  templateUrl: './rule-creation.component.html',
  styleUrls: ['./rule-creation.component.scss']
})
export class RuleCreationComponent implements OnInit {
  componentRole: string[] = [Role.BILLING_ROLE, Role.MODIFIER_RULE_BILLING_ROLE];
  @Output() changeVisibility = new EventEmitter<string>()
  compareFn = this._compareFn.bind(this);
  rule: Rule = {};
  modifierRule: ModifierRule = { insuranceCompany: null }
  rules: Rule[] = new Array();
  @Input() editModifierRule: ModifierRule;
  @Input() defaultRule: boolean
  ruleName: string
  insurance: any;
  mode: string = 'create';
  notValidForm: boolean[] = [];
  constructor(private modifierRuleService: ModifierRuleService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    if (this.editModifierRule !== undefined) {
      this.mode = 'update'
      this.fillModel();
    }

    this.findMetaData();
  }
  private fillModel() {
    this.modifierRule = this.editModifierRule;
    this.defaultRule = this.editModifierRule.defaultRule
    this.ruleName = this.editModifierRule.name;
    this.rules = this.editModifierRule.rules
    this.insurance = this.editModifierRule.insuranceCompany
  }
  insuranceCompanies: InsuranceCompanyHolder[]
  valid: boolean = true;
  modifier: string[] = []
  validModifiers: Boolean[];
  lineMode: string = 'create';


  create() {
    this.modifierRule = {
      id: this.mode === 'create' ? null : this.editModifierRule.id,
      name: this.ruleName,
      rules: this.rules,
      active: this.mode === 'create' ? true : this.editModifierRule.active,
      defaultRule: this.defaultRule
    }
    if (!this.defaultRule)
      this.modifierRule.insuranceCompany = this.insurance;
    else
      this.modifierRule.insuranceCompany = null;
    this.modifierRuleService.create(this.modifierRule).subscribe(() => {
      if (this.mode === 'create')
        this.changeVisibility.emit('close_create')
      else
        this.changeVisibility.emit('close_update')
      this.toastr.success('Modifier Rule Created.')
    })
  }
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }

  private validateForm() {
    if (this.ruleName === undefined || this.ruleName === '')
      this.notValidForm[0] = true;
    else
      this.notValidForm[0] = false;

    if (this.rule.appender === undefined || this.rule.appender === '')
      this.notValidForm[1] = true;
    else
      this.notValidForm[1] = false;
  }

  private findMetaData() {
    this.defaultRule ? this.ruleName = "Default Rule" : ""
    this.modifierRuleService.findInsuranceCompanies().subscribe((result: any) => {
      this.insuranceCompanies = result;
      this.insurance = result[0];
    })
  }

  addRow() {
    this.validateForm();
    var modifierValidation = this.validatModifier();
    if (this.notValidForm.every(value => value === false)) {
      if (modifierValidation.length === 0) {
        this.buildModel();
        this.rules.push(this.rule)
        this.clearModel()
      }
    }
  }
  editRow() {
    this.validateForm();
    if (this.notValidForm.every(value => value === false)) {
      let indexToUpdate = this.rules.findIndex(item => item.id === this.rule.id);
      this.buildModel();
      this.rules[indexToUpdate] = this.rule
      this.clearModel()
      this.lineMode = 'create'
    }
  }
  deleteRow(index: number) {
    this.rules.splice(index, 1);
  }
  opeRow(id: number) {
    this.lineMode = 'update'
    var editRule: Rule = this.rules.find(line => line.id === id);
    this.modifier = editRule.modifier.split(".");
    Object.assign(this.rule, editRule)
  }
  buildModel() {
    this.rule.modifier = this.modifier.join(".");
    this.rule.id = this.generateRandom(12, 3)
  }
  private validatModifier() {
    this.validModifiers = new Array();
    for (let i = 0; i < this.modifier.length; i++) {
      var mod: string = this.modifier[i];
      if (mod !== undefined && (mod.length > 0 && mod.length < 2))
        this.validModifiers[i] = false
    }
    return this.validModifiers;
  }
  clearModel() {
    this.rule = {}
    this.modifier = []
  }
  generateRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
