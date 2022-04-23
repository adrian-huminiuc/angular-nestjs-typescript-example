import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import User from '../User';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  url = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private session: SessionService,
  ) {
    const appUrl = environment.appUrl;
    const redirect_uri = `${appUrl}/oath-callback`;

    const params = new URLSearchParams({
      scope: 'psd2',
      response_type: 'code',
      client_id: environment.lhvApiClientId,
      redirect_uri,
      state: 'max.musterman'
    });

    this.url = `${environment.lhvUrl}/psd2/oauth/authorize?${params.toString()}`;

    const state = this.router.getCurrentNavigation()?.extras?.state;
    this.error = state?.['error'] ?? '';
  }

  async ngOnInit(): Promise<void> {
  }

  async useExistingUser(): Promise<void> {
    let user: User;
    try {
      user = await firstValueFrom(this.http.get<User>(`${environment.apiUrl}/user/test-user`));
    } catch (e) {
      this.error = 'Must authenticate first!!';
      return;
    }

    if(!user.lhvIsEnabled){
      this.error = 'Must authenticate first!!';
      return;
    }

    this.session.setUser(user);
    await this.router.navigate(['accounts']);
  }
}
