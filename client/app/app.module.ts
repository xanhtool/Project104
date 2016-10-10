import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {TodosService} from './services/todos.service';

import { AppComponent } from './app.component';
import {TodosComponent} from './components/todos.component';

@NgModule({
  imports: [
    BrowserModule,FormsModule,HttpModule
   ],
  declarations: [
    AppComponent,TodosComponent
   ],
   providers:[TodosService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
