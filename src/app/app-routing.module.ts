import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantsComponent} from "./components/restaurants/restaurants.component";

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
