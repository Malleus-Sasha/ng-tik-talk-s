import { ProfileService } from './../../data/http/profile.service';
import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/img-url.pipe';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, RouterLink, AsyncPipe, ImgUrlPipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  subscribers$ = this.profileService.getSubscribersShotList(5);
  me$ = toObservable(this.profileService.me);

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  )
}
