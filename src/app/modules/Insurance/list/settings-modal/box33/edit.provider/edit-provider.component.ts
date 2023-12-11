import { Component, Input, OnInit } from '@angular/core';
import { Organization } from 'src/app/modules/model/admin/organiztion';

@Component({
  selector: 'edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
  @Input() organization: Organization
  constructor() { }

  ngOnInit(): void {
  }
  edit() {

  }

}
