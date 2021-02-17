import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestvalissPage } from './requestvaliss.page';

describe('RequestvalissPage', () => {
  let component: RequestvalissPage;
  let fixture: ComponentFixture<RequestvalissPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestvalissPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestvalissPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
