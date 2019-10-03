import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseConfig = { 
  apiKey: "AIzaSyC5gyB8Kc3LBWzTYYkMOUa_Ekt4lekZ3cc",
  authDomain: "service-worker-a46a1.firebaseapp.com",
  databaseURL: "https://service-worker-a46a1.firebaseio.com",
  projectId: "service-worker-a46a1",
  storageBucket: "service-worker-a46a1.appspot.com",
  messagingSenderId: "1065483115395",
  appId: "1:1065483115395:web:2956af29a237a3ec36b4b6",
  measurementId: "G-SFQG7BKGS0"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
