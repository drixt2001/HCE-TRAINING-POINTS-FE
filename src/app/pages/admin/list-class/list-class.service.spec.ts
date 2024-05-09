import { TestBed } from "@angular/core/testing";

import { ListClassService } from "./list-class.service";

describe("ListClassService", () => {
  let service: ListClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListClassService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
