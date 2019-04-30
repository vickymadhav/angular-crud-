import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { GetdataComponent } from './getdata/getdata.component';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
   SignupComponent,
    SigninComponent,
    GetdataComponent,   
    
  ],
  imports: [
    HttpModule,

    BrowserModule,
    FormsModule,
 
	RouterModule.forRoot  ([{path:'api/signup',component: SignupComponent},
                          {path:'api/signin',component: SigninComponent},
                          {path:'api/data',component: GetdataComponent},
                           {path:'api/app',component:AppComponent},
                           
                                                                ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
