import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BoxScoreComponent } from "./components/pages/box-score/box-score.component";
import { ScheduleComponent } from "./components/pages/schedule/schedule.component";
import { PlayByPlayComponent } from "./components/pages/play-by-play/play-by-play.component";
import { HomeComponent } from "./components/pages/home/home.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "box-score", component: BoxScoreComponent },
  { path: "play-by-play", component: PlayByPlayComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
