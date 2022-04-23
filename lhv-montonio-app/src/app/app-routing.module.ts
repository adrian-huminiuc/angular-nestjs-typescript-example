import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountListComponent} from "./account-list/account-list.component";
import {OathCallbackComponent} from "./oath/oath-callback.component";
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'accounts', component: AccountListComponent},
  {path: 'oath-callback', component: OathCallbackComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
