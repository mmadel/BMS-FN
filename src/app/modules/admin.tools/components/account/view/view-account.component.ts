import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { User } from 'src/app/modules/model/admin/user/user';
import { UserService } from 'src/app/modules/secuirty/service/user.service';
import { RoleBinder } from '../../model/account/role/role.binder';
import { RoleScopeBinder } from '../create/role.scope.binder';

@Component({
  selector: 'view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {
  notValidForm: boolean = false
  notValidPermissions: boolean = false
  @Input() user: User;
  roleBinderValues: Observable<RoleBinder>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user.firstName = this.user.name.split(',')[1]
    this.user.lastName = this.user.name.split(',')[0]
    if (this.user !== undefined)
      this.find();
  }
  private find() {
    this.roleBinderValues = this.userService.findUser(this.user.uuid).pipe(
      filter(result => result !== null),
      map((result: any) => RoleScopeBinder.bind(result.roleScope))
    )
  }
}
