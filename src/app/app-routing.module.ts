import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteComponent } from './route/route.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { GalleryComponent } from './gallery/gallery.component';

 const routes: Routes = [
    { path: 'authorization/login', component: LoginComponent },
    { path: 'authorization/register', component: RegisterComponent },
    { path: 'route/all/mytrips', component: UserTripsComponent },
    { path: 'route/all', component: RouteComponent },
    { path: 'route/new', component: CreateRouteComponent },
    {path: 'image/all/:id', component: GalleryComponent},
    { path: 'route/:id', component: RouteDetailsComponent },
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