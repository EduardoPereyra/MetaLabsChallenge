import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
