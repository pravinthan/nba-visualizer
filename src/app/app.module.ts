import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { PlotlyViaCDNModule } from "angular-plotly.js";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { ApiService } from "./shared/api.service";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { GamesComponent } from "./components/pages/games/games.component";
import { ScheduleComponent } from "./components/pages/schedule/schedule.component";
import { PlayByPlayVideoDialogComponent } from "./components/pages/games/play-by-play-video-dialog/play-by-play-video-dialog.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

PlotlyViaCDNModule.plotlyVersion = "latest";
PlotlyViaCDNModule.plotlyBundle = "basic";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavigationComponent,
    ScheduleComponent,
    GamesComponent,
    PlayByPlayVideoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    LayoutModule,
    PlotlyViaCDNModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [PlayByPlayVideoDialogComponent]
})
export class AppModule {}
