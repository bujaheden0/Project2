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
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth-guard.service';
import { TestValidateComponent } from './test-validate/test-validate.component';
import { Mbti16typedatailService } from './services/mbti16typedatail.service';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { HeaderComponent } from './header/header.component';
=======
import { MapComponent } from './map/map.component';
>>>>>>> 93da64a4231f3f5e6674621de0eba562d9a65340

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignUpComponent,
    LoadingPageComponent,
    SignInComponent,
    QuestionnaireComponent,
    ProfileComponent,
    TestValidateComponent,
<<<<<<< HEAD
    HeaderComponent
=======
    MapComponent
>>>>>>> 93da64a4231f3f5e6674621de0eba562d9a65340
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [ AuthenticationService,AuthGuard, Mbti16typedatailService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
