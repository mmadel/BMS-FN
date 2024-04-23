import { Component, OnInit } from '@angular/core';
import { ModifierRule } from '../model/modifier.rule';

@Component({
  selector: 'app-rule-creation',
  templateUrl: './rule-creation.component.html',
  styleUrls: ['./rule-creation.component.scss']
})
export class RuleCreationComponent implements OnInit {
  modifierRule: ModifierRule={
  };
  constructor() { }

  ngOnInit(): void {
  }

  create(){
      
  }
}
