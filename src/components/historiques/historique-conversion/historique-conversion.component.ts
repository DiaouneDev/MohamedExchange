import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';
import { Devise } from '../../../models/devise.model';
import { DeviseService } from '../../../services/devise.service';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-historique-conversion',
  standalone: true,
  imports: [RouterModule, DatePipe, CommonModule],
  templateUrl: './historique-conversion.component.html',
  styleUrls: ['./historique-conversion.component.scss']
})
export class HistoriqueConversionsComponent implements OnInit {
  conversions: Devise[] = [];
  errorMessage: string = '';

  constructor(
    private deviseService: DeviseService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.getHistoriqueConversions();
  }

  getHistoriqueConversions(): void {
    this.deviseService.afficherConversions().subscribe({
      next: (data) => {
        this.conversions = data.map((conversion) => ({
          ...conversion,
          date: new Date(conversion.date) // Convertir la date en objet Date
        }));
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la récupération de l\'historique des conversions.';
        console.error(err);
      }
    });
  }

  supprimerConversion(id: string | undefined): void {
    if (id) {  // Vérifier si l'ID est défini
      if (confirm('Êtes-vous sûr de vouloir supprimer cette conversion ?')) {
        this.deviseService.supprimerConversion(id).subscribe({
          next: () => {
            this.conversions = this.conversions.filter(conversion => conversion.id !== id); // Supprimer de la liste locale
            alert('Conversion supprimée avec succès!');
          },
          error: (err) => {
            this.errorMessage = 'Erreur lors de la suppression de la conversion.';
            console.error(err);
          }
        });
      }
    } else {
      console.error('ID de la conversion est indéfini');
    }
  }

  voirDetailsConversion(id: string | undefined): void {
    if (id) {  // Vérifier que l'ID existe
      this.router.navigate(['/detail', id]); // Naviguer vers `/detail/:id`
    } else {
      console.error('ID de la conversion est indéfini');
    }
  }
  
}
