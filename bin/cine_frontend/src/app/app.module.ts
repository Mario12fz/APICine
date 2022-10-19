import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SalasComponent } from './salas/salas.component'
import { FormsModule } from '@angular/forms';
import { FormComponent } from './categorias/form.component';
import { FormSalaComponent } from './salas/form-sala.component';
import { PeliculasComponent } from './peliculas/peliculas.component';

//imports para table CRUD

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import {DataViewModule} from 'primeng/dataview';
import {RippleModule} from 'primeng/ripple';
import {PanelModule} from 'primeng/panel';
import { PeliculaService } from './peliculas/pelicula.service';


import {CarouselModule} from 'primeng/carousel';


//import para formateo de fechas desde el frontend
import { registerLocaleData } from '@angular/common';
import  localeES from '@angular/common/locales/es-SV';
import { ReservasComponent } from './reservas/reservas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ReservaMovieComponent } from './reserva-movie/reserva-movie.component';
import { LoginComponent } from './usuarios/login.component';

registerLocaleData(localeES,'es-SV');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CategoriasComponent,
    SalasComponent,
    FormComponent,
    FormSalaComponent,
    PeliculasComponent,
    ReservasComponent,
    ClientesComponent,
    ReservaMovieComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CheckboxModule,
    DataViewModule,
    RippleModule,
    PanelModule,
    CarouselModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService,ConfirmationService, PeliculaService, {provide:LOCALE_ID, useValue: 'es-SV' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
