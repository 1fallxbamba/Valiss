import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendvalissPage } from './sendvaliss.page';

describe('SendvalissPage', () => {
  let component: SendvalissPage;
  let fixture: ComponentFixture<SendvalissPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendvalissPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendvalissPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
