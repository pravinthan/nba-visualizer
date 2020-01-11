import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { HeaderComponent } from "./components/header/header.component";
import { ApiService } from "./shared/api.service";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { BoxScoreComponent } from "./components/pages/box-score/box-score.component";
import { PlayByPlayComponent } from "./components/pages/play-by-play/play-by-play.component";
import { ScheduleComponent } from "./components/pages/schedule/schedule.component";
import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavigationComponent,
    BoxScoreComponent,
    PlayByPlayComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    LayoutModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
