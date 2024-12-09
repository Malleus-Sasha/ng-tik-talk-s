import { Component, signal } from '@angular/core';
import { ImgUrlPipe } from '../../../helpers/img-url.pipe';
import { DndDirective } from '../directives/dnd.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/images/ava-t.svg');

  avatar: File | null = null;

  fileBrowserHandler(event: Event) { 
      console.log('::::FILE:EVEnT:', event);
      // console.log(':FILE:EVEnT:F', event.target.files as FileList);
      const files = (event.target as HTMLInputElement)?.files as FileList;
      const file = files[0];

      this.processFile(file);
  }

  onFileDropped($event: File) {
    console.log(':OnFileDrop:', $event);
    // throw new Error('Method not implemented.');
  }

  processFile(file: File | null) {
    const reader = new FileReader();

    if (!file || !file.type.match('image')) return; 

    reader.onload = event => {
      if (event.target?.result?.toString) {
        this.preview.set(event.target?.result?.toString());
      }
    }
    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
