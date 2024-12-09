import { Profile } from './../../data/interfaces/profile.interface';
import { ProfileService } from './../../data/http/profile.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIconComponent } from 'common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from "../../common-ui/subscriber-card/subscriber-card.component";
import { ImgUrlPipe } from '../../helpers/img-url.pipe';
import { firstValueFrom } from 'rxjs';

const MenuItems = [
  { label: 'Home', icon: 'home', link: 'profile/me' },
  { label: 'Chats', icon: 'chats', link: 'chats' },
  { label: 'Search', icon: 'search', link: 'search' },
]

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgFor, RouterLink, RouterLinkActive, SubscriberCardComponent, AsyncPipe, ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  menuItems = MenuItems;

  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShotList();
  me = this.profileService.me;

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe());
  }
}
