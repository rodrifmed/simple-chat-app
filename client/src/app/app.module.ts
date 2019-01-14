import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './chat/chat.component';
import { CustomMaterialModule } from './core/material.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { WalletService } from './services/wallet.service';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ChatComponent,
    CandidatesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [AuthService,
    ChatService,
    WalletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
