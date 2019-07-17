import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Authorization } from './services/authorization';
import { RouteComponent } from './route/route.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EquipmentService } from './services/equipment-service';
import { RoutesService } from './services/routes-service';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { Subscriber } from './services/subscriber';
import { HttpProxy } from './services/http-proxy';
import { AuthGuard } from './services/auth-guard';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter,
      authScheme: 'JWT'
      // whitelistedDomains: yourWhitelistedDomains
  }
};

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavBarComponent,
    RouteComponent,
    LoginComponent,
    RouteDetailsComponent,
    UserTripsComponent,
    CreateRouteComponent,
    GalleryComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    JwtModule.forRoot(JWT_Module_Options)

  ],
  providers: [Authorization, EquipmentService, RoutesService, Subscriber, HttpProxy, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
