import * as moment from "moment";
describe("period spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/noti");
    cy.get('[routerlink="/login"]').click();
    cy.get("#mat-input-0").type("ctsv@hce.edu.vn");
    cy.get("#mat-input-1").type("123456");
    cy.get("#login-btn").click();
    cy.get(
      '[nzicon="appstore"] > .ant-menu-submenu-title > .ant-menu-submenu-arrow',
    ).click();
    cy.get('[routerlink="/admin/periods"]').click();
  });

  it("should redirect to Period Page after login success", () => {
    cy.url().should("include", "/admin/periods");
  });

  it("should render table data by default API", () => {
    cy.get(".ant-table-tbody > :nth-child(1) > :nth-child(1)").should(
      "be.visible",
    );
  });

  it("should redirect to Form Page when click button View List Form", () => {
    cy.get(":nth-child(1) > :nth-child(5) > .flex > .ant-btn-primary").click();
    cy.url().should("include", "/admin/listform");
  });

  it("should click button to create period", () => {
    cy.get(".create-bar > .ant-btn").click();

    cy.get(".ant-modal-title > .ng-star-inserted").should(
      "have.text",
      "Tạo kỳ tổ chức",
    );

    cy.get(".ant-input").type("Kỳ học " + Date.now());

    cy.get(".ant-form-item-control-input-content > .ng-tns-c184-6").click();
    cy.get(".ng-tns-c184-6 > .ant-picker-input > .ng-pristine").type(
      moment(Date.now()).format("DD/MM/YYYY"),
    );
    cy.get(".ant-modal-title > .ng-star-inserted").click();

    cy.get(".ant-form-item-control-input-content > .ng-tns-c184-8").click();
    cy.get(".ng-tns-c184-8 > .ant-picker-input > .ng-pristine").type(
      moment(Date.now() + 86400000).format("DD/MM/YYYY"),
    );
    cy.get(".ant-modal-title > .ng-star-inserted").click();

    cy.get(".ant-modal-footer > .ant-btn-primary").click();

    cy.get(".ant-message-notice-content").should("be.visible");

    cy.wait(2000);
    cy.get(".ant-table-tbody > :nth-child(1) > :nth-child(5)")
      .get(".ant-btn-dangerous")
      .click();

    cy.get(".ant-popover-buttons > .ant-btn-primary").click();
  });

  it("should click button to update period", () => {
    cy.get(
      ':nth-child(1) > :nth-child(5) > .flex > [nztype="default"]',
    ).click();

    cy.get(".ant-modal-title > .ng-star-inserted").should(
      "have.text",
      "Cập nhật",
    );

    cy.get(".ant-form-item-control-input-content > .ng-tns-c184-6").click();
    cy.get(".ant-modal-title > .ng-star-inserted").click();

    cy.get(".ant-form-item-control-input-content > .ng-tns-c184-8").click();
    cy.get(".ant-modal-title > .ng-star-inserted").click();

    cy.get(".ant-modal-footer > .ant-btn-primary").click();

    cy.get(".ant-message-notice-content").should("be.visible");

    cy.wait(2000);
  });
});
