import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay, flatMap, repeat } from 'rxjs/operators';
import { range, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private jsonURL = 'assets/sample.json';
  private games: Array<any>;
  private max = 5;
  private min = 0;
  constructor(private http: HttpClient) { }

  /**
   * getGamesList
   *
   * @description - Fetch the game list
   */
  public getGamesList(): Observable<any> {
    return this.http.get(this.jsonURL).pipe(
      map((data: any) => {
        this.games = this.sortData(data);
        return {data: this.games};
      }
    ));
  }

  /**
   * updateRating
   *
   * @description - update game list and return updated data.
   */
  public updateRating(rating: number, index: number): Observable<any> {
    this.games[index].rating = rating;
    return of({data: this.sortData(this.games)});
  }

  /**
   * scheduleRating
   *
   * @description - It will start rating random item and returns updated data.
   */
  public scheduleRating(): Observable<any> {
    return new Observable(observer => {
      const stopCallback = this.getRandomNumber().subscribe(data => {
        this.games[data].rating = this.getRandomRatings();
        observer.next({data: this.sortData(this.games), callback: stopCallback});
      });
    });
  }

  /**
   * getRandomNumber
   *
   * @description - It will return random rating.
   */
  private getRandomNumber() {
    return range(0, this.games.length).pipe(
      flatMap(i => of(i).pipe(delay(1000 + (Math.random() * 10000)))),
      repeat()
    );
  }

  /**
   * getRandomRatings
   *
   * @description - It will return random item from the list.
   */
  private getRandomRatings() {
    this.min = Math.ceil(this.min);
    this.max = Math.floor(this.max);
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  /**
   * sortData
   *
   * @description - It will sort data and return highest rated item to lowest rated item.
   */
  private sortData(data) {
    return data.sort((a, b) => {
      return b.rating - a.rating;
      });
  }
}
