type BasicTeamData = {
  teamId: string;
  cityName: string;
  nickname: string;
  abbreviation: string;
  wins: number;
  losses: number;
  score: number;
  lineScore: [
    {
      score: number;
    }
  ];
};

type StatsTeamLeaderData = {
  value: number;
  players: [{ personId: string; firstName: string; lastName: string }];
};

type StatsTeamData = {
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
  leaders: {
    points: StatsTeamLeaderData;
    rebounds: StatsTeamLeaderData;
    assists: StatsTeamLeaderData;
  };
};

type StatsActivePlayer = {
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
};

export class BoxScore {
  basicGameData: {
    seasonYear: string;
    gameId: string;
    isActive: boolean;
    dateET: string;
    timeET: string;
    clock: string;
    isPreviewArticleAvailable: boolean;
    isRecapArticleAvailable: boolean;
    period: {
      current: number;
      isHalftime: boolean;
      isEndOfPeriod: boolean;
    };
    awayTeam: BasicTeamData;
    homeTeam: BasicTeamData;
  };
  stats: {
    awayTeam: StatsTeamData;
    homeTeam: StatsTeamData;
    activePlayers: StatsActivePlayer[];
  };
}
