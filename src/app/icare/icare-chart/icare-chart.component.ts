import { Component, OnInit } from '@angular/core';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
@Component({
  selector: 'app-icare-chart',
  imports: [],
  templateUrl: './icare-chart.component.html',
  styleUrl: './icare-chart.component.scss',
})
export class IcareChartComponent implements OnInit {
  ngOnInit(): void {
    this.myPulseRateChart();
    this.bloodPressure();
    this.OxygenSaturation();
    this.weighChart();
  }
  bloodPressure() {
    // Create root and chart
    var root = am5.Root.new('bloodPressure');
    (root as any)._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);
    let tooltip = am5.Tooltip.new(root, {});

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        height: 350,
        width: am5.percent(100),
        layout: root.horizontalLayout,
        tooltip: tooltip,
      })
    );

    // Define data
    var data = [
      {
        category: 'Monday',
        date: '02-05-2012',
        value1: 1000,
      },
      {
        category: 'Tuesday',
        date: '02-05-2012',
        value1: 1200,
      },
      {
        category: 'Wednesday',
        date: '02-05-2012',
        value1: 850,
      },
      {
        category: 'Thursday',
        date: '02-05-2012',
        value1: 1000,
      },
      {
        category: 'Friday',
        date: '02-05-2012',
        value1: 1200,
      },
      {
        category: 'Saturday',
        date: '02-05-2012',
        value1: 700,
      },
      {
        category: 'Sunday',
        date: '02-05-2012',
        value1: 1000,
      },
    ];

    // Craete Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    yAxis.get('renderer').grid.template.setAll({
      width: am5.percent(95),
    });
    // Create X-Axis
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.2,
        centerY: am5.percent(0),
        y: am5.percent(100),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 10,
        }),
        categoryField: 'category',
      })
    );
    xAxis.data.setAll(data);
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value1',
        categoryXField: 'category',
        centerY: am5.percent(20),
        y: am5.percent(20),
        // tooltip: am5.Tooltip.new(root, {}),
      })
    );

    series1.data.setAll(data);
    series1.columns.template.setAll({
      width: am5.percent(10),
      cornerRadiusTL: 50,
      cornerRadiusTR: 50,
      cornerRadiusBL: 50,
      cornerRadiusBR: 50,
    });

    series1.columns.template.setAll({
      tooltipHTML: `
      <div style="text-align: center; padding: 0px;">
       <h4 style="margin: 0px;">{date}</h3>
        <p >{categoryX}</h3>
        <p>Value: <b>{valueY}</b></p>
      </div>
    `,
    });

    xAxis.get('renderer').grid.template.set('visible', false);
    var legend = chart.children.push(am5.Legend.new(root, {}));
    // legend.data.setAll(chart.series.values);
  }

  myPulseRateChart() {
    // Replace DateAxis with CategoryAxis
    var root = am5.Root.new('pulseRateChart');
    (root as any)._logo.dispose();

    var xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });
    var chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        height: 110,
        centerY: am5.percent(0),
        y: am5.percent(20),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Y Axis remains same
    var yRenderer = am5xy.AxisRendererY.new(root, {});
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
        height: 270,
      })
    );
    yAxis.get('renderer').grid.template.setAll({
      width: am5.percent(95),
    });
    // Update LineSeries config
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        height: 230,
        valueYField: 'value1',
        categoryXField: 'category',
        seriesTooltipTarget: 'bullet',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
        stroke: am5.color('#845EC2'),
      })
    );
    xAxis.get('renderer').grid.template.set('visible', false);


    series.bullets.push(function (root, series) {
      let bullet = am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get('stroke'),
        }),
      });
      return bullet;
    });

    // Set Data
    var data = [
      { category: 'Mon', value1: 8.9 },
      { category: 'Tue', value1: 80.01 },
      { category: 'Wed', value1: 18.23 },
      { category: 'Thr', value1: 70.25 },
      { category: 'Fri', value1: 65.25 },
      { category: 'Sat', value1: 160.0 },
      { category: 'Sun', value1: 10.0 },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);
    series.strokes.template?.setAll({
      tooltipHTML: `
      <div style="text-align: center; padding: 0px;">
       <h4 style="margin: 0px;">{date}</h3>
        <p >{categoryX}</h3>
        <p>Value: <b>{valueY}</b></p>
      </div>
    `,
    });

    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
        xAxis: xAxis,
      })
    );
    cursor.lineY.set('visible', false);
  }

  OxygenSaturation() {
    var root = am5.Root.new('OxygenSaturation');
    (root as any)._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        height: 300,
        layout: root.horizontalLayout,
      })
    );

    // Define data
    var data = [
      {
        category: 'Mon',
        value1: 300,
      },
      {
        category: 'Tue',
        value1: 250,
      },
      {
        category: 'Wed',
        value1: 200,
      },
      {
        category: 'Thr',
        value1: 150,
      },
      {
        category: 'Fri',
        value1: 100,
      },
      {
        category: 'Sat',
        value1: 50,
      },
      {
        category: 'Sun',
        value1: 50,
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
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.2,
        centerY: am5.percent(0),
        y: am5.percent(100),
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 10,
        }),
        categoryField: 'category',
      })
    );
    xAxis.data.setAll(data);
    var series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value1',
        categoryXField: 'category',

      })
    );

    series1.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors')?.getIndex(series1.columns.indexOf(target));
    });

    series1.data.setAll(data);
    series1.columns.template.setAll({
      width: am5.percent(50),
      tooltipText: '{categoryX}: {valueY}',
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
    });
    yAxis.get('renderer').grid.template.setAll({
      width: am5.percent(95),
    });
    xAxis.get('renderer').grid.template.set('visible', false);
    // var legend = chart.children.push(am5.Legend.new(root, {}));
    // legend.data.setAll(chart.series.values);
  }
  weighChart() {
    // Replace DateAxis with CategoryAxis
    var root = am5.Root.new('weightChart');
    (root as any)._logo.dispose();

    var xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });
    var chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        height: 120,
        centerY: am5.percent(0),
        y: am5.percent(10),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Y Axis remains same
    var yRenderer = am5xy.AxisRendererY.new(root, {});
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
        height: 230,
      })
    );

    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value1',
        categoryXField: 'category',
        seriesTooltipTarget: 'bullet',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
        stroke: am5.color('#845EC2'),
      })
    );
    xAxis.get('renderer').grid.template.set('visible', false);
    series.bullets.push(function (root, series) {
      let bullet = am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get('stroke'),
        }),
      });
      return bullet;
    });
    yAxis.get('renderer').grid.template.setAll({
      width: am5.percent(95),
    });

    var data = [
      { category: 'Mon', value1: 8.9 },
      { category: 'Tue', value1: 80.01 },
      { category: 'Wed', value1: 18.23 },
      { category: 'Thr', value1: 70.25 },
      { category: 'Fri', value1: 65.25 },
      { category: 'Sat', value1: 160.0 },
      { category: 'Sun', value1: 55.0 },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    let tooltip = am5.Tooltip.new(root, {});


    series.set("tooltip", tooltip);

    tooltip.label.set("text", "{category}: {value1}");

    let cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
        xAxis: xAxis,
      })
    );
    cursor.lineY.set('visible', false);
  }
}
