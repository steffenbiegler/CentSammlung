import {  Component,  OnInit,  ViewChild,  ElementRef,  Input} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})

export class BubbleChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array < any > ;
  private colors;
  private columnwidht = 20;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  constructor() {}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.colors = d3.scaleOrdinal(
      [ 'Yellow', 'White', 'Red', 'Green', 'Orange', 'Salmon', 'Blue',  'Brown', 'Black', 'Grey',
       'CornflowerBlue',  'Crimson', 'GoldenRod ', 'Chartreuse', 'Fuchsia', 'Khaki', 'Chocolate', 'MidnightBlue', 'LightGrey',
       'Aqua', 'OrangeRed', 'Lime', 'MediumSeaGreen', 'Purple', 'DeepPink', 'Beige', 'BurlyWood', 'DarkSlateGrey', 'DimGrey']);
    const element = this.chartContainer.nativeElement;
    const circle = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .selectAll('circle')
      .data(this.data)
      .enter();
    const bubble = circle.append('circle')
      .attr('r',  1)
      .attr('fill', (d, i) => {
        return this.colors(d[0]);
      })
      .attr('stroke', '#333')
      .attr('transform', (data, index) => {
        const offsetX =  this.margin.left;
        const offsetY =  this.margin.top;
        return `translate(${offsetX}, ${offsetY})`;
      });
      bubble.transition()
      .delay((d, i) => i * 20)
      .attr('transform', (data, index) => {
        const offsetX = ((data[2] - 1995) * (10 + this.columnwidht)  + data[1] / 300) + this.margin.left;
        const offsetY = 2 * this.margin.top + data[1] / 3 ;
        return `translate(${offsetX}, ${offsetY})`;
      })
      .attr('r', data => (data[1] / 25));
      bubble.append('title').text((d) => d[0] + ' ' + d[2] + ':' + d[1]);
  }
}
