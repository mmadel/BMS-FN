import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoleScope } from 'src/app/modules/secuirty/model/role.scope';
import { RoleScopeFinderService } from 'src/app/modules/secuirty/service/role-scope-finder.service';
import { MatchRole } from '../match.role';

@Directive({
  selector: '[readonly-form]'
})
export class ReadonlyFormDirective implements OnInit {
  @Input() componentRole?: string[]
  constructor(private el: ElementRef, private form: NgForm, private roleScopeFinderService: RoleScopeFinderService) { }
  ngOnInit(): void {
    this.roleScopeFinderService.find().subscribe((result: RoleScope[]) => {
      var roleScope: RoleScope = MatchRole.match(result,this.componentRole)
      if (roleScope !== undefined && roleScope.scope === 'view')
        setTimeout(() => {
          Object.keys(this.form.controls).forEach(controlName => {
            // Setting readonly property to true
            const inputElement = this.el.nativeElement.querySelector(`[ng-reflect-name='${controlName}']`);
            if (inputElement && inputElement.type === 'text')
              inputElement.readOnly = true;
            if (inputElement && inputElement.type === 'select-one')
              inputElement.disabled = true;
            inputElement.style = 'background-color:white'
          });
        }, 1)
    })
  }

}
