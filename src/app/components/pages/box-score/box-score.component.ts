import { Component, OnInit } from "@angular/core";
import { BoxScore } from "src/app/shared/box-score.model";
import { ApiService } from "src/app/shared/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Article } from "src/app/shared/article.model";
import { PlayByPlay } from "src/app/shared/play-by-play.model";

interface LineScoreTeam {
  abbreviation: string;
  lineScore: [
    {
      score: number;
    }
  ];
  score: number;
}

interface BoxScoreTeamPlayer {
  personId: string;
  firstName: string;
  lastName: string;
  jersey: string;
  teamId: string;
  isOnCourt: false;
  points: number;
  pos: string;
  position_full: string;
  player_code: string;
  min: number;
  fgm: number;
  fga: number;
  fgp: number;
  ftm: number;
  fta: number;
  ftp: number;
  tpm: number;
  tpa: number;
  tpp: number;
  offReb: number;
  defReb: number;
  totReb: number;
  assists: number;
  pFouls: number;
  steals: number;
  turnovers: number;
  blocks: number;
  plusMinus: number;
  dnp: string;
  sortKey: {
    name: number;
    pos: number;
    points: number;
    min: number;
    fgm: number;
    fga: number;
    fgp: number;
    ftm: number;
    fta: number;
    ftp: number;
    tpm: number;
    tpa: number;
    tpp: number;
    offReb: number;
    defReb: number;
    totReb: number;
    assists: number;
    pFouls: number;
    steals: number;
    turnovers: number;
    blocks: number;
    plusMinus: number;
  };
}

interface BoxScoreTeam {
  abbreviation: string;
  cityName: string;
  nickname: string;
  wins: number;
  losses: number;
  totals: {
    points: number;
    fgm: number;
    fga: number;
    fgp: number;
    ftm: number;
    fta: number;
    ftp: number;
    tpm: number;
    tpa: number;
    tpp: number;
    offReb: number;
    defReb: number;
    totReb: number;
    assists: number;
    pFouls: number;
    steals: number;
    turnovers: number;
    blocks: number;
    plusMinus: number;
    min: string;
    teamFouls: number;
  };
  players: BoxScoreTeamPlayer[];
}

@Component({
  selector: "app-box-score",
  templateUrl: "./box-score.component.html",
  styleUrls: ["./box-score.component.css"]
})
export class BoxScoreComponent implements OnInit {
  dateET: Date;
  boxScore: BoxScore;
  lineScoreData: LineScoreTeam[];
  lineScoreColumns: string[];
  boxScoreData: BoxScoreTeam[];
  boxScoreColumns: string[] = [
    "player",
    "min",
    "fg",
    "ft",
    "3pt",
    "plusMinus",
    "oreb",
    "reb",
    "ast",
    "blk",
    "stl",
    "to",
    "pf",
    "pts"
  ];
  previewArticle: Article;
  recapArticle: Article;
  playByPlay: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const dateETString = params.dateET;
      const dateETYear = parseInt(dateETString.substring(0, 4));
      const dateETMonth = parseInt(dateETString.substring(4, 6));
      const dateETDate = parseInt(dateETString.substring(6, 8));
      this.dateET = new Date(dateETYear, dateETMonth - 1, dateETDate);
      this.dateET.setHours(0, 0, 0, 0);

      // Get box score then preview and recap articles
      this.getBoxScore(params.gameId, this.dateET)
        .then(boxScore => {
          this.boxScore = boxScore;
          return boxScore;
        })
        .then(boxScore => {
          this.lineScoreData = [
            {
              abbreviation: boxScore.basicGameData.awayTeam.abbreviation,
              lineScore: boxScore.basicGameData.awayTeam.lineScore,
              score: boxScore.basicGameData.awayTeam.score
            },
            {
              abbreviation: boxScore.basicGameData.homeTeam.abbreviation,
              lineScore: boxScore.basicGameData.homeTeam.lineScore,
              score: boxScore.basicGameData.homeTeam.score
            }
          ];

          // Insert columns equal to the current period
          this.lineScoreColumns = ["team", "total"];
          for (let i = 0; i < boxScore.basicGameData.period.current; i++) {
            this.lineScoreColumns.splice(i + 1, 0, `${i + 1}`);
          }

          return boxScore;
        })
        .then(boxScore => {
          if (boxScore.basicGameData.isPreviewArticleAvailable) {
            this.getPreviewArticle(params.gameId, this.dateET).then(
              previewArticle => {
                this.previewArticle = previewArticle;
              }
            );
          }
          if (boxScore.basicGameData.isRecapArticleAvailable) {
            this.getRecapArticle(params.gameId, this.dateET).then(
              recapArticle => {
                this.recapArticle = recapArticle;
              }
            );
          }

          return boxScore;
        })
        .then(boxScore => {
          this.boxScoreData = [];
          this.boxScoreData.push({
            abbreviation: boxScore.basicGameData.awayTeam.abbreviation,
            cityName: boxScore.basicGameData.awayTeam.cityName,
            nickname: boxScore.basicGameData.awayTeam.nickname,
            wins: boxScore.basicGameData.awayTeam.wins,
            losses: boxScore.basicGameData.awayTeam.losses,
            totals: boxScore.stats.awayTeam.totals,
            players: []
          });
          this.boxScoreData.push({
            abbreviation: boxScore.basicGameData.homeTeam.abbreviation,
            cityName: boxScore.basicGameData.homeTeam.cityName,
            nickname: boxScore.basicGameData.homeTeam.nickname,
            wins: boxScore.basicGameData.homeTeam.wins,
            losses: boxScore.basicGameData.homeTeam.losses,
            totals: boxScore.stats.homeTeam.totals,
            players: []
          });

          const awayTeamId = boxScore.basicGameData.awayTeam.teamId;
          const homeTeamId = boxScore.basicGameData.homeTeam.teamId;
          boxScore.stats.activePlayers.forEach((player: BoxScoreTeamPlayer) => {
            if (player.teamId == awayTeamId) {
              this.boxScoreData[0].players.push(player);
            } else if (player.teamId == homeTeamId) {
              this.boxScoreData[1].players.push(player);
            }
          });

          // Sort players by minutes played
          const sortingFunction = (
            player1: BoxScoreTeamPlayer,
            player2: BoxScoreTeamPlayer
          ) => (player1.sortKey.min > player2.sortKey.min ? 1 : -1);
          this.boxScoreData[0].players.sort(sortingFunction);
          this.boxScoreData[1].players.sort(sortingFunction);

          return boxScore;
        })
        .then(async boxScore => {
          // Get play-by-play data
          return {
            boxScore: boxScore,
            playByPlay: await this.getPlayByPlay(params.gameId, this.dateET)
          };
        })
        .then(({ boxScore, playByPlay }) => {
          var periods = [];
          playByPlay.periods.forEach((playByPlayPeriod, periodIndex) => {
            var coordinates = {
              x: [],
              y: []
            };

            var playMarkerSymbols = [];
            playByPlayPeriod.plays.forEach(play => {
              if (play.isScoreChange) {
                // Will need a full date in order to display it on plotly as a time
                coordinates.x.push("1970-01-01 00:" + play.clock);
                coordinates.y.push(play.awayTeamScore - play.homeTeamScore);

                play.isVideoAvailable
                  ? playMarkerSymbols.push("circle")
                  : playMarkerSymbols.push("circle-open");
              }
            });
            console.log(playMarkerSymbols)

            periods.push({
              x: coordinates.x,
              y: coordinates.y,
              xaxis: "x" + (periodIndex != 0 ? periodIndex + 1 : ""),
              yaxis: "y",
              mode: "lines+markers",
              line: {
                shape: "spline",
                smoothing: 0.3,
                width: 3
              },
              marker: {
                size: 8,
                symbol: playMarkerSymbols
              },
              type: "scatter"
            });
          });

          this.playByPlay = {
            data: periods,
            layout: {
              autosize: true,
              grid: {
                rows: 1,
                columns: periods.length,
                xgap: 0.05
              },
              yaxis: {
                fixedrange: true,
                showgrid: false,
                range: [
                  -(boxScore.stats.homeTeam.biggestLead + 2),
                  boxScore.stats.awayTeam.biggestLead + 2
                ]
              }
            }
          };

          for (
            let periodIndex = 0;
            periodIndex < periods.length;
            periodIndex++
          ) {
            this.playByPlay.layout[
              "xaxis" + (periodIndex != 0 ? periodIndex + 1 : "")
            ] = {
              fixedrange: true,
              showgrid: false,
              type: "date",
              tickformat: "%M:%S",
              autorange: "reversed",
              title: {
                text:
                  periodIndex <= 3
                    ? "Q" + (periodIndex + 1)
                    : "OT" + (periodIndex - 3)
              }
            };
          }

          console.log(this.playByPlay);
        })
        .catch(() => {
          this.router.navigate(["/home"]);
        });
    });
  }

  getBoxScore(gameId: string, date: Date): Promise<BoxScore> {
    return this.api.getBoxScore(gameId, date).toPromise();
  }

  getPreviewArticle(gameId: string, date: Date): Promise<Article> {
    return this.api.getPreviewArticle(gameId, date).toPromise();
  }

  getRecapArticle(gameId: string, date: Date): Promise<Article> {
    return this.api.getRecapArticle(gameId, date).toPromise();
  }

  getPlayByPlay(gameId: string, date: Date): Promise<PlayByPlay> {
    return this.api.getPlayByPlay(gameId, date).toPromise();
  }
}

// Interpolate between two colors
function interpolateColors(
  color1String: string,
  color2String: string,
  steps: number
): string[] {
  const stepFactor = 1 / (steps - 1);
  var interpolatedColorArray: string[] = [];

  const color1 = color1String.match(/\d+/g).map(Number);
  const color2 = color2String.match(/\d+/g).map(Number);

  for (var i = 0; i < steps; i++) {
    interpolatedColorArray.push(
      interpolateColor(color1, color2, stepFactor * i)
    );
  }

  return interpolatedColorArray;
}

// Returns a single rgb color interpolation between given rgb color
function interpolateColor(
  color1: number[],
  color2: number[],
  factor: number
): string {
  var result = color1.slice();
  for (var i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }

  return "rgb(" + result.toString() + ")";
}
