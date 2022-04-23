import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionService } from '../session.service';
import User from '../User';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-oath',
  templateUrl: './oath-callback.component.html',
})
export class OathCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private session: SessionService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<any> {
    const {code, state} = await firstValueFrom(this.route.queryParams);

    let response: { id: string, authorized: boolean } | null = null;

    try {
      response = await firstValueFrom(
        this.http.post<{ id: string, authorized: boolean }>(`${environment.apiUrl}/oath/authorize`, {code, state})
      );

    } catch (exception) {}

    if (!response || !response?.authorized) {
      return await this.router.navigate(['login'], { state: { error: 'Could not authenticate check logs' }});
    }

    this.session.setUser(new User(response?.id));
    await this.router.navigate(['accounts']);
  }
}
