import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraficasPage } from './graficas.page';

describe('GraficasPage', () => {
  let component: GraficasPage;
  let fixture: ComponentFixture<GraficasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
