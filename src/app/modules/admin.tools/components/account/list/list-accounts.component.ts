import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/model/admin/user/user';
import { Role } from 'src/app/modules/secuirty/model/roles';
import { UserService } from 'src/app/modules/secuirty/service/user.service';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.scss']
})
export class ListAccountsComponent implements OnInit {
  users: User[]
  createAccountVisible: boolean = false;
  updateAccountVisible: boolean = false;
  selecteduuid: string;
  constructor(private userService: UserService) { }
  componentScopes: string[] = [Role.ADMIN_TOOL_ROLE, Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE];
  ngOnInit(): void {
    this.find()
  }

  private find() {
    this.userService.findUsers().subscribe((users: any) => this.users = users)
  }
  editUser(uuid: string) {
    this.updateAccountVisible = true;
    this.selecteduuid = uuid;
  }
  deleteUser(uuid: string) {

  }
  toggleCreateAccountVisible() {
    this.createAccountVisible = !this.createAccountVisible
  }
  toggleUpdateAccountVisible() {
    this.updateAccountVisible = !this.updateAccountVisible
  }
  changeVisibility(event: any) {
    if (event === 'close')
      this.createAccountVisible = false;
    this.find();

  }

  createAccount() {
    this.createAccountVisible = true;
  }
}
