import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { initializer } from './keycloak-initializer';
import { KeycloakService } from 'keycloak-angular';
import { KcAuthGuard } from './guard/kc-auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService,
    KcAuthGuard
  ]
})
export class SecurityModule { }
