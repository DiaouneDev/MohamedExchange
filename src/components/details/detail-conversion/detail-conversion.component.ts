import { Component, OnInit } from '@angular/core';
import { Devise } from '../../../models/devise.model';
import { ActivatedRoute } from '@angular/router';
import { DeviseService } from '../../../services/devise.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-conversion',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './detail-conversion.component.html',
  styleUrl: './detail-conversion.component.scss'
})
export class DetailConversionComponent implements OnInit {
  conversion?: Devise;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private deviseService: DeviseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deviseService.afficherConversions().subscribe(
        (conversions) => {
          this.conversion = conversions.find(c => c.id === id);
          if (!this.conversion) {
            this.errorMessage = 'Conversion non trouvée.';
          }
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la récupération des détails.';
          console.error(error);
        }
      );
    }
  }

  
}
