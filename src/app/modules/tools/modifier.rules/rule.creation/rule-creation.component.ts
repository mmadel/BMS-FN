import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModifierRule } from '../model/modifier.rule';
import { ModifierRuleService } from '../service/modifier-rule.service';

@Component({
  selector: 'app-rule-creation',
  templateUrl: './rule-creation.component.html',
  styleUrls: ['./rule-creation.component.scss']
})
export class RuleCreationComponent implements OnInit {
  modifierRule: ModifierRule = {
  };
  constructor(private modifierRuleService: ModifierRuleService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  create() {
    this.modifierRuleService.create(this.modifierRule).subscribe(result => {
      this.toastr.success('Modifier Rule Created.')
    }, error => {
      this.toastr.error('Erro during creating modifier rule')
    })
  }
}
