import { TestBed } from "@angular/core/testing";

import { ListCriteriaService } from "./list-criteria.service";

describe("ListCriteriaService", () => {
  let service: ListCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCriteriaService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
