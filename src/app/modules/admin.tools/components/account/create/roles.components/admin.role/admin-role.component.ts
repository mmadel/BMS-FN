import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss']
})
export class AdminRoleComponent implements OnInit {
  subPermissionVisability: boolean = false
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubPermission() {
    this.subPermissionVisability = !this.subPermissionVisability;
  }
}
