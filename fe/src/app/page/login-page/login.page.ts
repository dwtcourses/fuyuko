import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth-service/auth.service';
import {map, tap} from 'rxjs/operators';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {SettingsService} from '../../service/settings-service/settings.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {

  formGroup: FormGroup;
  formControlUsername: FormControl;
  formControlPassword: FormControl;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private settingsService: SettingsService,
              private notificationService: NotificationsService,
              private router: Router) {
    this.formControlUsername = formBuilder.control('', [Validators.required]);
    this.formControlPassword = formBuilder.control('', [Validators.required]);
    this.formGroup = this.formBuilder.group({
      username: this.formControlUsername,
      password: this.formControlPassword
    });
  }

  onSubmmit() {
    this.authService
      .login(this.formControlUsername.value, this.formControlPassword.value)
      .pipe(
        map((u: User|null) => {
          if (u) {
            this.router.navigate(['/dashboard-layout', 'dashboard']);
          } else {
            this.notificationService.error('Error', 'Unexpected error logging in');
          }
          return u;
        }),
        map((u: User|null) => {
            if (u) { }
        })
      ).subscribe();
  }
}