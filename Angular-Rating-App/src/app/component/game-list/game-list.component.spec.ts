import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameListComponent } from './game-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, Subscription } from 'rxjs';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let store: MockStore;
  const initialState = { game: { data: '' } };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GameListComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tabel on load with data', () => {
    //Arange
    const data = {
      game: {
        data: {
          data: [
            {
              id: '1',
              name: 'PUBG Mobile',
              rating: 5
            },
            {
              id: '2',
              name: 'Candy Crush Saga',
              rating: 1
            }]
        },
        callback: of()
      }
    };

    //Act
    store.setState(data);
    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('tr');

    // Assert
    expect(tableRows.length).toBe(3);

    // Header row
    const headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toContain('ID');
    expect(headerRow.cells[1].innerHTML).toContain('Name');

    // Data rows 1
    const row1 = tableRows[1];
    expect(row1.cells[0].innerHTML).toContain('1');
    expect(row1.cells[1].innerHTML).toContain('PUBG Mobile');

    // Data row 2
    const row2 = tableRows[2];
    expect(row2.cells[0].innerHTML).toContain('2');
    expect(row2.cells[1].innerHTML).toContain('Candy Crush Saga');

  });

  it('should change button label from START RANDOM RATING to STOP RANDOM RATING when user clicks on it', () => {
    // Arrange
    component.isStartRating = false;

    // Act
    const button = fixture.nativeElement.querySelector('.random-rating-btn');
    component.startRandomRating();
    fixture.detectChanges();
    // Assert
    expect(component.isStartRating).toBeTruthy();
    expect(button.innerHTML).toEqual(' STOP RANDOM RATING ');
  });

  it('should change button label from STOP RANDOM RATING to START RANDOM RATING when user clicks on it', () => {
    // Arrange
    component.isStartRating = true;

    // Act
    const button = fixture.nativeElement.querySelector('.random-rating-btn');
    component.ratingSubscription = new Subscription();
    component.startRandomRating();
    fixture.detectChanges();
    // Assert
    expect(component.isStartRating).toBeFalsy();
    expect(button.innerHTML).toEqual(' START RANDOM RATING ');
  });

});
