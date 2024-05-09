import { TestBed } from "@angular/core/testing";

import { ListPeriodsService } from "./list-periods.service";

describe("ListPeriodsService", () => {
  let service: ListPeriodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPeriodsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
