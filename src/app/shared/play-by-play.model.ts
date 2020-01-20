export class PlayByPlay {
  periods: [
    {
      plays: [
        {
          clock: string;
          eventNum: number;
          description: string;
          relevantTeamAbbreviation: string;
          awayTeamScore: number;
          homeTeamScore: number;
          isVideoAvailable: boolean;
          videoServer: number;
          didScoreChange: boolean;
        }
      ];
    }
  ];
}
