import { Profile } from './../../data/interfaces/profile.interface';
import { ProfileService } from './../../data/http/profile.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from 'common-ui/svg-icon/svg-icon.component';
import { SubscriberCardComponent } from "../../common-ui/subscriber-card/subscriber-card.component";
import { ImgUrlPipe } from '../../helpers/img-url.pipe';

const MenuItems = [
  { label: 'Home', icon: 'home', link: '' },
  { label: 'Chats', icon: 'chats', link: 'chats' },
  { label: 'Search', icon: 'search', link: 'search' },
]

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgFor, RouterLink, SubscriberCardComponent, AsyncPipe, ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = MenuItems;

  profileService = inject(ProfileService);
  me$ = this.profileService.getMe();

  subscribers$ = this.profileService.getSubscribersShotList();
}
