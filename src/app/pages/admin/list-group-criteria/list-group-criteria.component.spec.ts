import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListGroupCriteriaComponent } from "./list-group-criteria.component";

describe("ListGroupCriteriaComponent", () => {
  let component: ListGroupCriteriaComponent;
  let fixture: ComponentFixture<ListGroupCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListGroupCriteriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGroupCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
