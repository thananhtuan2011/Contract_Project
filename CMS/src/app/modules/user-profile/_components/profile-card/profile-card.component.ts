import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserModel } from '../../../auth';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user$: Observable<UserModel>;
  userdata: any;
  constructor(public userService: AuthService, public profile_serices: ProfileService, private cdr: ChangeDetectorRef,) {
    this.user$ = this.userService.currentUserSubject.asObservable();
    this.userdata = JSON.parse(localStorage.getItem("user"));
  }
  EventReload() {
    this.profile_serices.ReloadData$.subscribe(res => {
      if (res == true) {
        this.userdata = JSON.parse(localStorage.getItem("user"));
        this.cdr.detectChanges();
      }
    })
  }
  ngOnInit(): void {
    this.EventReload();
  }
}
