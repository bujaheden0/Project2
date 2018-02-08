import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterService } from './register.service';
import { TestValidateComponent } from './test-validate/test-validate.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignUpComponent,
    LoadingPageComponent,
    SignInComponent,
    QuestionnaireComponent,
    ProfileComponent,
    TestValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ RegisterService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
