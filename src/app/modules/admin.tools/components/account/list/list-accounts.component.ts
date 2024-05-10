import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/model/admin/user/user';
import { UserService } from 'src/app/modules/secuirty/service/user.service';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.scss']
})
export class ListAccountsComponent implements OnInit {
  users: User[]
  createAccountVisible: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.find()
  }

  private find() {
    this.userService.findUsers().subscribe((users: any) => this.users = users)
  }
  editUser(uuid:string){

  }
  deleteUser(uuid:string){

  }
  toggleCreateAccountVisible() {
    this.createAccountVisible = !this.createAccountVisible
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
