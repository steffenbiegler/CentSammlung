import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private horizontalOrientation ? = true;
  @Input() private fromColor ? = 'red';
  @Input() private toColor ? = 'blue';
  @Input() private margin ?: any = { top: 20, bottom: 20, left: 100, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - (this.margin.top - this.margin.bottom) / 2;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top / 2})`);

    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>[this.fromColor, this.toColor]);

    if (this.horizontalOrientation) {
      const xDomain = this.data.map(data => data.getLabel());
      const yDomain = [0, d3.max(this.data, data => data.getValue())];
      this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
      this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
      this.xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
        .call(d3.axisBottom(this.xScale));
      this.yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3.axisLeft(this.yScale));
    } else {
      const xDomain = [0, d3.max(this.data, data => data.getValue())];
      const yDomain = this.data.map(data => data.getLabel());
      this.yScale = d3.scaleBand().padding(0.1).domain(yDomain).rangeRound([0, this.height]);
      this.xScale = d3.scaleLinear().domain(xDomain).range([0, this.width]);
      this.xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3.axisTop(this.xScale));
      this.yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3.axisLeft(this.yScale));
      }
    }

  updateChart() {
    if (this.horizontalOrientation) {
      this.xScale.domain(this.data.map(data => data.getLabel()));
      this.yScale.domain([0, d3.max(this.data, data => data.getValue())]);
      this.colors.domain([0, this.data.length]);
      this.xAxis.transition().call(d3.axisBottom(this.xScale));
      this.yAxis.transition().call(d3.axisLeft(this.yScale));

      const update = this.chart.selectAll('.bar').data(this.data);

      update.exit().remove();

      this.chart.selectAll('.bar').transition()
        .attr('x', data => this.xScale(data.getLabel()))
        .attr('y', data => this.yScale(data.getValue()))
        .attr('width', data => this.xScale.bandwidth())
        .attr('height', data => this.height - this.yScale(data.getValue()))
        .style('fill', (data, i) => this.colors(i));

      update
        .enter ()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', data => this.xScale(data.getLabel()))
        .attr('y', data => this.yScale(0))
        .attr('width', this.xScale.bandwidth())
        .attr('height', 0)
        .style('fill', (data, i) => this.colors(i))
        .transition()
        .delay((data, i) => i * 10)
        .attr('y', data => this.yScale(data.getValue()))
        .attr('height', data => this.height - this.yScale(data.getValue()));
      } else {

        this.xScale.domain([0, d3.max(this.data, data => data.getValue())]);
        this.yScale.domain(this.data.map(data => data.getLabel()));
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisTop(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));
        const update = this.chart.selectAll('.bar').data(this.data);

        update.exit().remove();

        this.chart.selectAll('.bar').transition()
          .attr('x', data => this.xScale(0))
          .attr('y', data => this.yScale(data.getLabel()))
          .attr('width',  data => this.xScale(data.getValue()))
          .attr('height', this.yScale.bandwidth())
          .style('fill', (data, i) => this.colors(i));

        update
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', data => this.xScale(0))
          .attr('y', data => this.yScale(data.getLabel()))
          .attr('width', 0)
          .attr('height', this.yScale.bandwidth())
          .style('fill', (data, i) => this.colors(i))
          .transition()
          .delay((data, i) => i * 10)
          .attr('width', data => this.xScale(data.getValue()));
    }

  }
}
