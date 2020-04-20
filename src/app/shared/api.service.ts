import { Injectable } from "@angular/core";
import { Game } from "./game.model";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { BoxScore } from "./box-score.model";
import { Article } from "./article.model";
import { PlayByPlay } from "./play-by-play.model";
import { PlayByPlayVideo } from "./play-by-play-video.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  endpoint = "/api";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Get schedule for a specific date
  getSchedule(date: Date): Observable<any> {
    const dateETDate = date.getDate();
    const dateETMonth = date.getMonth() + 1;
    const dateETYear = date.getFullYear();
    const API_URL = `${this.endpoint}/schedule/${dateETDate}/${dateETMonth}/${dateETYear}`;

    return this.http
      .get<Game[]>(API_URL, { headers: this.headers })
      .pipe(
        map((res: Game[]) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // Get boxscore for a given game and date
  getBoxScore(gameId: string, date: Date): Observable<any> {
    const dateETDate = date.getDate();
    const dateETMonth = date.getMonth() + 1;
    const dateETYear = date.getFullYear();
    const API_URL = `${this.endpoint}/box-score/${gameId}/${dateETDate}/${dateETMonth}/${dateETYear}`;

    return this.http
      .get<BoxScore>(API_URL, { headers: this.headers })
      .pipe(
        map((res: BoxScore) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // Get preview article for a given game and date
  getPreviewArticle(gameId: string, date: Date): Observable<any> {
    const dateETDate = date.getDate();
    const dateETMonth = date.getMonth() + 1;
    const dateETYear = date.getFullYear();
    const API_URL = `${this.endpoint}/preview-article/${gameId}/${dateETDate}/${dateETMonth}/${dateETYear}`;

    return this.http
      .get<Article>(API_URL, { headers: this.headers })
      .pipe(
        map((res: Article) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // Get recap article for a given game and date
  getRecapArticle(gameId: string, date: Date): Observable<any> {
    const dateETDate = date.getDate();
    const dateETMonth = date.getMonth() + 1;
    const dateETYear = date.getFullYear();
    const API_URL = `${this.endpoint}/recap-article/${gameId}/${dateETDate}/${dateETMonth}/${dateETYear}`;

    return this.http
      .get<Article>(API_URL, { headers: this.headers })
      .pipe(
        map((res: Article) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // Get play-by-play data for a given game
  getPlayByPlay(gameId: string, seasonYear: string): Observable<any> {
    const API_URL = `${this.endpoint}/play-by-play/${gameId}/${seasonYear}`;

    return this.http
      .get<PlayByPlay>(API_URL, { headers: this.headers })
      .pipe(
        map((res: PlayByPlay) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // Get play-by-play video url for a given game and play event number
  getPlayByPlayVideoURL(
    gameId: string,
    relevantTeamAbbreviation: string,
    eventNum: number
  ): Observable<any> {
    const API_URL = `${this.endpoint}/play-by-play-video-url/${gameId}/${relevantTeamAbbreviation}/${eventNum}`;

    return this.http
      .get<PlayByPlayVideo>(API_URL, { headers: this.headers })
      .pipe(
        map((res: PlayByPlayVideo) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
