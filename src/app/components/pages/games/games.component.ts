import { Component, OnInit } from "@angular/core";
import { BoxScore } from "src/app/shared/box-score.model";
import { ApiService } from "src/app/shared/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Article } from "src/app/shared/article.model";
import { PlayByPlay } from "src/app/shared/play-by-play.model";
import { MatDialog } from "@angular/material";
import { PlayByPlayVideo } from "src/app/shared/play-by-play-video.model";
import { PlayByPlayVideoDialogComponent } from "./play-by-play-video-dialog/play-by-play-video-dialog.component";

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
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"]
})
export class GamesComponent implements OnInit {
  Number = Number;
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
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
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
        .then(boxScore => {
          if (!boxScore.basicGameData.isActive) {
            // Get play-by-play data
            this.getPlayByPlayStats(
              params.gameId,
              boxScore.basicGameData.seasonYear
            ).then(playByPlay => {
              var numberOfScoreChangingPlays = 0;
              playByPlay.periods.forEach(playByPlayPeriod => {
                playByPlayPeriod.plays.forEach(play => {
                  if (play.didScoreChange) {
                    numberOfScoreChangingPlays++;
                  }
                });
              });

              var colours: string[] = [];
              colours = interpolateColors(
                "rgb(0,159,255)",
                "rgb(236,47,75)",
                numberOfScoreChangingPlays
              );

              var periods = [];
              var colourIndex = 0;
              playByPlay.periods.forEach((playByPlayPeriod, periodIndex) => {
                var coordinates = { x: [], y: [] };
                var playMarkerSymbols: string[] = [];
                var scoreChangingPlays = [];
                var hoverTexts: string[] = [];
                playByPlayPeriod.plays.forEach(play => {
                  if (play.didScoreChange) {
                    scoreChangingPlays.push(play);

                    // Will need a full date in order to display it on plotly as a time
                    coordinates.x.push("1970-01-01 00:" + play.clock);
                    coordinates.y.push(play.homeTeamScore - play.awayTeamScore);

                    play.isVideoAvailable
                      ? playMarkerSymbols.push("circle")
                      : playMarkerSymbols.push("circle-open");

                    hoverTexts.push(
                      `${play.awayTeamScore - play.homeTeamScore}` +
                        `<br><b>Score</b>: ${play.awayTeamScore} - ${play.homeTeamScore}` +
                        `<br><b>Description</b>: ${play.description}`
                    );
                  }
                });

                periods.push({
                  customPlays: scoreChangingPlays,
                  x: coordinates.x,
                  y: coordinates.y,
                  xaxis: "x" + (periodIndex != 0 ? periodIndex + 1 : ""),
                  yaxis: "y",
                  mode: "lines+markers",
                  line: {
                    shape: "spline",
                    smoothing: 0.3,
                    width: 3,
                    color: shadeColour(
                      rgbToHex(
                        colours[colourIndex + scoreChangingPlays.length - 1]
                          .replace(/[^\d,]/g, "")
                          .split(",")
                      ),
                      40
                    )
                  },
                  marker: {
                    size: 8,
                    symbol: playMarkerSymbols,
                    color: colours.slice(
                      colourIndex,
                      colourIndex + scoreChangingPlays.length
                    )
                  },
                  type: "scattergl",
                  hoverinfo: "text",
                  text: hoverTexts
                });

                colourIndex += scoreChangingPlays.length;
              });

              this.playByPlay = {
                data: periods,
                layout: {
                  images: [
                    {
                      source:
                        "assets/team-logos/" +
                        boxScore.basicGameData.awayTeam.abbreviation.toLowerCase() +
                        ".png",
                      opacity: 0.5,
                      sizex: 0.2,
                      sizey: 0.2,
                      xanchor: "right",
                      yanchor: "top"
                    },
                    {
                      source:
                        "assets/team-logos/" +
                        boxScore.basicGameData.homeTeam.abbreviation.toLowerCase() +
                        ".png",
                      opacity: 0.5,
                      xref: "paper",
                      yref: "paper",
                      x: 0,
                      y: 1,
                      sizex: 0.2,
                      sizey: 0.2,
                      xanchor: "right",
                      yanchor: "bottom"
                    }
                  ],
                  showlegend: false,
                  autosize: true,
                  grid: {
                    rows: 1,
                    columns: periods.length,
                    xgap: 0.1
                  },
                  yaxis: {
                    fixedrange: true,
                    showgrid: false,
                    range: [
                      -(boxScore.stats.awayTeam.biggestLead + 2),
                      boxScore.stats.homeTeam.biggestLead + 2
                    ],
                    title: {
                      text: "Score difference (away-home)"
                    }
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
                  range: [
                    periodIndex <= 3
                      ? "1970-01-01 00:12:00.0"
                      : "1970-01-01 00:05:00.0",
                    "1970-01-01 00:00:00.0"
                  ],
                  tickangle: 40,
                  dtick: periodIndex <= 3 ? 240000 : 300000,
                  title: {
                    text:
                      periodIndex <= 3
                        ? "Q" + (periodIndex + 1)
                        : "OT" + (periodIndex - 3)
                  }
                };
              }
            });
          }
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

  getPlayByPlayStats(gameId: string, seasonYear: string): Promise<PlayByPlay> {
    return this.api.getPlayByPlayStats(gameId, seasonYear).toPromise();
  }

  getPlayByPlayData(gameId: string, date: Date): Promise<PlayByPlay> {
    return this.api.getPlayByPlayData(gameId, date).toPromise();
  }

  getPlayByPlayVideoURL(
    gameId: string,
    relevantTeamAbbreviation: string,
    eventNum: number
  ): Promise<PlayByPlayVideo> {
    return this.api
      .getPlayByPlayVideoURL(gameId, relevantTeamAbbreviation, eventNum)
      .toPromise();
  }

  // If video is available, open up a dialog
  async onMarkerClick(event: any) {
    const play = event.points[0].data.customPlays[event.points[0].pointIndex];
    if (play.isVideoAvailable) {
      this.dialog.open(PlayByPlayVideoDialogComponent, {
        width: "900px",
        height: "min-content",
        data: {
          video: this.getPlayByPlayVideoURL(
            this.boxScore.basicGameData.gameId,
            play.relevantTeamAbbreviation,
            play.eventNum
          ),
          caption: play.description
        }
      });
    }
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

function rgbToHex(rgb: string[]) {
  return (
    "#" +
    rgb
      .map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Shade a given hex colour by a specific amount (+amt -> lighten, -amt -> darken)
function shadeColour(colour: string, amount: number) {
  var usePound = false;
  if (colour[0] == "#") {
    colour = colour.slice(1);
    usePound = true;
  }

  const num = parseInt(colour, 16);
  var r = (num >> 16) + amount;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amount;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amount;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
