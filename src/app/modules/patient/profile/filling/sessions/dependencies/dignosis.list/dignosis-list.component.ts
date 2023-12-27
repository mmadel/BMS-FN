import { Component, OnInit } from '@angular/core';
import { CaseDiagnosis } from 'src/app/modules/model/clinical/case.diagnosis';

@Component({
  selector: 'dignosis-list',
  templateUrl: './dignosis-list.component.html',
  styleUrls: ['./dignosis-list.component.scss']
})
export class DignosisListComponent implements OnInit {
  diagnosises: CaseDiagnosis[];
  constructor() { }

  ngOnInit(): void {
    this.diagnosises = new Array();
  }
  pushDaignosis(daignosis: CaseDiagnosis) {
    this.diagnosises.push(daignosis);
  }
}
