import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  rule: Rule = { insurance: null };
  modifierRule: ModifierRule = {}
  rules: Rule[] = new Array();
  @Input() editRule: Rule;
  @Input() defaultRule: boolean
  ruleName:string
  mode: string = 'create';
  constructor(private modifierRuleService: ModifierRuleService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    console.log(this.defaultRule)
    this.findMetaData();
  }
  insuranceCompanies: InsuranceCompanyHolder[]
  valid: boolean = true;
  modifier: string[] = []
  validModifiers: Boolean[];
  lineMode: string = 'create';


  create() {
        this.modifierRule={
          name : this.ruleName,
          rules : this.rules,
          active:true,
          defaultRule:this.defaultRule
        }
        this.changeVisibility.emit('close_create')
      console.log(JSON.stringify(this.modifierRule))
  }
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }



  private findMetaData() {
    this.modifierRuleService.findInsuranceCompanies().subscribe((result: any) => {
      this.insuranceCompanies = result;
    })
  }

  addRow() {
    var modifierValidation = this.validatModifier();
    if (modifierValidation.length === 0) {
      this.buildModel();
      this.rules.push(this.rule)
      this.clearModel()
    }
  }
  editRow() {
    let indexToUpdate = this.rules.findIndex(item => item.id === this.rule.id);
    this.buildModel();
    this.rules[indexToUpdate] =this.rule
    this.clearModel()
    this.lineMode = 'create'
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
    this.rule = { insurance: null }
    this.modifier = []
  }
  generateRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
