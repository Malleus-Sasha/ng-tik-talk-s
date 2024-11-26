import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: ''
})
export class SvgIconComponent {
  @Input() icon = '';

  get href() {
    console.log('[svg]', this.icon);
    return `/assets/icons/${this.icon}.svg#${this.icon}`;
  }
}
