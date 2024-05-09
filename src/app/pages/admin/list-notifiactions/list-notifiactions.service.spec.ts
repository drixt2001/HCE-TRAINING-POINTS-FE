import { TestBed } from "@angular/core/testing";

import { ListNotifiactionsService } from "./list-notifiactions.service";

describe("ListNotifiactionsService", () => {
  let service: ListNotifiactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListNotifiactionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
