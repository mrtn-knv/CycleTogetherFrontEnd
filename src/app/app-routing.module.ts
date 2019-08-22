import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteComponent } from './route/route.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AuthGuard } from './services/auth-guard';
import { SubscribedTripsComponent } from './subscribed-trips/subscribed-trips.component';
import { SearchComponent } from './search/search.component';

 const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'all', component: RouteComponent, canActivate: [AuthGuard] },
    { path: 'subscribed', component: SubscribedTripsComponent, canActivate:[AuthGuard]},
    { path: 'new', component: CreateRouteComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: CreateRouteComponent, canActivate: [AuthGuard] },
    { path: 'mytrips', component: UserTripsComponent, canActivate: [AuthGuard] },
    { path: 'route/:id', component: RouteDetailsComponent, canActivate: [AuthGuard] },
    { path: 'image/all/:id', component: GalleryComponent, canActivate: [AuthGuard] },
    { path: 'search/:input', component: SearchComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [
      RouterModule.forRoot(
        routes
        )
      ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }