import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { RoleScopeFinderService } from 'src/app/modules/secuirty/service/role-scope-finder.service';

@Directive({
  selector: '[form-role-scope]'
})
export class FormScopeDirective {
  @Input() componentScopes: string[];
  constructor(private el: ElementRef, private renderer: NgForm, private roleScopeFinderService: RoleScopeFinderService) {

  }
  ngOnInit(): void {
    this.roleScopeFinderService.find().subscribe((result: RoleScope[]) => {
      var roleScope: RoleScope = this.match(result, this.componentScopes)
      if (roleScope !== undefined && roleScope.scope === 'view')
        setTimeout(() => {
          Object.keys(this.renderer.controls).forEach(controlName => {
            // Setting readonly property to true
            const inputElement = this.el.nativeElement.querySelector(`[ng-reflect-name='${controlName}']`);
            if (inputElement && inputElement.type === 'text')
              inputElement.readOnly = true;
            if (inputElement && inputElement.type === 'select-one')
              inputElement.disabled = true;
          });
        }, 1)
    })

  }

  private match(userRoles: RoleScope[], componentScope: string[]): RoleScope {
    return userRoles.filter(item => componentScope.includes(item.role))[0];
  }
}
