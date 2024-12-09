import { firstValueFrom } from 'rxjs';
import { ProfileService } from './../../data/http/profile.service';
import { AfterViewInit, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarUploadComponent } from "../common-ui/avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent implements OnInit, AfterViewInit {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUpload: any;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: 'Value', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
      effect(() => {
        console.log(':Profile:Effect:', this.form.value);
        
        console.log(':ME:', this.profileService.me());

        if (this.profileService.me()) {}
        // @ts-ignore
        this.form.patchValue({
          ...this.profileService.me(),
          // @ts-ignore
          stack: this.mergeStack(this.profileService.me()?.stack)
        });
        
      })
  }

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
    // this.avatarUpload.avatar
  }

  onSave() {
    console.log(':ProfileForm:Save:', this.form.invalid, this.form.value);
    // throw new Error('Method not implemented.');
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUpload.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUpload.avatar));
    }

    console.log('OnSave:', this.avatarUpload.avatar);

    // !!! Need idUser
    // @ts-ignore
    // firstValueFrom(this.profileService.patchProfile(this.form.getRawValue()));
    this.profileService.patchProfile({
      ...this.form.getRawValue(),
      stack: this.splitStack(this.form.value.stack)
    }).subscribe(res => {
      console.log(':PRF:RES', res);
    });
  }

  splitStack(stack: string | null | undefined | string[]): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | string[]) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
