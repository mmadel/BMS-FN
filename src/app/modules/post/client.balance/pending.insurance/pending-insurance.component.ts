import { Component, Input, OnInit } from '@angular/core';
import { PostingFilterModel } from '../../bip/filter/posting.filter.model';

@Component({
  selector: 'pending-insurance',
  templateUrl: './pending-insurance.component.html',
  styleUrls: ['./pending-insurance.component.scss']
})
export class PendingInsuranceComponent implements OnInit {
  @Input() postingFilterModel: PostingFilterModel;
  constructor() { }

  ngOnInit(): void {
  }

}
