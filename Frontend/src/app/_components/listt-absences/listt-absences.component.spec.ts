import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtAbsencesComponent } from './listt-absences.component';

describe('ListtAbsencesComponent', () => {
  let component: ListtAbsencesComponent;
  let fixture: ComponentFixture<ListtAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtAbsencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
