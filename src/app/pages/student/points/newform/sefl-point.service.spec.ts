import { TestBed } from "@angular/core/testing";

import { SeflPointService } from "./sefl-point.service";

describe("SeflPointService", () => {
  let service: SeflPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeflPointService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
