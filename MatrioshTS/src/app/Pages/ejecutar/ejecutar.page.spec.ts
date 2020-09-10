import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EjecutarPage } from './ejecutar.page';

describe('EjecutarPage', () => {
  let component: EjecutarPage;
  let fixture: ComponentFixture<EjecutarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjecutarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EjecutarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
