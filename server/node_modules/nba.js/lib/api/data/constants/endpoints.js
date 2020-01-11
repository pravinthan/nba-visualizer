"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CALENDAR = exports.CALENDAR = {
  method: "calendar",
  endpoint: "/data/10s/prod/v1/calendar.json"
};

var SCOREBOARD = exports.SCOREBOARD = {
  method: "scoreboard",
  endpoint: "/data/10s/prod/v1/{{date}}/scoreboard.json"
};

var TEAMS = exports.TEAMS = {
  method: "teams",
  endpoint: "/data/10s/prod/v1/{{year}}/teams.json"
};

var LEAGUE_ROSTER_PLAYERS = exports.LEAGUE_ROSTER_PLAYERS = {
  method: "players",
  endpoint: "/data/10s/prod/v1/{{year}}/players.json"
};

var LEAGUE_ROSTER_COACHES = exports.LEAGUE_ROSTER_COACHES = {
  method: "coaches",
  endpoint: "/data/10s/prod/v1/{{year}}/coaches.json"
};

var LEAGUE_SCHEDULE = exports.LEAGUE_SCHEDULE = {
  method: "schedule",
  endpoint: "/data/10s/prod/v1/{{year}}/schedule.json"
};

var LEAGUE_CONFERENCE_STANDINGS = exports.LEAGUE_CONFERENCE_STANDINGS = {
  method: "conferenceStandings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_conference.json"
};

var LEAGUE_DIVISION_STANDINGS = exports.LEAGUE_DIVISION_STANDINGS = {
  method: "divisionStandings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_division.json"
};

var LEAGUE_UNGROUPED_STANDINGS = exports.LEAGUE_UNGROUPED_STANDINGS = {
  method: "standings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_all.json"
};

var LEAGUE_MINI_STANDINGS = exports.LEAGUE_MINI_STANDINGS = {
  method: "miniStandings",
  endpoint: "/data/10s/prod/v1/{{date}}/standings_all_no_sort_keys.json"
};

var LEAGUE_TEAM_STATS_LEADERS = exports.LEAGUE_TEAM_STATS_LEADERS = {
  method: "teamStatsLeaders",
  endpoint: "/data/10s/prod/v1/{{year}}/team_stats_rankings.json"
};

var LEAGUE_LAST_FIVE_GAME_TEAM_STATS = exports.LEAGUE_LAST_FIVE_GAME_TEAM_STATS = {
  method: "lastFiveGameTeamStats",
  endpoint: "/data/10s/prod/v1/{{year}}/team_stats_last_five_games.json"
};

var PREVIEW_ARTICLE = exports.PREVIEW_ARTICLE = {
  method: "previewArticle",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_preview_article.json"
};

var RECAP_ARTICLE = exports.RECAP_ARTICLE = {
  method: "recapArticle",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_recap_article.json"
};

var BOXSCORE = exports.BOXSCORE = {
  method: "boxscore",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_boxscore.json"
};

var MINI_BOXSCORE = exports.MINI_BOXSCORE = {
  method: "miniBoxscore",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_mini_boxscore.json"
};

var PLAY_BY_PLAY = exports.PLAY_BY_PLAY = {
  method: "pbp",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_pbp_{{period}}.json"
};

var LEAD_TRACKER = exports.LEAD_TRACKER = {
  method: "leadTracker",
  endpoint: "/data/10s/prod/v1/{{date}}/{{gameId}}_lead_tracker_{{period}}.json"
};

var PLAYER_GAMELOG = exports.PLAYER_GAMELOG = {
  method: "playerGamelog",
  endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_gamelog.json"
};

var PLAYER_PROFILE = exports.PLAYER_PROFILE = {
  method: "playerProfile",
  endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_profile.json"
};

var PLAYER_UBER_STATS = exports.PLAYER_UBER_STATS = {
  method: "playerUberStats",
  endpoint: "/data/10s/prod/v1/{{year}}/players/{{personId}}_uber_stats.json"
};

var PLAYOFFS_BRACKET = exports.PLAYOFFS_BRACKET = {
  method: "playoffsBracket",
  endpoint: "/data/10s/prod/v1/{{year}}/playoffsBracket.json"
};

var TEAM_SCHEDULE = exports.TEAM_SCHEDULE = {
  method: "teamSchedule",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/schedule.json"
};

var TEAMS_CONFIG = exports.TEAMS_CONFIG = {
  method: "teamsConfig",
  endpoint: "/data/1h/prod/{{year}}/teams_config.json"
};

var TEAM_ROSTER = exports.TEAM_ROSTER = {
  method: "teamRoster",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/roster.json"
};

var TEAMS_CONFIG_YEAR = exports.TEAMS_CONFIG_YEAR = {
  method: "teamsConfigYear",
  endpoint: "/data/1h/prod/{{year}}/teams_config.json"
};

var TEAM_SCHEDULE_YEAR = exports.TEAM_SCHEDULE_YEAR = {
  method: "teamScheduleYear",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/schedule.json"
};

var TEAM_LEADERS = exports.TEAM_LEADERS = {
  method: "teamLeaders",
  endpoint: "/data/10s/prod/v1/{{year}}/teams/{{teamName}}/leaders.json"
};

var TEAM_STATS_RANKINGS = exports.TEAM_STATS_RANKINGS = {
  method: "teamStatsRankings",
  endpoint: "/data/10s/prod/v1/{{year}}/team_stats_rankings.json"
};