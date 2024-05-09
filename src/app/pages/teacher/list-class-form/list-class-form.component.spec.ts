import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassFormComponent } from './list-class-form.component';

describe('ListClassFormComponent', () => {
  let component: ListClassFormComponent;
  let fixture: ComponentFixture<ListClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClassFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
