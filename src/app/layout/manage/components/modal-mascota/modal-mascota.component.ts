import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dog } from '../../model/dog/dog';
import { Chart, registerables } from 'node_modules/chart.js';
import { ReportService } from '../../services/report/report.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreedService } from '../../services/breed/breed.service';
import { DogService } from '../../services/dog/dog.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import { Report } from '../../model/report/report';
import Swal from 'sweetalert2';
Chart.register(...registerables);
Chart.register(zoomPlugin);

@Component({
  selector: 'app-modal-mascota',
  templateUrl: './modal-mascota.component.html',
  styleUrls: ['./modal-mascota.component.css']
})
export class ModalMascotaComponent implements OnInit {

  selectedIndex: number = 0;
  titleProjectModal = "Información de la mascota"
  dog: Dog = new Dog();
  report: Report = new Report();
  graficoEcg: Chart;
  graficoEcg2: Chart;
  graficoFc: Chart;
  graficoFc2: Chart;
  breedList: any = [];

  ecgSelectedBreedId: string = "";
  ecgSelectedDogId: string = "0";
  dogListByBreed: any[] = [];
  
  primeraIteracionEcg = true;
  primeraIteracionFc = true;

  nuevaIndicacion: string = "";

  constructor(
    private reportService: ReportService,
    private breedService: BreedService,
    private dogService: DogService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.dog= this.data['dog'];
    this.ecgSelectedBreedId = this.dog.breed_id;
    this.llenarReporte();
    this.getBreeds();
    this.getDogsByBreedId();
  }

  llenarReporte() {
    if (sessionStorage.getItem('User') !== null) {
      this.report.veterinarian_id = JSON.parse(sessionStorage.getItem('User')).id;
    }
    this.report.dog_id = this.dog.id;
    this.report.owner_id = this.dog.owner_id;
  }

  getBreeds() {
    this.breedService.getBreeds().subscribe({
      next: (response) => {
        this.breedList = response;
      }
    })
  }

  getDogsByBreedId() {
    this.dogService.getDogsByBreedId(this.ecgSelectedBreedId).subscribe({
      next: (response) => {
        if(response.success) {
          if(response.items != null) {
            this.dogListByBreed = response.items;
          }
        }
      }
    })
  }


  tabChanged(event: any): void {
    if (event.index === 1) {
      if(this.primeraIteracionEcg) {
        this.RenderChartEcg();
        this.obtenerDatosECG();
        this.primeraIteracionEcg = false;
      }
    }
    if(event.index === 2) {
      if(this.primeraIteracionFc) {
        this.RenderChartFc();
        this.obtenerDatosFc();
        this.primeraIteracionFc = false;
      }
    }
  }

  async obtenerDatosECG() {
    var dogId = this.dog.id;
    this.spinner.show('SpinnerProject');
    this.reportService.getEcgData(dogId).subscribe({
      next: (response) => {
        if(response != null) {
          this.actualizarDataEcg(response);
        }
        this.spinner.hide('SpinnerProject');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide('SpinnerProject');
      }
    })
  }

  async obtenerDatosFc() {
    var dogId = this.dog.id;
    this.spinner.show('SpinnerProject');
    this.reportService.getPulseData(dogId).subscribe({
      next: (response) => {
        if(response != null) {
          this.actualizarDataFc(response);
        }
        this.spinner.hide('SpinnerProject');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide('SpinnerProject');
      }
    })
  }

  actualizarDataEcg(dataArr) {
    let timeLabel = [];
    let timeData = [];

    if(dataArr.length > 15000){
      dataArr = dataArr.slice(-15000);
    }

    for(let i = 0; i < dataArr.length; i++) {
      timeLabel.push(dataArr[i].timestamp);
      timeData.push(dataArr[i].value)
    }

    // Actualizar grafico
    this.graficoEcg.data.labels.pop();
    this.graficoEcg.data.labels = timeLabel;
    this.graficoEcg.data.datasets[0].data = timeData;
    this.graficoEcg.update();

  }

  actualizarDataEcgComparacion(dataArr) {
    let timeLabel = [];
    let timeData = [];
    if(dataArr.length > 15000){
      dataArr = dataArr.slice(-15000);
    }
    for(let i = 0; i < dataArr.length; i++) {
      timeLabel.push(dataArr[i].timestamp);
      timeData.push(dataArr[i].value)
    }

    // Actualizar grafico
    this.graficoEcg2.data.labels.pop();
    this.graficoEcg2.data.labels = timeLabel;
    this.graficoEcg2.data.datasets[0].data = timeData;
    this.graficoEcg2.update();

  }

  actualizarDataFc(dataArr) {
    let timeLabel = [];
    let timeData = [];
    let timeAvg = [];
    let minuteData = {};

    for(let i = 0; i < dataArr.length; i++) {
      let createdTime = new Date(dataArr[i].created_time);
      createdTime.setSeconds(0);
      createdTime.setMilliseconds(0);
      let minuteKey = `${createdTime.getHours()}:${createdTime.getMinutes()}`;
      if (!minuteData[minuteKey]) {
        minuteData[minuteKey] = { total: 0, count: 0 };
      }
      minuteData[minuteKey].total += dataArr[i].beats_per_minute;
      minuteData[minuteKey].count++;
      minuteData[minuteKey].date = createdTime;
    }

    // Calcular el promedio de latidos por minuto
    const averageBeatsPerMinute = [];
    for (const minuteKey in minuteData) {
      let average = minuteData[minuteKey].total / minuteData[minuteKey].count;
      averageBeatsPerMinute.push({ minute: minuteKey, average, date: minuteData[minuteKey].date });
    }
    
    let total = 0;

    for(let i = 0 ; i < averageBeatsPerMinute.length; i ++) {
      let averageWithTwoDecimals = Number(averageBeatsPerMinute[i].average.toFixed(2));
      timeData.push(averageWithTwoDecimals);
      timeLabel.push(averageBeatsPerMinute[i].date);
      total += averageBeatsPerMinute[i].average;
      let promedio = Number((total / (i + 1)).toFixed(2));
      timeAvg.push(promedio);
    }

    
    this.graficoFc.data.labels.pop();
    this.graficoFc.data.labels = timeLabel;
    this.graficoFc.data.datasets[0].data = timeData;
    this.graficoFc.data.datasets[1].data = timeAvg;
    this.graficoFc.update();
  }

  actualizarDataFcComparacion(dataArr) {
    let timeLabel = [];
    let timeData = [];
    let timeAvg = [];
    let minuteData = {};

    for(let i = 0; i < dataArr.length; i++) {
      let createdTime = new Date(dataArr[i].created_time);
      createdTime.setSeconds(0);
      createdTime.setMilliseconds(0);
      let minuteKey = `${createdTime.getHours()}:${createdTime.getMinutes()}`;
      if (!minuteData[minuteKey]) {
        minuteData[minuteKey] = { total: 0, count: 0 };
      }
      minuteData[minuteKey].total += dataArr[i].beats_per_minute;
      minuteData[minuteKey].count++;
      minuteData[minuteKey].date = createdTime;
    }

    // Calcular el promedio de latidos por minuto
    const averageBeatsPerMinute = [];
    for (const minuteKey in minuteData) {
      let average = minuteData[minuteKey].total / minuteData[minuteKey].count;
      averageBeatsPerMinute.push({ minute: minuteKey, average, date: minuteData[minuteKey].date });
    }
    
    let total = 0;

    for(let i = 0 ; i < averageBeatsPerMinute.length; i ++) {
      let averageWithTwoDecimals = Number(averageBeatsPerMinute[i].average.toFixed(2));
      timeData.push(averageWithTwoDecimals);
      timeLabel.push(averageBeatsPerMinute[i].date);
      total += averageBeatsPerMinute[i].average;
      let promedio = Number((total / (i + 1)).toFixed(2));
      timeAvg.push(promedio);
    }

    
    this.graficoFc2.data.labels.pop();
    this.graficoFc2.data.labels = timeLabel;
    this.graficoFc2.data.datasets[0].data = timeData;
    this.graficoFc2.data.datasets[1].data = timeAvg;
    this.graficoFc2.update();

  }

  RenderChartEcg() {
    this.graficoEcg = new Chart("linechartEcg", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'ECG',
            data: [],
            borderWidth: 1,
            pointRadius: 1, 
            borderColor: "#41cfe3", // Establece el color de los bordes
            backgroundColor: ["#41cfe3"]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Electrocardiograma'
          },
          legend: {
            position: 'bottom'
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              mode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
              callback: (value, index, values) => {
                return value + 'ms'; // Formato de etiqueta en milisegundos
              }
            }
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });


    this.graficoEcg2 = new Chart("linechartEcg2", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'ECG',
            data: [],
            borderWidth: 1,
            pointRadius: 1, 
            borderColor: "#41cfe3", // Establece el color de los bordes
            backgroundColor: ["#41cfe3"]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Electrocardiograma'
          },
          legend: {
            position: 'bottom'
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              mode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
              callback: (value, index, values) => {
                return value + 'ms'; // Formato de etiqueta en milisegundos
              }
            }
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  RenderChartFc() {
    this.graficoFc = new Chart("linechartFc", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'F. Cardíaca',
            data: [],
            borderWidth: 2,
            pointRadius: 5, 
            borderColor: "#41cfe3",
            backgroundColor: ["#41cfe3"],
            datalabels: {
              color: '#41cfe3',
            },
          },
          {
            label: 'Promedio F.C.',
            data: [],
            borderWidth: 2,
            pointRadius: 3, 
            borderColor: "#e24a3f",
            backgroundColor: ["#e24a3f"],
            datalabels: {
              color: '#e24a3f', 
            },
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Frecuencia Cardíaca (lat/min)'
          },
          legend: {
            position: 'bottom'
          },
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end'
          },
        },
        scales: {
          x: {
            type: 'time', // Indica que el eje X es de tipo tiempo
            time: {
              unit: 'minute',
              displayFormats: {
                hour: 'HH:mm', // Formato de hora:minuto
              },
            },
            position: 'bottom',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
      plugins: [ChartDataLabels] 
    });

    this.graficoFc2 = new Chart("linechartFc2", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'F. Cardíaca',
            data: [],
            borderWidth: 2,
            pointRadius: 5, 
            borderColor: "#41cfe3",
            backgroundColor: ["#41cfe3"],
            datalabels: {
              color: '#41cfe3',
            },
          },
          {
            label: 'Promedio F.C.',
            data: [],
            borderWidth: 2,
            pointRadius: 3, 
            borderColor: "#e24a3f",
            backgroundColor: ["#e24a3f"],
            datalabels: {
              color: '#e24a3f', 
            },
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Frecuencia Cardíaca (lat/min)'
          },
          legend: {
            position: 'bottom'
          },
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end'
          },
        },
        scales: {
          x: {
            type: 'time', // Indica que el eje X es de tipo tiempo
            time: {
              unit: 'minute',
              displayFormats: {
                hour: 'HH:mm', // Formato de hora:minuto
              },
            },
            position: 'bottom',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
      plugins: [ChartDataLabels] 
    });
  }

  CompararEcg() {
    this.spinner.show('SpinnerProject');
    this.reportService.getEcgData(this.ecgSelectedDogId).subscribe({
      next: (response) => {
        console.log(response);
        if(response != null) {
          this.actualizarDataEcgComparacion(response);
        }
        this.spinner.hide('SpinnerProject');
      },
      error: (err) => {
        this.spinner.hide('SpinnerProject');
      }
    })
  }

  CompararFc() {
    this.spinner.show('SpinnerProject');
    this.reportService.getPulseData(this.ecgSelectedDogId).subscribe({
      next: (response) => {
        if(response != null) {
          this.actualizarDataFcComparacion(response);
        }
        this.spinner.hide('SpinnerProject');
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide('SpinnerProject');
      }
    })
  }

  addIndication() {
    let indicacion = this.nuevaIndicacion;
    this.report.indications.push(indicacion);
    this.nuevaIndicacion = "";
  }

  removeIndication(index: number) {
    this.report.indications.splice(index, 1);
  }

  createReport() {
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    this.report.created_date = timestamp;

    this.spinner.show('SpinnerProject');
    this.reportService.postReport(this.report).subscribe({
      next: (response) => {
        this.spinner.hide('SpinnerProject');
        if(response.success) {
          this.report.indications = [];
          this.report.description = "";
          Swal.fire({
            icon: 'success',
            title: 'Reporte Creado.',
          });
        }
      },
      error: (err) => {
        this.spinner.hide('SpinnerProject');
      }
    })
  }

}
