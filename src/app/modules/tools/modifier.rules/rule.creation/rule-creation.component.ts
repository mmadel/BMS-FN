import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InsuranceCompanyHolder } from 'src/app/modules/model/admin/insurance.company.holder';
import { ModifierRule } from '../model/modifier.rule';
import { ModifierRuleService } from '../service/modifier-rule.service';

@Component({
  selector: 'app-rule-creation',
  templateUrl: './rule-creation.component.html',
  styleUrls: ['./rule-creation.component.scss']
})
export class RuleCreationComponent implements OnInit {
  @Output() changeVisibility = new EventEmitter<string>()
  compareFn = this._compareFn.bind(this);
  modifierRule: ModifierRule = {
    insurance: null
  };
  @Input() editModifierRule: ModifierRule;
  mode: string = 'create';
  constructor(private modifierRuleService: ModifierRuleService,
    private toastr: ToastrService) { }
  insuranceCompanies: InsuranceCompanyHolder[]
  valid: boolean = true;
  modifier: string[] = []
  validModifiers: Boolean[];
  ngOnInit(): void {
    this.findMetaData();
    if (this.editModifierRule === undefined)
      this.mode = 'create'
    else {
      this.mode = 'update'
      this.fillModel();
    }
  }
  private fillModel() {
    this.modifier = this.editModifierRule.modifier.split('.')
    this.modifierRule = this.editModifierRule;
  }
  create() {
    this.validate();
    var modifierValidation = this.validatModifier();
    if (this.valid && modifierValidation.length === 0) {
      this.modifierRule.modifier= this.modifier.join(".");
      this.modifierRuleService.create(this.modifierRule).subscribe(result => {

        if (this.mode === 'create') {
          this.toastr.success('Modifier Rule Created.')
          this.changeVisibility.emit('close_create')
        }
        if (this.mode === 'update') {
          this.changeVisibility.emit('close_update')
          this.toastr.success('Modifier Rule Updated.')
        }
      }, error => {
        this.toastr.error('Erro during creating modifier rule')
      })
    }
  }
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }
  private findMetaData() {
    this.modifierRuleService.findInsuranceCompanies().subscribe((result: any) => {
      this.insuranceCompanies = result;
    })
  }
  validate() {
    if (this.modifierRule.insurance !== null)
      this.valid = true
    else
      this.valid = false;
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

}
