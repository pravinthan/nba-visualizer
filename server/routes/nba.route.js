const express = require("express");
const nba = require("nba.js").default;
const nbaRoute = express.Router();
require("cross-fetch/polyfill");

const teams = {
  "1610612737": { fullName: "Atlanta Hawks", abbreviation: "ATL" },
  "1610612738": { fullName: "Boston Celtics", abbreviation: "BOS" },
  "1610612751": { fullName: "Brooklyn Nets", abbreviation: "BKN" },
  "1610612766": { fullName: "Charlotte Hornets", abbreviation: "CHA" },
  "1610612741": { fullName: "Chicago Bulls", abbreviation: "CHI" },
  "1610612739": { fullName: "Cleveland Cavaliers", abbreviation: "CLE" },
  "1610612742": { fullName: "Dallas Mavericks", abbreviation: "DAL" },
  "1610612743": { fullName: "Denver Nuggets", abbreviation: "DEN" },
  "1610612765": { fullName: "Detroit Pistons", abbreviation: "DET" },
  "1610612744": { fullName: "Golden State Warriors", abbreviation: "GSW" },
  "1610612745": { fullName: "Houston Rockets", abbreviation: "HOU" },
  "1610612754": { fullName: "Indiana Pacers", abbreviation: "IND" },
  "1610612746": { fullName: "Los Angeles Clippers", abbreviation: "LAC" },
  "1610612747": { fullName: "Los Angeles Lakers", abbreviation: "LAL" },
  "1610612763": { fullName: "Memphis Grizzlies", abbreviation: "MEM" },
  "1610612748": { fullName: "Miami Heat", abbreviation: "MIA" },
  "1610612749": { fullName: "Milwaukee Bucks", abbreviation: "MIL" },
  "1610612750": { fullName: "Minnesota Timberwolves", abbreviation: "MIN" },
  "1610612740": { fullName: "New Orleans Pelicans", abbreviation: "NOP" },
  "1610612752": { fullName: "New York Knicks", abbreviation: "NYK" },
  "1610612760": { fullName: "Oklahoma City Thunder", abbreviation: "OKC" },
  "1610612753": { fullName: "Orlando Magic", abbreviation: "ORL" },
  "1610612755": { fullName: "Philadelphia 76ers", abbreviation: "PHI" },
  "1610612756": { fullName: "Phoenix Suns", abbreviation: "PHX" },
  "1610612757": { fullName: "Portland Trail Blazers", abbreviation: "POR" },
  "1610612758": { fullName: "Sacramento Kings", abbreviation: "SAC" },
  "1610612759": { fullName: "San Antonio Spurs", abbreviation: "SAS" },
  "1610612761": { fullName: "Toronto Raptors", abbreviation: "TOR" },
  "1610612762": { fullName: "Utah Jazz", abbreviation: "UTA" },
  "1610612764": { fullName: "Washington Wizards", abbreviation: "WAS" }
};

/**
 * Get box score for a given game on the given date
 *
 * @param gameId is the game's unique ID
 * @param date is the date of the game (1-31)
 * @param month is the month of the game (1-12)
 * @param year is the year of the game
 */
nbaRoute
  .route("/box-score/:gameId/:date/:month/:year")
  .get((req, res, next) => {
    // Prepend a "0" to the month/date if it is given without it
    if (req.params.month.length != 2) {
      req.params.month = "0" + req.params.month;
    }
    if (req.params.date.length != 2) {
      req.params.date = "0" + req.params.date;
    }

    nba.data
      .boxscore({
        gameId: req.params.gameId,
        date: req.params.year + req.params.month + req.params.date
      })
      .then(boxscore => {
        return {
          basicGameData: {
            seasonYear: boxscore.basicGameData.seasonYear,
            gameId: boxscore.basicGameData.gameId,
            isActive: boxscore.basicGameData.isGameActivated,
            dateET: boxscore.basicGameData.startDateEastern,
            timeET: boxscore.basicGameData.startTimeEastern,
            clock: boxscore.basicGameData.clock,
            isPreviewArticleAvailable:
              boxscore.basicGameData.isPreviewArticleAvail,
            isRecapArticleAvailable: boxscore.basicGameData.isRecapArticleAvail,
            period: {
              current: boxscore.basicGameData.period.current,
              isHalftime: boxscore.basicGameData.period.isHalftime,
              isEndOfPeriod: boxscore.basicGameData.period.isEndOfPeriod
            },
            awayTeam: {
              teamId: boxscore.basicGameData.vTeam.teamId,
              wins: boxscore.basicGameData.vTeam.win,
              losses: boxscore.basicGameData.vTeam.loss,
              score: boxscore.basicGameData.vTeam.score,
              lineScore: boxscore.basicGameData.vTeam.linescore
            },
            homeTeam: {
              teamId: boxscore.basicGameData.hTeam.teamId,
              wins: boxscore.basicGameData.hTeam.win,
              losses: boxscore.basicGameData.hTeam.loss,
              score: boxscore.basicGameData.hTeam.score,
              lineScore: boxscore.basicGameData.hTeam.linescore
            }
          },
          stats: {
            awayTeam: {
              biggestLead: parseInt(boxscore.stats.vTeam.biggestLead),
              totals: {
                points: boxscore.stats.vTeam.totals.points,
                fgm: boxscore.stats.vTeam.totals.fgm,
                fga: boxscore.stats.vTeam.totals.fga,
                fgp: boxscore.stats.vTeam.totals.fgp,
                ftm: boxscore.stats.vTeam.totals.ftm,
                fta: boxscore.stats.vTeam.totals.fta,
                ftp: boxscore.stats.vTeam.totals.ftp,
                tpm: boxscore.stats.vTeam.totals.tpm,
                tpa: boxscore.stats.vTeam.totals.tpa,
                tpp: boxscore.stats.vTeam.totals.tpp,
                offReb: boxscore.stats.vTeam.totals.offReb,
                defReb: boxscore.stats.vTeam.totals.defReb,
                totReb: boxscore.stats.vTeam.totals.totReb,
                assists: boxscore.stats.vTeam.totals.assists,
                pFouls: boxscore.stats.vTeam.totals.pFouls,
                steals: boxscore.stats.vTeam.totals.steals,
                turnovers: boxscore.stats.vTeam.totals.turnovers,
                blocks: boxscore.stats.vTeam.totals.blocks,
                plusMinus: boxscore.stats.vTeam.totals.plusMinus,
                min: boxscore.stats.vTeam.totals.min,
                teamFouls: boxscore.stats.vTeam.totals.team_fouls
              },
              leaders: {
                points: {
                  value: boxscore.stats.vTeam.leaders.points.value,
                  players: boxscore.stats.vTeam.leaders.points.players
                },
                rebounds: {
                  value: boxscore.stats.vTeam.leaders.rebounds.value,
                  players: boxscore.stats.vTeam.leaders.rebounds.players
                },
                assists: {
                  value: boxscore.stats.vTeam.leaders.assists.value,
                  players: boxscore.stats.vTeam.leaders.assists.players
                }
              }
            },
            homeTeam: {
              biggestLead: parseInt(boxscore.stats.hTeam.biggestLead),
              totals: {
                points: boxscore.stats.hTeam.totals.points,
                fgm: boxscore.stats.hTeam.totals.fgm,
                fga: boxscore.stats.hTeam.totals.fga,
                fgp: boxscore.stats.hTeam.totals.fgp,
                ftm: boxscore.stats.hTeam.totals.ftm,
                fta: boxscore.stats.hTeam.totals.fta,
                ftp: boxscore.stats.hTeam.totals.ftp,
                tpm: boxscore.stats.hTeam.totals.tpm,
                tpa: boxscore.stats.hTeam.totals.tpa,
                tpp: boxscore.stats.hTeam.totals.tpp,
                offReb: boxscore.stats.hTeam.totals.offReb,
                defReb: boxscore.stats.hTeam.totals.defReb,
                totReb: boxscore.stats.hTeam.totals.totReb,
                assists: boxscore.stats.hTeam.totals.assists,
                pFouls: boxscore.stats.hTeam.totals.pFouls,
                steals: boxscore.stats.hTeam.totals.steals,
                turnovers: boxscore.stats.hTeam.totals.turnovers,
                blocks: boxscore.stats.hTeam.totals.blocks,
                plusMinus: boxscore.stats.hTeam.totals.plusMinus,
                min: boxscore.stats.hTeam.totals.min,
                teamFouls: boxscore.stats.hTeam.totals.team_fouls
              },
              leaders: {
                points: {
                  value: boxscore.stats.hTeam.leaders.points.value,
                  players: boxscore.stats.hTeam.leaders.points.players
                },
                rebounds: {
                  value: boxscore.stats.hTeam.leaders.rebounds.value,
                  players: boxscore.stats.hTeam.leaders.rebounds.players
                },
                assists: {
                  value: boxscore.stats.hTeam.leaders.assists.value,
                  players: boxscore.stats.hTeam.leaders.assists.players
                }
              }
            },
            activePlayers: boxscore.stats.activePlayers
          }
        };
      })
      .then(boxscore => {
        return nba.data
          .teams({ year: boxscore.basicGameData.seasonYear })
          .then(teams => {
            // Add team names
            const teamList = teams.league.standard;
            teamList.forEach(team => {
              if (team.teamId == boxscore.basicGameData.awayTeam.teamId) {
                boxscore.basicGameData.awayTeam.cityName = team.city;
                boxscore.basicGameData.awayTeam.nickname = team.nickname;
                boxscore.basicGameData.awayTeam.abbreviation = team.tricode;
              }
              if (team.teamId == boxscore.basicGameData.homeTeam.teamId) {
                boxscore.basicGameData.homeTeam.cityName = team.city;
                boxscore.basicGameData.homeTeam.nickname = team.nickname;
                boxscore.basicGameData.homeTeam.abbreviation = team.tricode;
              }
            });

            return Promise.resolve(boxscore);
          });
      })
      .then(boxscore => res.json(boxscore))
      .catch(err => {
        return next(err);
      });
  });

/**
 * Get preview article for a given game on the given date
 *
 * @param gameId is the game's unique ID
 * @param date is the date of the game (1-31)
 * @param month is the month of the game (1-12)
 * @param year is the year of the game
 */
nbaRoute
  .route("/preview-article/:gameId/:date/:month/:year")
  .get((req, res, next) => {
    // Prepend a "0" to the month/date if it is given without it
    if (req.params.month.length != 2) {
      req.params.month = "0" + req.params.month;
    }
    if (req.params.date.length != 2) {
      req.params.date = "0" + req.params.date;
    }

    nba.data
      .previewArticle({
        gameId: req.params.gameId,
        date: req.params.year + req.params.month + req.params.date
      })
      .then(previewArticle => {
        return {
          author: previewArticle.author,
          authorTitle: previewArticle.authorTitle,
          title: previewArticle.title,
          paragraphs: previewArticle.paragraphs
        };
      })
      .then(previewArticle => {
        res.json(previewArticle);
      });
  });

/**
 * Get recap article for a given game on the given date
 *
 * @param gameId is the game's unique ID
 * @param date is the date of the game (1-31)
 * @param month is the month of the game (1-12)
 * @param year is the year of the game
 */
nbaRoute
  .route("/recap-article/:gameId/:date/:month/:year")
  .get((req, res, next) => {
    // Prepend a "0" to the month/date if it is given without it
    if (req.params.month.length != 2) {
      req.params.month = "0" + req.params.month;
    }
    if (req.params.date.length != 2) {
      req.params.date = "0" + req.params.date;
    }

    nba.data
      .recapArticle({
        gameId: req.params.gameId,
        date: req.params.year + req.params.month + req.params.date
      })
      .then(recapArticle => {
        return {
          author: recapArticle.author,
          authorTitle: recapArticle.authorTitle,
          title: recapArticle.title,
          paragraphs: recapArticle.paragraphs
        };
      })
      .then(recapArticle => {
        res.json(recapArticle);
      });
  });

/**
 * Get play-by-play data for a given game
 *
 * @param gameId is the game's unique ID
 */
nbaRoute.route("/play-by-play/:gameId/:seasonYear").get((req, res, next) => {
  fetch(
    `https://nlnbamdnyc-a.akamaihd.net/fs/nba/feeds_s2012/stats/${req.params.seasonYear}/pbp/${req.params.gameId}.json`
  )
    .then(response => response.json())
    .then(playByPlay => {
      let newPlayByPlay = { periods: [] };
      playByPlay.quarters.forEach((period, periodIndex) => {
        if (newPlayByPlay.periods[periodIndex] == null) {
          newPlayByPlay.periods[periodIndex] = { plays: [] };
        }

        period.plays.forEach(play => {
          newPlayByPlay.periods[periodIndex].plays.push({
            clock: play.c,
            eventNum: play.id,
            description: play.d,
            relevantTeamAbbreviation: play.t,
            awayTeamScore: play.vs,
            homeTeamScore: play.hs,
            isVideoAvailable: play.v != null,
            videoServer: play.vs,
            didScoreChange: play.p > 0
          });
        });
      });

      return newPlayByPlay;
    })
    .then(playByPlay => res.json(playByPlay))
    .catch(err => {
      return next(err);
    });
});

nbaRoute
  .route("/play-by-play/:gameId/:date/:month/:year")
  .get((req, res, next) => {
    // Prepend a "0" to the month/date if it is given without it
    if (req.params.month.length != 2) {
      req.params.month = "0" + req.params.month;
    }
    if (req.params.date.length != 2) {
      req.params.date = "0" + req.params.date;
    }

    nba.data
      .miniBoxscore({
        gameId: req.params.gameId,
        date: req.params.year + req.params.month + req.params.date
      })
      .then(async miniBoxscore => {
        let playByPlays = {
          periods: []
        };

        const currentPeriod = miniBoxscore.basicGameData.period.current;
        const awayTeamId = miniBoxscore.basicGameData.vTeam.teamId;
        const homeTeamId = miniBoxscore.basicGameData.vTeam.teamId;
        for (let periodIndex = 0; periodIndex < currentPeriod; periodIndex++) {
          let playByPlay = await nba.data.pbp({
            date: req.params.year + req.params.month + req.params.date,
            gameId: req.params.gameId,
            period: periodIndex + 1
          });

          playByPlay.plays.forEach((play, playIndex) => {
            playByPlay.plays[playIndex] = {
              clock: play.clock,
              eventNum: -1,
              eventMsgType: play.eventMsgType,
              eventMsgActionType: -1,
              awayDescription:
                play.teamId == awayTeamId ? play.formatted.description : null,
              neutralDescription: null,
              homeDescription:
                play.teamId == homeTeamId ? play.formatted.description : null,
              awayTeamScore: play.vTeamScore,
              homeTeamScore: play.hTeamScore,
              isVideoAvailable: false,
              isScoreChange: play.isScoreChange
            };
          });

          playByPlays.periods.push({
            plays: playByPlay.plays
          });
        }

        return playByPlays;
      })
      .then(playByPlay => res.json(playByPlay))
      .catch(err => {
        return next(err);
      });
  });

/**
 * Get play-by-play video url
 *
 * @param gameId is the game's unique ID
 * @param relevantTeamAbbreviation is the abbreviation of the team who caused the play
 * @param eventNum is the specific play's event number
 */
nbaRoute
  .route("/play-by-play-video-url/:gameId/:relevantTeamAbbreviation/:eventNum")
  .get((req, res, next) => {
    fetch(
      `https://watch.nba.com/service/publishpoint?type=game&extid=${req.params.gameId}&gt=128&event=${req.params.relevantTeamAbbreviation}${req.params.eventNum}&format=json`
    )
      .then(response => response.json())
      .then(responseJson => {
        return { videoURL: responseJson.path };
      })
      .then(playByPlayVideoURL => res.json(playByPlayVideoURL))
      .catch(err => {
        return next(err);
      });
  });

/**
 * Get scheduled games for the given date
 *
 * @param date is the date of the game (1-31)
 * @param month is the month of the game (1-12)
 * @param year is the year of the game
 */
nbaRoute.route("/schedule/:date/:month/:year").get((req, res, next) => {
  // If month requested is before August, then user is requesting season (year - 1)
  var seasonYear = req.params.year;
  if (parseInt(req.params.month) <= 8) {
    seasonYear = (parseInt(seasonYear) - 1).toString();
  }

  nba.data
    .schedule({ year: seasonYear })
    .then(schedule => {
      // Filter the schedule to only show games on the given date and month
      var games = [];
      const gameList = schedule.league.standard;
      gameList.forEach(game => {
        const gameTimeET = game.startTimeEastern.substring(
          0,
          game.startTimeEastern.indexOf("ET") - 1
        );
        const gameStartET = game.startDateEastern;
        const gameStartDateET = gameStartET.substring(6, 8);
        const gameStartMonthET = gameStartET.substring(4, 6);

        if (
          parseInt(req.params.date) == parseInt(gameStartDateET) &&
          parseInt(req.params.month) == parseInt(gameStartMonthET)
        ) {
          var gameJSON = {
            gameId: game.gameId,
            awayTeam: {
              fullName: teams[game.vTeam.teamId].fullName,
              abbreviation: teams[game.vTeam.teamId].abbreviation,
              wins: game.vTeam.win,
              losses: game.vTeam.loss
            },
            homeTeam: {
              fullName: teams[game.hTeam.teamId].fullName,
              abbreviation: teams[game.hTeam.teamId].abbreviation,
              wins: game.hTeam.win,
              losses: game.hTeam.loss
            },
            isActive: false,
            dateET: gameStartET,
            timeET: gameTimeET
          };

          if (game.statusNum == 3) {
            // Game has finished
            gameJSON.awayTeam.score = game.vTeam.score;
            gameJSON.homeTeam.score = game.hTeam.score;
          } else if (game.statusNum == 1 && game.period.current != 0) {
            // Game is active
            gameJSON.isActive = true;
          }

          games.push(gameJSON);
        }
      });

      return games;
    })
    .then(games => res.json(games))
    .catch(err => {
      return next(err);
    });
});

module.exports = nbaRoute;
