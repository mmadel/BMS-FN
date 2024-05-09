import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'billing-role',
  templateUrl: './billing-role.component.html',
  styleUrls: ['./billing-role.component.scss']
})
export class BillingRoleComponent implements OnInit {
  subPermissionVisability:boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubPermission(){
    this.subPermissionVisability = !this.subPermissionVisability;
  }

}
