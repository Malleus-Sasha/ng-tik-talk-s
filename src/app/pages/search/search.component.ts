import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/http/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCardComponent } from 'common-ui/profile-card/profile-card.component';
// import { ProfileCardComponent } from 'common-ui/profile-card/profile-card.component';
// import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  profileService = inject(ProfileService);

  profiles: Profile[] = [];

  constructor() {
    this.profileService.getAccounts().subscribe(data => {
      this.profiles = data;
      console.log(data);
    })
  }
}
