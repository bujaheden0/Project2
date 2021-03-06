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
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { PassportComponent } from './passport/passport.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { VerifyOtpService } from './services/verify-otp.service';
import { MainPageComponent } from './main-page/main-page.component';
import { MatchPeopleService } from './services/match-people.service';
import { DormPageComponent } from './dorm-page/dorm-page.component';
import { MatchingService } from './services/matching.service';
import { InterestedPeopleComponent } from './interested-people/interested-people.component';
import { UserMatchedComponent } from './user-matched/user-matched.component';
import { DormPageConsComponent } from './dorm-page-cons/dorm-page-cons.component';
import { RoommateComponent } from './roommate/roommate.component';

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
    HeaderComponent,
    MapComponent,
    PassportComponent,
    VerifyOtpComponent,
    MainPageComponent,
    DormPageComponent,
    InterestedPeopleComponent,
    UserMatchedComponent,
    DormPageConsComponent,
    RoommateComponent
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
  providers: [ AuthenticationService,
               AuthGuard, 
               Mbti16typedatailService,
               VerifyOtpService,
               MatchPeopleService,
               MatchingService
],  
  bootstrap: [AppComponent]
})
export class AppModule { }
