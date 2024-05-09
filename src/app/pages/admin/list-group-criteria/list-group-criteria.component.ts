import { AfterViewInit, Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ListGroupCriteriaService } from "./list-group-criteria.service";

@Component({
  selector: "app-list-group-criteria",
  templateUrl: "./list-group-criteria.component.html",
  styleUrls: ["./list-group-criteria.component.sass"],
})
export class ListGroupCriteriaComponent implements OnInit, AfterViewInit {
  Columns: any[] = [
    {
      col: "id",
      label: "STT",
    },
    { col: "title", label: "Nhóm tiêu chí" },
  ];

  displayedColumns: string[] = this.Columns.map((cols) => {
    return cols.col;
  });

  dataSource = new MatTableDataSource<GroupCriteria>();
  listGroup: GroupCriteria[] = [];
  constructor(private service: ListGroupCriteriaService) {}

  ngAfterViewInit(): void {
    this.service.getLists().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.listGroup = res.data;
    });
  }

  ngOnInit(): void {}
}

export interface GroupCriteria {
  id: number;
  title: string;
}
