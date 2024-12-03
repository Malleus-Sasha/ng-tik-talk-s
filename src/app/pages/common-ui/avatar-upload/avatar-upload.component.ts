import { Component, signal } from '@angular/core';
import { ImgUrlPipe } from '../../../helpers/img-url.pipe';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/images/ava-t.svg');

  fileBrowserHandler(event: Event) {
      console.log(':FILE:EVEnT:', event);
      // console.log(':FILE:EVEnT:F', event.target.files as FileList);
      const reader = new FileReader();
      const files = (event.target as HTMLInputElement)?.files as FileList;
      const file = files[0];

      if (!file || !file.type.match('image')) return;

      reader.onload = event => {
        if (event.target?.result?.toString) {
          this.preview.set(event.target?.result?.toString());
        }
      }
      reader.readAsDataURL(file);
  }
}
