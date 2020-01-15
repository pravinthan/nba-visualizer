export class PlayByPlay {
  periods: [
    {
      plays: [
        {
          clock: string;
          eventMessageType: number;
          description: string;
          formattedDescription: string;
          personId: number;
          teamId: number;
          awayTeamScore: number;
          homeTeamScore: number;
          isScoreChange: boolean;
          isVideoAvailable: boolean;
        }
      ];
    }
  ];
}
