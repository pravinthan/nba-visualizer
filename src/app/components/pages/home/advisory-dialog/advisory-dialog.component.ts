import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-advisory-dialog",
  templateUrl: "./advisory-dialog.component.html",
  styleUrls: ["./advisory-dialog.component.css"],
})
export class AdvisoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AdvisoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: any
  ) {}
}
