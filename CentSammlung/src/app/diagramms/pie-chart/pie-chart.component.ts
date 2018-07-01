import {  Component,  OnInit,  ViewChild,  ElementRef,  Input} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array < any > ;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private svg: any;
  private width: number;
  private height: number;
  private radius: number;

  constructor() {}

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .data([this.data]).append('g')
      .attr('class', 'pie')
      .attr('transform', `translate(${element.offsetWidth / 2}, ${element.offsetHeight / 2})`);
    this.radius = Math.min(this.width, this.height) / 2;
  }

  updateChart() {
    const innerRadius = this.radius * 0.2;
    const outerRadius = this.radius * 0.8;
    const pie = d3.pie().value(d => d[1]);
    const path = d3.arc().outerRadius( outerRadius ).innerRadius(innerRadius);
    const label = d3.arc().outerRadius( this.radius ).innerRadius(outerRadius);
    const pieColor = d3.scaleOrdinal(d3.schemeSet1);

    const arc = this.svg.selectAll('.arc')
            .data(pie(this.data))
            .enter()
            .append('g')
            .attr('class', 'arc');


    arc.append('path')
    .attr('d', path)
    .attr('fill', function (d, i) {
        return pieColor(i);
    });

    arc.append('text')
       .attr('transform', (datum: any) => {
                return 'translate(' + label.centroid(datum) + ')';
        })
        .text((datum, _index) => {
          console.log(datum);
          if (datum.startAngle <= 6) { return datum.data[0]; }
          return '';
        })
        .style('text-anchor', 'middle');
  }
}
