import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
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
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AdvisoryDialogComponent } from "./components/pages/home/advisory-dialog/advisory-dialog.component";

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
    PlayByPlayVideoDialogComponent,
    AdvisoryDialogComponent,
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
    MatDialogModule,
    LayoutModule,
    PlotlyViaCDNModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
