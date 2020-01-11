type Team = {
  fullName: string;
  abbreviation: string;
  wins: number;
  losses: number;
  score?: number;
};

export class Game {
  gameId: string;
  awayTeam: Team;
  homeTeam: Team;
  isActive: boolean;
  dateET: string;
  timeET: string;
  period: {
    current: number;
    isHalftime: boolean;
    isEndOfPeriod: boolean;
  };
  clock: string;
}
