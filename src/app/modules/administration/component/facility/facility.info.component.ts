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
  isEditFacility: boolean = false;
  editFacilityIndex: number = undefined;
  notValidForm: boolean = false;
  facility: Facility = {}
  @ViewChild('facilityInfoFrom') facilityInfoFrom: NgForm;
  facilities: Facility[] = []
  constructor() { }

  ngOnInit(): void {
  }
  add() {
    if (this.facilityInfoFrom.valid) {
      if (this.isEditFacility)
        this.facilities.splice(this.editFacilityIndex, 1);
      const clone: Facility = { ...this.facility };
      this.facilities.push(clone)
      this.facilityInfoFrom.reset();
      this.notValidForm = false;
      this.isEditFacility = false;
    } else {
      this.notValidForm = true;
    }
  }
  edit(i: number) {
    this.facility = { ...this.facilities[i] };
    this.isEditFacility = true;
    this.editFacilityIndex = i;
  }
  remove(index: number) {
    this.facilities.splice(index, 1);
  }
}
