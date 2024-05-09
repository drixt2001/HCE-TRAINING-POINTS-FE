import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListAllFormComponent } from "./list-all-form.component";

describe("ListAllFormComponent", () => {
  let component: ListAllFormComponent;
  let fixture: ComponentFixture<ListAllFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAllFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAllFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
