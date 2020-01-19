import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject, Component, OnInit } from "@angular/core";
import { PlayByPlayVideo } from "src/app/shared/play-by-play-video.model";

interface PlayByPlayVideoDialogData {
  videoURL: Promise<PlayByPlayVideo>;
  caption: string;
}

@Component({
  templateUrl: "play-by-play-video-dialog.component.html",
  styleUrls: ["play-by-play-video-dialog.component.css"]
})
export class PlayByPlayVideoDialogComponent implements OnInit {
  videoHasLoaded = false;
  videoURL: string;

  constructor(
    public dialogRef: MatDialogRef<PlayByPlayVideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public playByPlayVideoDialogData: PlayByPlayVideoDialogData
  ) {}

  ngOnInit() {
    this.playByPlayVideoDialogData.videoURL.then(
      (playByPlayVideo: PlayByPlayVideo) => {
        this.videoURL = playByPlayVideo.videoURL;
        this.videoHasLoaded = true;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
