import { Component, OnInit } from '@angular/core';
import { PlaceOfCode } from 'src/app/modules/model/enum/place.code';

@Component({
  selector: 'app-billing-code',
  templateUrl: './billing-code.component.html',
  styleUrls: ['./billing-code.component.scss']
})
export class BillingCodeComponent implements OnInit {
  placeOfCodeKeys = Object.keys;
  placeOfCodes = PlaceOfCode;
  constructor() { }

  ngOnInit(): void {
  }

}
