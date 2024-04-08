import { Component, Input, OnInit } from '@angular/core';
import { PostingFilterModel } from '../../bip/filter/posting.filter.model';

@Component({
  selector: 'finalize-charge',
  templateUrl: './finalize-charge.component.html',
  styleUrls: ['./finalize-charge.component.scss']
})
export class FinalizeChargeComponent implements OnInit {
  @Input() postingFilterModel: PostingFilterModel;
  constructor() { }

  ngOnInit(): void {
  }

}
