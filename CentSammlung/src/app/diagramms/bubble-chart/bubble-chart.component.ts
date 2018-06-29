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
    if (this.data) {
      this.updateChart();
    }
  }

  createChart() {
    this.colors = d3.scaleOrdinal(
      ['Blue', 'Red', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Brown', 'Black', 'Grey',
       'CornflowerBlue',  'Crimson', 'GoldenRod ', 'Chartreuse', 'Fuchsia', 'Khaki', 'Chocolate', 'MidnightBlue', 'LightGrey',
       'Aqua', 'OrangeRed', 'Lime', 'MediumSeaGreen', 'Salmon', 'DeepPink', 'Beige', 'BurlyWood', 'DarkSlateGrey', 'DimGrey']);
    const element = this.chartContainer.nativeElement;
    const reverseOffset = d3.max(this.data, d => d[1] / 20 + d[1] / 300) + this.margin.top;
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
        const offsetY =  reverseOffset;
        return `translate(${offsetX}, ${offsetY})`;
      });
      bubble.transition()
      .delay((d, i) => i * 100)
      .attr('transform', (data, index) => {
        const offsetX = ((data[2] - 1999) * (10 + this.columnwidht)  + data[1] / 300) + this.margin.left;
        const offsetY =  reverseOffset - data[1] / 20 ;
        return `translate(${offsetX}, ${offsetY})`;
      })
      .attr('r', data => (data[1] / 250));
      bubble.append('title').text((d) => d[0] + ' ' + d[2] + ':' + d[1]);

    /*circle.append('text')
    .text((d) => d[0] + ' ' + d[2])
    .attr('font-size', (data) => data[1])
    .attr('transform', (data, index) => {
      const offsetX = (data[2] - 1999 + this.columnwidht) * 15 - 100 - (data[1] * 2);
      const offsetY = data[1] * 10;
      return `translate(${offsetX}, ${offsetY})`;
    });*/
  }

  updateChart() {}


}
