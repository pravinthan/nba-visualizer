import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar() {
    this.snackBar.open(
      "Go to Schedule and click on a score to access box score and play-by-play data.",
      "OK",
      {
        duration: 5000
      }
    );
  }
}
