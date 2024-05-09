import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'provider-role',
  templateUrl: './provider-role.component.html',
  styleUrls: ['./provider-role.component.scss']
})
export class ProviderRoleComponent implements OnInit {
  subPermissionVisability: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubPermission() {
    this.subPermissionVisability = !this.subPermissionVisability;
  }
}
