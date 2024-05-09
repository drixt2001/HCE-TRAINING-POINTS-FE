import { TestBed } from "@angular/core/testing";

import { ListStatusService } from "./list-status.service";

describe("ListStatusService", () => {
  let service: ListStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListStatusService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
