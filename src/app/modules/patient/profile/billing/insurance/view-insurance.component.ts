import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrls: ['./view-insurance.component.scss']
})
export class ViewInsuranceComponent implements OnInit {
  addInsuranceVisibility: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleAddInsuranceVisibility() {
    this.addInsuranceVisibility = !this.addInsuranceVisibility;
  }
}
