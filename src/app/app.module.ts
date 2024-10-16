import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Authorization } from './_services/authorization';
import { RouteComponent } from './route/route.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EquipmentService } from './_services/equipment-service';
import { RoutesService } from './_services/routes-service';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { Subscriber } from './_services/subscriber';
import { HttpProxy } from './_services/http-proxy';
import { AuthGuard } from './_services/auth-guard';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { SubscribedTripsComponent } from './subscribed-trips/subscribed-trips.component';
import { InterceptorService } from './_services/interceptor-service';
import { SearchComponent } from './search/search.component';
import { InvitationComponent } from './invitation/invitation.component';
import { InvitationService } from './_services/invitation-service';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HistoryComponent } from './history/history.component';
import { DataFormatter } from './_helpers/data-formatter';
import { TokenGetter } from './_helpers/token-getter';
import { EditRouteComponent } from './edit-route/edit-route.component';
import { EnumNameGetter } from './_helpers/enum-name-getter';
import { SharedService } from './_services/shared-service';

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
    GalleryComponent,
    SubscribedTripsComponent,
    SearchComponent,
    InvitationComponent,
    MapComponent,
    HistoryComponent,
    EditRouteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    JwtModule.forRoot(JWT_Module_Options),
    AngularFileUploaderModule,
    AgmCoreModule.forRoot({
      apiKey: '',
    }),
    AgmDirectionModule,
    GooglePlaceModule
  ],

  exports:[
  GalleryComponent
  ],
  providers: [
    Authorization,
    EquipmentService,
    RoutesService,
    Subscriber,
    HttpProxy,
    AuthGuard,
    InvitationService,
    DataFormatter,
    TokenGetter,
    EnumNameGetter,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
