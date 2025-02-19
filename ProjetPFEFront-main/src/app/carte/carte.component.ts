
import { WeatherService } from './service/weather.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-carte',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './carte.component.html',
  styleUrl: './carte.component.css'
})
export class CarteComponent implements AfterViewInit {
  weatherData: any;
  townName: string = '';
  showTown: boolean = false;

  constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    const regions = this.el.nativeElement.querySelectorAll('.region');
    regions.forEach((region: HTMLElement) => {
      this.renderer.listen(region, 'mouseover', () => {
        const town = region.getAttribute('data-name');
        if (town) {
          this.fetchWeather(town);
          this.townName = town;
          this.showTown = true;
        }
      });
      this.renderer.listen(region, 'mouseout', () => {
        this.showTown = false;
      });
    });

    this.renderer.listen(document, 'mousemove', (event: MouseEvent) => {
      const winWidth = window.innerWidth;
      const townElement = this.el.nativeElement.querySelector('.town');
      if (townElement) {
        if (event.pageX < winWidth / 2) {
          townElement.classList.remove('right');
          townElement.classList.add('left');
          this.renderer.setStyle(townElement, 'top', `${event.pageY - 65}px`);
          this.renderer.setStyle(townElement, 'left', `${event.pageX - 202}px`);
        } else {
          townElement.classList.add('right');
          townElement.classList.remove('left');
          this.renderer.setStyle(townElement, 'top', `${event.pageY - 65}px`);
          this.renderer.setStyle(townElement, 'left', `${event.pageX + 100}px`);
        }
      }
    });
  }

  fetchWeather(town: string): void {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=63fc3d9a6be2d5f85a3a754d1c9835e8&units=metric`;
    this.http.get(url).subscribe((data: any) => {
      this.weatherData = {
        name: data.name,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        humidity: data.main.humidity,
        wind: `${data.wind.speed} km/h`,
        temperature: `${data.main.temp} °C`
      };
      localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
    });
  }
}
