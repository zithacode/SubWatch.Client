import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

@Component({
  selector: 'app-spending-chart',
  imports: [],
  templateUrl: './spending-chart.html',
  styleUrl: './spending-chart.css',
})
export class SpendingChart implements AfterViewInit, OnDestroy {
  @ViewChild('spendingCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    console.log('Canvas:', this.canvas.nativeElement);
    console.log(
      'Canvas dimensions:',
      this.canvas.nativeElement.clientWidth,
      this.canvas.nativeElement.clientHeight
    );

    this.createChart();
  }

  private createChart(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',

      data: {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],

        datasets: [
          {
            label: 'Monthly Spending',
            data: [1250, 1450, 1380, 1650, 1720, 1849],
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#4f46e5',
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            callbacks: {
              label: (context) =>
                `R${context.parsed.y?.toLocaleString('en-ZA')}`,
            },
          },
        },

        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f5f9',
            },
            ticks: {
              callback: (value) => `R${value}`,
            },
          },

          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
