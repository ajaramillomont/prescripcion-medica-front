import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroComponent } from "../../components/hero/hero.component";
import { CarruselComponent } from "../../components/carrusel/carrusel.component";
import { ServiceCardsComponent } from "../../components/service-cards/service-cards.component";
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";
import { AboutUsComponent } from "../../components/about-us/about-us.component";
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
            HeroComponent,
            CarruselComponent,
            ServiceCardsComponent,
            TestimonialsComponent,
            AboutUsComponent,
            ContactFormComponent,
            FooterComponent,
            RouterModule
          ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
  goLogin() {
    this.router.navigate(['/login']); // Cuando hagamos login irá aquí
  }



}
