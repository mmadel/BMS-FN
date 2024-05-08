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
}
