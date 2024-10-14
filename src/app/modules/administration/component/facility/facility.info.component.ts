import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Facility {
  title?: string,
  npi?: string,
  address?: string
  zipCode?: string,
  city?: string,
  state?: string
}
@Component({
  selector: 'facility-info',
  templateUrl: './facility.info.component.html',
  styleUrls: ['./facility.info.component.scss']
})
export class FacilityInfoComponent implements OnInit {
  notValidForm: boolean = false;
  facility: Facility = {}
  @ViewChild('facilityInfoFrom') facilityInfoFrom: NgForm;
  facilities: Facility[] = []
  constructor() { }

  ngOnInit(): void {
  }
  add() {
    console.log(this.facilityInfoFrom.valid)
    if (this.facilityInfoFrom.valid) {
      const clone: Facility = { ...this.facility};
      this.facilities.push(clone)
      this.facilityInfoFrom.reset();
      this.notValidForm = false;
    } else {
      this.notValidForm = true;
    }
  }
  edit() {

  }
  remove(index:number) {
    this.facilities.splice(index, 1);
  }
}
