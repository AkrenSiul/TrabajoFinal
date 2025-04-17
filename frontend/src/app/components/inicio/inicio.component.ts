import {Component, inject} from '@angular/core';
import {TestServiceService} from '../../services/test-service.service';
import {FakeProducstInterface} from '../../common/fake-producst-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Agents} from '../../common/agent-interface-test';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inicio',
  imports: [
    NgbCarousel,
    NgbSlide
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private readonly productService: TestServiceService = inject(TestServiceService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group(
    {

    }
  )
  products: FakeProducstInterface[] = [];
  agents: Agents[] = [];
  intervalSec = 2000;

  constructor() {
    this.getProducts();
    this.getAgents();
  }


  getProducts() {
    this.productService.getProducts().subscribe(
      {
        next: product => {
          this.products = product;
        },
        error: err => {
          console.log(err.message);
        },
        complete: () => {
          console.log('Products get')
    }
      }
    )
  }

  getAgents() {
    this.productService.getAgents().subscribe(
      {
        next: agent =>  {
          this.agents = agent.data;
        }
      }
    );
  }



}
