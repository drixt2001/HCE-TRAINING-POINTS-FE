import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ListNotifiactionsComponent } from "./list-notifiactions.component";

describe("ListNotifiactionsComponent", () => {
  let component: ListNotifiactionsComponent;
  let fixture: ComponentFixture<ListNotifiactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListNotifiactionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListNotifiactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
