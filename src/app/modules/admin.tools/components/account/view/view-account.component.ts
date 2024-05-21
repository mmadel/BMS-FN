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
  @Input() uuid: string;
  roleBinderValues: Observable<RoleBinder>;
  user: User = {};
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.uuid !== undefined)
      this.find();
  }
  private find() {
    this.roleBinderValues = this.userService.findUser(this.uuid).pipe(
      filter(result => result !== null),
      map((result: any) => RoleScopeBinder.bind(result.roleScope))
    )
  }
}
