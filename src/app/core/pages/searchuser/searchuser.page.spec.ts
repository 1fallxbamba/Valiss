import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchuserPage } from './searchuser.page';

describe('SearchuserPage', () => {
  let component: SearchuserPage;
  let fixture: ComponentFixture<SearchuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
