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
  
  // get href() {
  //   return `/assets/icons/icons2.svg#${this.icon}`;
  // }

  // get href() {
  //   return `/assets/icons/${this.icon}.svg#${this.icon}`;
  // }

  get href() {
    return `/assets/icons/${this.icon}.svg`;
  }
}
