import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatLine } from "@angular/material/core";
import { AngularFireModule } from "@angular/fire/compat"
//declared modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialCompsModule } from './material.module';
import { SharedModule } from './shared/shared.module';
//declared components
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PreviousTrainingComponent } from './previous-training/previous-training.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ActiveTrainingComponent } from './active-training/active-training.component';
import { StartModalComponent } from './active-training/start-modal/start-modal.component';
//firebase
import { firebaseConfig } from '../environment';
//date adapter
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './material.persian-date.adapter';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TrainingComponent,
    NewTrainingComponent,
    PreviousTrainingComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ActiveTrainingComponent,
    StartModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialCompsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatLine,
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig)
],
  providers: [
    provideAnimationsAsync(),
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
