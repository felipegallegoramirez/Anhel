import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterComponent} from './login-register/login-register.component'
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
  { path:'login-register', component: LoginRegisterComponent },
  { path:'chat', component: ChatComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
