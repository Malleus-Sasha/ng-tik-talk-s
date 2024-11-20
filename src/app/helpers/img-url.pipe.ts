import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null, ...args: unknown[]): string {
    if (!value) return 'null';
    return `/assets/images/${value}`;
  }

}
