import { Component, OnInit } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Game } from "src/app/shared/game.model";
import { ApiService } from "src/app/shared/api.service";
import { MatDatepickerInputEvent } from "@angular/material";
import { BoxScore } from "src/app/shared/box-score.model";

interface GamesForDate {
  dateET: string;
  games: Game[];
  numberOfFinishedGames: number;
  numberOfActiveGames: number;
  numberOfUpcomingGames: number;
}

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"],
})
export class ScheduleComponent implements OnInit {
  Number = Number;
  hasLoaded: boolean;
  gamesForDates: GamesForDate[];
  columns: string[] = ["awayTeam", "homeTeam", "scoreOrTime"];

  constructor(
    private api: ApiService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.initializeSchedules(new Date(), 4);
  }

  get isMobile() {
    return this.breakpointObserver.isMatched("(max-width: 768px)");
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.initializeSchedules(event.value, 4);
  }

  async initializeSchedules(
    startDate: Date,
    numberOfSchedulesToInitialize: number
  ) {
    this.gamesForDates = [];
    for (let i = 0; i < numberOfSchedulesToInitialize; i++) {
      await this.initializeSchedule(startDate, i);
    }
  }

  async initializeSchedule(startDate: Date, dayIncrement: number) {
    var date: Date = new Date(startDate);
    date.setDate(date.getDate() + dayIncrement);

    return await Promise.resolve(
      this.api
        .getSchedule(date)
        .toPromise()
        .then((games) => {
          if (games.length != 0) {
            const dateETYear = parseInt(games[0].dateET.substring(0, 4));
            const dateETMonth = parseInt(games[0].dateET.substring(4, 6));
            const dateETDate = parseInt(games[0].dateET.substring(6, 8));
            var dateET = new Date(dateETYear, dateETMonth - 1, dateETDate);
            dateET.setHours(0, 0, 0, 0);

            var gamesForDate: GamesForDate = {
              dateET: dateETYear + "-" + dateETMonth + "-" + dateETDate,
              games: games,
              numberOfFinishedGames: 0,
              numberOfActiveGames: 0,
              numberOfUpcomingGames: 0,
            };

            for (let i = 0; i < games.length; i++) {
              let game = games[i];

              if (game.isActive) {
                // Game is active
                gamesForDate.numberOfActiveGames += 1;

                this.getBoxScore(game.gameId, dateET).then((boxScore) => {
                  game.awayTeam.score = boxScore.basicGameData.awayTeam.score;
                  game.homeTeam.score = boxScore.basicGameData.homeTeam.score;
                  game.period = {
                    current: boxScore.basicGameData.period.current,
                    isHalftime: boxScore.basicGameData.period.isHalftime,
                    isEndOfPeriod: boxScore.basicGameData.period.isEndOfPeriod,
                  };
                  game.clock = boxScore.basicGameData.clock;
                });
              } else if (!game.isActive && game.homeTeam.score != null) {
                // Game has finished
                gamesForDate.numberOfFinishedGames += 1;
              } else if (!game.isActive && game.homeTeam.score == null) {
                // Game is upcoming
                gamesForDate.numberOfUpcomingGames += 1;
              }
            }

            this.gamesForDates.push(gamesForDate);
          }
        })
    );
  }

  async getBoxScore(gameId: string, date: Date): Promise<BoxScore> {
    return await this.api.getBoxScore(gameId, date).toPromise();
  }
}
