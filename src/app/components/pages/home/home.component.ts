import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdvisoryDialogComponent } from "./advisory-dialog/advisory-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.dialog.open(AdvisoryDialogComponent, { width: "min-content" });
  }

  openBoxScoreSnackBar() {
    this.snackBar.open(
      "Navigate to Schedule and click on a score to access box score.",
      "OK",
      {
        duration: 5000,
      }
    );
  }

  openPlayByPlaySnackBar() {
    this.snackBar.open(
      "Navigate to Schedule and click on a score to access play-by-play data.",
      "OK",
      {
        duration: 5000,
      }
    );
  }
}
