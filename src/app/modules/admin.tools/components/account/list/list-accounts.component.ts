import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  selectedUser: User
  constructor(private userService: UserService, private toastrService: ToastrService) { }
  componentRole: string[] = [Role.ADMIN_TOOL_ROLE, Role.ACCOUNT_MANAGEMENT_ADMIN_TOOL_ROLE];
  ngOnInit(): void {
    this.find()
  }

  private find() {
    this.userService.findUsers().subscribe((users: any) => this.users = users)
  }
  editUser(user: User) {
    this.updateAccountVisible = true;
    this.selectedUser = user;
    this.selecteduuid = user.uuid;
  }
  deleteUser(uuid: string) {
    this.userService.deleteUser(uuid).subscribe(result => {
      this.toastrService.success('user deleted')
      this.find();
    }, error => {
      this.toastrService.error('Error during deleting user')
    })
  }
  toggleCreateAccountVisible() {
    this.createAccountVisible = !this.createAccountVisible
  }
  toggleUpdateAccountVisible() {
    this.updateAccountVisible = !this.updateAccountVisible
  }
  changeVisibility(event: any) {
    if (event === 'create')
      this.createAccountVisible = false;
    if (event === 'update')
      this.updateAccountVisible = false;
    this.find();

  }

  createAccount() {
    this.createAccountVisible = true;
  }
}
