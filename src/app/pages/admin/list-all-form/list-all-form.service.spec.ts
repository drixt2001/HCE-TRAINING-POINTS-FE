import { TestBed } from "@angular/core/testing";

import { ListAllFormService } from "./list-all-form.service";

describe("ListAllFormService", () => {
  let service: ListAllFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAllFormService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
