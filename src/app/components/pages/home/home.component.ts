import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  constructor(private snackBar: MatSnackBar) {}

  openBoxScoreSnackBar() {
    this.snackBar.open(
      "Navigate to Schedule and click on a score to access box score.",
      "OK",
      {
        duration: 5000
      }
    );
  }

  openPlayByPlaySnackBar() {
    this.snackBar.open(
      "Navigate to Schedule and click on a finished game's score to access play-by-play data.",
      "OK",
      {
        duration: 5000
      }
    );
  }
}
