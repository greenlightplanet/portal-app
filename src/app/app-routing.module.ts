import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginTablesComponent } from './login-tables/login-tables.component';
import { TablesComponent } from './tables/tables.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginTablesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tables', component: TablesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
