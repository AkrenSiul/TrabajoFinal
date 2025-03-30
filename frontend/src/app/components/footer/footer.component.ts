import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
import {faTiktok} from '@fortawesome/free-brands-svg-icons/faTiktok';

@Component({
  selector: 'app-footer',
  imports: [
    FaIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  dateYear = new Date().getFullYear();
  protected readonly faFacebook = faFacebook;
  protected readonly faTwitter = faTwitter;
  protected readonly faInstagram = faInstagram;
  protected readonly faTiktok = faTiktok;
}
