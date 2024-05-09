import { TestBed } from "@angular/core/testing";

import { ListAccountsService } from "./list-accounts.service";

describe("ListAccountsService", () => {
  let service: ListAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAccountsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
