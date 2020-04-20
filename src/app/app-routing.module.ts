import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/pages/home/home.component";
import { ScheduleComponent } from "./components/pages/schedule/schedule.component";
import { GamesComponent } from "./components/pages/games/games.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomeComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "games/:dateET/:gameId", component: GamesComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
