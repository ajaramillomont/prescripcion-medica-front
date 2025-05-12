import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent {
  slides = [
    { image: 'assets/images/pm03.jpg', alt: 'Imagen 2' },
    { image: 'assets/images/pm06.jpg', alt: 'Imagen 3' },
    { image: 'assets/images/pm07.jpg', alt: 'Imagen 4' },
  ];
  currentSlide = 0;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.currentSlide = 0; // fuerza a recalcular con layout ya renderizado
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
