import { TestBed } from "@angular/core/testing";

import { ListGroupCriteriaService } from "./list-group-criteria.service";

describe("ListGroupCriteriaService", () => {
  let service: ListGroupCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListGroupCriteriaService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
