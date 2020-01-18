export class PlayByPlay {
  periods: [
    {
      plays: [
        {
          clock: string;
          eventNum: number;
          eventMsgType: number;
          eventMsgActionType: number;
          awayDescription: string;
          neutralDescription: string;
          homeDescription: string;
          awayTeamScore: number;
          homeTeamScore: number;
          isVideoAvailable: boolean;
        }
      ];
    }
  ];
}
