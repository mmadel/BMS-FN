import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule-creation',
  templateUrl: './rule-creation.component.html',
  styleUrls: ['./rule-creation.component.scss']
})
export class RuleCreationComponent implements OnInit {
  modiferValue:string=""
  constructor() { }

  ngOnInit(): void {
  }

}
