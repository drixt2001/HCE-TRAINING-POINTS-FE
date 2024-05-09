import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NzTabPosition } from "ng-zorro-antd/tabs";
import Chart from "chart.js/auto";
import { ReportService } from "./report.service";
import * as Utils from "./utils";
@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.sass"],
})
export class ReportComponent implements OnInit, AfterViewInit {
  constructor(private reportService: ReportService) {}
  ngAfterViewInit(): void {
    // this.createChart();
  }
  public chart: any;
  public barChart: any;

  data: any[] = [];
  selectedIndex = 0;
  nzTabPosition: NzTabPosition = "right";
  async ngOnInit() {
    await this.getReportPie();
  }

  getReportPie() {
    this.reportService.getReportPie().subscribe((res) => {
      const value = res.data;
      this.data = [
        value.xuatsac,
        value.gioi,
        value.kha,
        value.trungbinh,
        value.yeu,
        value.kem,
      ];
      this.createChart();
      // this.createBarChart();
    });
  }

  getReportBar() {
    this.reportService.getReportBar().subscribe((res) => {
      const value = res.data;
      console.log(value);
      // this.data = [
      //   value.xuatsac,
      //   value.gioi,
      //   value.kha,
      //   value.trungbinh,
      //   value.yeu,
      //   value.kem,
      // ];
      // this.createChart();
      const label = value.map((value: any) => value.title);
      const data = value.map((value: any) => value.count);
      this.createBarChart(label, data);
    });
  }

  createChart() {
    this.chart = new Chart("KQRL", {
      type: "doughnut",
      options: {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            fullSize: true,
          },
        },
      },

      data: {
        labels: ["Xuất sắc", "Giỏi", "Khá", "Trung Bình", "Yếu", "Kém"],
        datasets: [
          {
            label: "Số lượng",
            data: this.data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "#00897b",
              "#546e7a",
              "#9e9e9e",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }

  createBarChart(label: [], data: []) {
    this.barChart = new Chart("HocKy", {
      type: "bar",
      options: {
        indexAxis: "y",
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },

      data: {
        labels: label,
        datasets: [
          {
            label: "Số lượng phiếu đã công bố",
            data: data,
            borderColor: Utils.CHART_COLORS.red,
            // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            borderWidth: 2,
            borderSkipped: false,
          },
        ],
      },
    });
  }

  log(args: any): void {
    console.log(args.index);
    if (!this.chart) this.getReportPie();
    if (!this.barChart) this.getReportBar();
  }
}
