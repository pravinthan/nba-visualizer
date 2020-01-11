import { Component, OnInit } from "@angular/core";
import { BoxScore } from "src/app/shared/box-score.model";
import { ApiService } from "src/app/shared/api.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-box-score",
  templateUrl: "./box-score.component.html",
  styleUrls: ["./box-score.component.css"]
})
export class BoxScoreComponent implements OnInit {
  boxScore: BoxScore;
  dateET: Date;
  private queryParams: Params;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {
    // Store parameter values on URL changes
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
    });
  }

  ngOnInit() {
    const dateETString = this.queryParams.date;
    const dateETYear = parseInt(dateETString.substring(0, 4));
    const dateETMonth = parseInt(dateETString.substring(4, 6));
    const dateETDate = parseInt(dateETString.substring(6, 8));
    this.dateET = new Date(dateETYear, dateETMonth - 1, dateETDate);
    this.dateET.setHours(0, 0, 0, 0);

    this.getScore(this.queryParams.gameId, this.dateET).then(boxScore => {
      console.log(boxScore);
      this.boxScore = boxScore;
    });
  }

  getScore(gameId: string, date: Date): Promise<BoxScore> {
    return this.api.getBoxScore(gameId, date).toPromise();
  }
}
