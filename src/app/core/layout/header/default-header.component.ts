import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { KeycloakService } from 'keycloak-angular';
import { from, map, switchMap } from 'rxjs';
import { UserService } from 'src/app/modules/secuirty/service/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.css']
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar1";

  loggedIn: string

  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private classToggler: ClassToggleService
    , private ksAuthService: KeycloakService
    , private userService: UserService) {
    super();
  }
  ngOnInit(): void {
    from(this.userService.gteUUID()).pipe(
      map((uuid: any) => {
        return uuid;
      }),
      switchMap((uuid: string) => {
        return this.userService.findUser(uuid)
      })
    ).subscribe((result: any) => {
      var nameAry: string[] = result.name.split(',').map(word => this.capitalizeFirstLetter(word.trim()));
      this.loggedIn = nameAry[0] + '' + nameAry[1]
    })
  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase();
  }
  logout() {
    this.ksAuthService.logout()
  }
}
