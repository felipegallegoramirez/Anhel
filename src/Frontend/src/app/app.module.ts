import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ChatComponent } from './chat/chat.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { PorfileComponent } from './porfile/porfile.component';
import { SearchComponent } from './search/search.component';
import { StatsAsesorComponent } from './stats-asesor/stats-asesor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LlamadaComponent } from './llamada/llamada.component';
import { CreateComponent } from './create/create.component';
import { SpublicationComponent } from './spublication/spublication.component';
import { PublicationComponent } from './publication/publication.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    ChatComponent,
    AboutUSComponent,
    PorfileComponent,
    SearchComponent,
    StatsAsesorComponent,
    LlamadaComponent,
    CreateComponent,
    SpublicationComponent,
    PublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
