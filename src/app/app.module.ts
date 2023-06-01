import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageaccueilComponent } from './pageaccueil/pageaccueil.component';
import { AffichageDesCentresComponent } from './affichage-des-centres/affichage-des-centres.component';
import { InformationsSurLutilisateurComponent } from './informations-sur-lutilisateur/informations-sur-lutilisateur.component';
import { ConfirmationDeRendezVousComponent } from './confirmation-de-rendez-vous/confirmation-de-rendez-vous.component';
import { PageClientsComponent } from './page-clients/page-clients.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MonCentreComponent } from './mon-centre/mon-centre.component';
import { PlanningComponent } from './planning/planning.component';
import { ConfigComponent } from './config/config.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { BasicAuthHttpInterceptorService } from './basic-auth-http-interceptor.service';
import { FiltrePipe } from './filtre.pipe';
import { MatDialogModule} from '@angular/material/dialog';
import { DetailCentreComponent } from './detail-centre/detail-centre.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { PersonnelDunCentreComponent } from './personnel-dun-centre/personnel-dun-centre.component';
import { MatTableModule } from '@angular/material/table';
import { InformationsSurAdminComponent } from './informations-sur-admin/informations-sur-admin.component';
import { InformationsSurSuperAdminComponent } from './informations-sur-super-admin/informations-sur-super-admin.component';
import { FormulaireReservationComponent } from './formulaire-reservation/formulaire-reservation.component';
import { SuperAdminGuard } from './auth-guard/super-admin-guard';
import { ConfigGuard } from './auth-guard/config-guard';
import { AccessDeniedComponent } from './login/access-denied/access-denied.component';
import { PlanningMonCentreGuard } from './auth-guard/planning-moncentre-guard';

@NgModule({
  declarations: [
    AppComponent,
    PageaccueilComponent,
    AffichageDesCentresComponent,
    InformationsSurLutilisateurComponent,
    ConfirmationDeRendezVousComponent,
    PageClientsComponent,
    MonCentreComponent,
    PlanningComponent,
    ConfigComponent,
    LoginComponent,
    AuthentificationComponent,
    AuthGuardComponent,
    FiltrePipe,
    DetailCentreComponent,
    PersonnelDunCentreComponent,
    InformationsSurAdminComponent,
    InformationsSurSuperAdminComponent,
    FormulaireReservationComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    RouterModule.forRoot([
      { path: 'pageaccueil',component: PageaccueilComponent},
      { path: '', redirectTo: 'pageaccueil', pathMatch: 'full'},
      { path: 'affichage-des-centres', component: AffichageDesCentresComponent,canActivate: [SuperAdminGuard]},
      { path: 'mon-centre', component: MonCentreComponent, canActivate: [PlanningMonCentreGuard]},
      { path: 'config', component: ConfigComponent, canActivate: [ConfigGuard]},
      { path: 'planning', component: PlanningComponent, canActivate :[PlanningMonCentreGuard]},
      { path: 'login', component: LoginComponent},
      { path: '**', redirectTo: 'pageaccueil' },
      {path: 'access-denied', component: AccessDeniedComponent}
    ]),
    HttpClientModule
  ],
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true 
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DetailCentreComponent]
})
export class AppModule { }
