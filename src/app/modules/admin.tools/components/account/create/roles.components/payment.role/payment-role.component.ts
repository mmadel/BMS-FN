import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'payment-role',
  templateUrl: './payment-role.component.html',
  styleUrls: ['./payment-role.component.scss']
})
export class PaymentRoleComponent implements OnInit {
  subPermissionVisability:boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubPermission(){
    this.subPermissionVisability = !this.subPermissionVisability;
  }
}
