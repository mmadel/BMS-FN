import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  constructor(private modifierRuleService: ModifierRuleService,
    private toastr: ToastrService) { }
  insuranceCompanies: InsuranceCompanyHolder[]
  ngOnInit(): void {
    this.findMetaData();
  }
  create() {
    this.modifierRuleService.create(this.modifierRule).subscribe(result => {
      this.toastr.success('Modifier Rule Created.')
      this.changeVisibility.emit('close_create')
    }, error => {
      this.toastr.error('Erro during creating modifier rule')
    })
  }
  _compareFn(a: any, b: any) {
    return a?.id === b?.id;
  }
  private findMetaData() {
    this.modifierRuleService.findInsuranceCompanies().subscribe((result: any) => {
      this.insuranceCompanies = result;
    })
  }
}
