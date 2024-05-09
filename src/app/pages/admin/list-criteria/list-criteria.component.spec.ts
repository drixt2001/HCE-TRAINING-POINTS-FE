import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListCriteriaComponent } from "./list-criteria.component";

describe("ListCriteriaComponent", () => {
  let component: ListCriteriaComponent;
  let fixture: ComponentFixture<ListCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCriteriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
