import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject, Component, OnInit } from "@angular/core";
import { PlayByPlayVideo } from "src/app/shared/play-by-play-video.model";

interface PlayByPlayVideoDialogData {
  video: Promise<PlayByPlayVideo>;
  caption: string;
}

@Component({
  templateUrl: "play-by-play-video-dialog.component.html",
  styleUrls: ["play-by-play-video-dialog.component.css"],
})
export class PlayByPlayVideoDialogComponent implements OnInit {
  videoFailedToLoad = false;
  videoHasLoaded = false;
  videoURL: string;
  fallbackURL: string;

  constructor(
    public dialogRef: MatDialogRef<PlayByPlayVideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public playByPlayVideoDialogData: PlayByPlayVideoDialogData
  ) {}

  ngOnInit() {
    this.playByPlayVideoDialogData.video.then(
      (playByPlayVideo: PlayByPlayVideo) => {
        this.videoURL = playByPlayVideo.videoURL;
        this.fallbackURL = playByPlayVideo.fallbackURL;
        this.videoHasLoaded = playByPlayVideo.videoURL != null;
        this.videoFailedToLoad = playByPlayVideo.fallbackURL != null;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
