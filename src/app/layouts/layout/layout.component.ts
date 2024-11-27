import { ProfileService } from './../../data/http/profile.service';
import { RouterOutlet } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  profileService = inject(ProfileService);

  ngOnInit(): void {
    // this.profileService.getMe().subscribe((res) => {
    //   console.log(res);
    // })
  }
}
