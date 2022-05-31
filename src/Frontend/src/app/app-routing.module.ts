import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterComponent} from './login-register/login-register.component'
import {ChatComponent} from './chat/chat.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { PorfileComponent } from './porfile/porfile.component';
import {SearchComponent} from './search/search.component';
import {StatsAsesorComponent} from './stats-asesor/stats-asesor.component'
const routes: Routes = [
  { path:'login', component: LoginRegisterComponent },
  { path:'chat', component: ChatComponent },
  { path:'about', component: AboutUSComponent },
  { path:'porfile', component: PorfileComponent },
  { path:'search', component: SearchComponent },
  { path:'stats-asesor', component: StatsAsesorComponent },

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
