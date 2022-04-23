import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import AccountDtoInterface from './dto/account-dto.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accounts: AccountDtoInterface[] = [];

  constructor(
    private readonly session: SessionService,
    private http: HttpClient,
    private router: Router
  ) {}

  async ngOnInit(): Promise<any> {
    const id = this.session.getUser()?.id;

    if(!id) {
      return await this.router.navigate(['login'], {state: {error: 'Invalid user, must login again'}})
    }

    try {
      this.accounts = (await firstValueFrom(
        this.http.get<{ accounts: AccountDtoInterface[] }>(`${environment.apiUrl}/accounts/${id}/list`)
      ))?.accounts;
    } catch (exception) {
      return await this.router.navigate(
        ['login'],
        {state: {error: 'Could not fetch account list, login again!'}}
      );
    }
  }

  async logout() {
    this.session.clear();
    await this.router.navigate(['login'])
  }
}
