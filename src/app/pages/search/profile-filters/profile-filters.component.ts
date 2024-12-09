import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/http/profile.service';
import { debounceTime, map, startWith, Subscription, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  profileService = inject(ProfileService);
  fb = inject(FormBuilder);

  formSub!: Subscription;

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.formSub = this.form.valueChanges.pipe(
      // @ts-ignore
      // timer(0, 2000),
      // map(d => Number.isNaN(d) ? d : {firstName: ''}),
      startWith({firstName: ''}),
      debounceTime(400),
      switchMap((value) => this.profileService.filterProfiles({firstName_like: value?.firstName})),
      // *** takeUntilDestroyed
      takeUntilDestroyed()
      // EXAMPLE
      // takeUntil(this.destroy$)
    ).subscribe(value => {
      console.log(':SEARCH:RES:', value);
    })
  }

  ngOnDestroy(): void {
    // EXAMPLE
    this.formSub.unsubscribe();
  }

}
