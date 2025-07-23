import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  private root!: am5.Root;
  ngAfterViewInit(): void {
    this.myViaChart();
    this.mysalesRequest();
    this.myLineChart();
    this.mysalesFunnel();
    this.mySalesticket();
  }

  myViaChart() {
    console.log('caleed');
    this.root = am5.Root.new('viaChart');
    if ((this.root as any)._logo) {
      (this.root as any)._logo.dispose();
    }
    var chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(50),
        centerY: am5.percent(90),
        y: am5.percent(90),
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: 'value',
        categoryField: 'sourceName',
        alignLabels: false,
        centerY: am5.percent(50),
        y: am5.percent(80),
        layout: this.root.horizontalLayout,
      })
    );

    series.data.setAll([
      { sourceName: 'Direct', value: 309 },
      { sourceName: 'Cross Sales', value: 97 },
      { sourceName: 'Portal Enquiry', value: 7 },
    ]);
    var legend = chart.children.push(
      am5.Legend.new(this.root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        y: am5.percent(10),
        marginTop: 15,
        marginBottom: 15,

        layout: this.root.horizontalLayout,
      })
    );
    series.slices.template.set('toggleKey', 'none');
    series.labels.template.set('forceHidden', true);
    series.ticks.template.set('forceHidden', true);
    series.labels.template.setAll({ text: '{value}', inside: true });
    series.slices.template.states.create('hover', { scale: 1 });

    legend.data.setAll(series.dataItems);
  }

  mysalesRequest() {
    this.root = am5.Root.new('salesRequest');
    if ((this.root as any)._logo) {
      (this.root as any)._logo.dispose();
    }
    var chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.horizontalLayout,
        innerRadius: am5.percent(50),
        width: 500,
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: 'count',
        categoryField: 'name',
        alignLabels: false,
      })
    );

    series.data.setAll([
      { name: 'Bronze', count: 18 },
      { name: 'Gold', count: 48 },
      { name: 'Silver', count: 94 },
      { name: 'Best Effort', count: 27 },
      { name: 'Platinum', count: 4 },
    ]);
    var legend = chart.children.push(
      am5.Legend.new(this.root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        x: am5.percent(80),
        marginTop: 45,
        marginBottom: 55,
        width: 200,
      })
    );

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    series.slices.template.set('toggleKey', 'none');
    series.labels.template.set('forceHidden', true);
    series.ticks.template.set('forceHidden', true);
    series.labels.template.setAll({ text: '{value}', inside: true });
    series.slices.template.states.create('hover', { scale: 1 });
    legend.data.setAll(series.dataItems);
  }

  myLineChart() {
    let root = am5.Root.new('myLineChart');

    (root as any)._logo.dispose();

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,

        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Data
    let data = [
      {
        name: 'High',
        value: 32,
      },
      {
        name: 'Moderate',
        value: 47,
      },
      {
        name: 'Low',
        value: 28,
      },
      {
        name: 'Extremly High',
        value: 10,
      },
      {
        name: 'Almost Lost',
        value: 2,
      },
    ];

    chart
      .get('colors')
      ?.set('colors', [
        am5.color(0x095256),
        am5.color(0x087f8c),
        am5.color(0x5aaa95),
        am5.color(0x86a873),
        am5.color(0xbb9f06),
      ]);
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'name',
        visible: false,
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,

          // minorGridEnabled: false
        }),
      })
    );

    yAxis.data.setAll(data);

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
          minGridDistance: 50,
        }),
        min: 0,
        visible: false,
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function createSeries(field: any, name: any) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: field,
          categoryYField: 'name',
          // sequencedInterpolation: true,
        })
      );

      series.columns.template.setAll({
        height: am5.p100,
        strokeOpacity: 0,
      });

      series.columns.template.adapters.add('fill', function (fill, target) {
        return chart.get('colors')?.getIndex(series.columns.indexOf(target));
      });

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: '{valueX}',
            populateText: true,
          }),
        });
      });

      series.data.setAll(data);
      series.appear();

      return series;
    }

    createSeries('value', 'name');
    // createSeries("expenses", "Expenses");
    xAxis.get('renderer').grid.template.set('visible', false);
    yAxis.get('renderer').grid.template.set('visible', false);

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

    let legendsRight = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(10),
        y: am5.percent(10),
        layout: this.root.verticalLayout,
        
      })
    );
    legendsRight.data.setAll(data);
  }

  mysalesFunnel() {
    let root = am5.Root.new('salesFunnel');
    if ((root as any)._logo) {
      (root as any)._logo.dispose();
    }

    let chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    let series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        width: 300,
        height: 200,
        centerX: am5.percent(50),
        x: am5.percent(50),
        alignLabels: false,
        orientation: 'vertical',
        valueField: 'count',
        categoryField: 'name',
        legendValueText: '{percentage}',
      })
    );

    let data: any[] = [
      {
        name: 'Lead',
        count: 413,
        percentage: '27%',
      },
      {
        name: 'Opportunity',
        count: 113,
        percentage: '76%',
      },
      {
        name: 'Quotation',
        count: 86,
        percentage: '58%',
      },
      {
        name: 'Order',
        count: 50,
        percentage: '0%',
      },
    ];

    series.data.setAll(data);
    series.labels.template.setAll({
      text: '{count}',
    });

    series.appear();

    let legendsLeft = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(10),
        x: am5.percent(0),

        centerY: am5.percent(60),
        y: am5.percent(30),
        layout: this.root.verticalLayout,
        nameField: 'name',
      })
    );

    let legendsRight = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(100),
        x: am5.percent(100),
        centerY: am5.percent(10),
        y: am5.percent(10),
        layout: this.root.verticalLayout,
        nameField: 'percentage',
      })
    );
    legendsLeft.data.setAll(data);
    legendsRight.data.setAll(data);
  }

  mySalesticket() {
    let root = am5.Root.new('salesTicket');
    if ((root as any)._logo) {
      (root as any)._logo.dispose();
    }

    var sales_ticket_per_owner = ([] = [
      {
        user_name: 'Tinku Sharma',
        total_ticket: 89,
      },
      {
        user_name: 'Vishal Mishra',
        total_ticket: 3,
      },
      {
        user_name: 'Pawna Kumare',
        total_ticket: 19,
      },
      {
        user_name: 'Shivank Tyagi',
        total_ticket: 36,
      },
      {
        user_name: 'Vikash Tiwari123',
        total_ticket: 6,
      },
      {
        user_name: 'Vikash Tiwari',
        total_ticket: 5,
      },
      {
        user_name: 'Ankit Tyagi',
        total_ticket: 90,
      },
    ]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    let xRenderer = am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 60,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        paddingTop: 40,
        categoryField: 'user_name',
        renderer: xRenderer,
      })
    );
    xAxis.get('renderer').grid.template.set('visible', false);
    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set('strokeDasharray', [3]);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: yRenderer,
        visible: false,
      })
    );
    yAxis.get('renderer').grid.template.set('visible', false);

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Income',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'total_ticket',
        categoryXField: 'user_name',
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
      })
    );
    series.columns.template.setAll({ width: am5.percent(30) }); // Sets width to 70% of cell

    // let circleTemplate = am5.Template.new({});

    series.data.setAll(sales_ticket_per_owner);
    xAxis.data.setAll(sales_ticket_per_owner);

    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineX.set('visible', false);
    cursor.lineY.set('visible', false);

    series.appear();
    chart.appear(1000, 100);
  }
}
