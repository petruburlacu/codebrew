import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { FavouritesRoutingModule } from './favourites-routing.module';
import { HeaderModule } from 'src/app/shared/ui/header/header.module';



@NgModule({
  declarations: [
    FavouritesComponent
  ],
  imports: [
    FavouritesRoutingModule,
    CommonModule,
    HeaderModule
  ]
})
export class FavouritesModule { }
