import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent }  from './landing-page/landing-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ProfileComponent } from './profile/profile.component';
import {TestValidateComponent} from './test-validate/test-validate.component';
import { AuthenticationService } from './services/authentication.service';
import { HeaderComponent } from './header/header.component';
import { PassportComponent } from './passport/passport.component';
import { MapComponent } from './map/map.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DormPageComponent } from './dorm-page/dorm-page.component';
import { InterestedPeopleComponent } from './interested-people/interested-people.component';
import { UserMatchedComponent } from './user-matched/user-matched.component';
import { DormPageConsComponent } from './dorm-page-cons/dorm-page-cons.component';
const routes: Routes = [
  { path: '',                     component : LandingPageComponent},
  { path: 'signup',               component : SignUpComponent},
  { path: 'signin',               component : SignInComponent},
  { path: 'questionnaire',        component : QuestionnaireComponent},
  { path: 'profile',              component : ProfileComponent },
  { path: 'test',                 component : TestValidateComponent},
  { path: 'head',                 component : HeaderComponent},
  { path: 'passport/:id/:userId', component : PassportComponent },
  { path: 'passport',             component : PassportComponent },
  { path: 'map',                  component : MapComponent},
  { path: 'verify',               component : VerifyOtpComponent},
  { path: 'main',                 component : MainPageComponent},
  { path: 'dorm',                 component : DormPageComponent},
  { path: 'user/:userId/:messageId',         component : InterestedPeopleComponent},
  { path: 'userMatched/:userId/:messageId',    component : UserMatchedComponent},
  { path: 'dormCons',             component : DormPageConsComponent}


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { 


}
