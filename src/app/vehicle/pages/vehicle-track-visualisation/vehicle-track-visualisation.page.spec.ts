import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleTrackVisualisationPage } from './vehicle-track-visualisation.page';

describe('VehicleTrackVisualisationPage', () => {
  let component: VehicleTrackVisualisationPage;
  let fixture: ComponentFixture<VehicleTrackVisualisationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTrackVisualisationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTrackVisualisationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
