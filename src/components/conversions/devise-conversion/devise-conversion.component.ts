import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DeviseService } from '../../../services/devise.service';
import { TauxService } from '../../../services/taux.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Devise } from '../../../models/devise.model';

@Component({
  selector: 'app-devise-conversion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './devise-conversion.component.html',
  styleUrls: ['./devise-conversion.component.scss']
})
export class DeviseConversionComponent implements OnInit {
  conversionForm!: FormGroup;
  isSaving = false;
  resultat: number | null = null;
  errorMessage: string = '';
  devises: string[] = []; // Tableaux toutes les devises disponibles
  filtreDevisesBase: string[] = []; // Liste filtrée pour la devise source
  filtreDevisesCible: string[] = []; // Liste filtrée pour la devise cible

  deviseService = inject(DeviseService);
  tauxService = inject(TauxService);

  ngOnInit(): void {
    this.initConversionForm();
  
    // Charger les devises
    this.tauxService.getDevises().subscribe({
      next: (data) => {
        console.log('Devises récupérées:', data);
        if (data && data.supported_codes) {
          this.devises = data.supported_codes.map((codeArray: any) => codeArray[0]);
          console.log('Codes de devises extraits:', this.devises);
  
          // Initialisation des listes filtrées
          this.filtreDevisesBase = [...this.devises];
          this.filtreDevisesCible = [...this.devises];

          // Filtrage initial si des valeurs existent déjà dans le formulaire
          this.filtreDevisesBase = this.filtrerDevises(this.conversionForm.get('base')?.value || '');
          this.filtreDevisesCible = this.filtrerDevises(this.conversionForm.get('cible')?.value || '');
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors de la récupération des devises.';
      },
    });
  
    // Réinitialiser le résultat dès qu'une modification est détectée
    this.conversionForm.valueChanges.subscribe(() => {
      this.resultat = null;
    
      if (this.devises.length > 0) {
        const base = this.conversionForm.get('base')?.value || null;
        const cible = this.conversionForm.get('cible')?.value || null;
    
        // Filtre les listes de manière indépendante
        this.filtreDevisesBase = this.filtrerDevises(cible); 
        this.filtreDevisesCible = this.filtrerDevises(base); 
      }
    });
    
  }
  

  // Méthode pour filtrer les devises
  filtrerDevises(selection: string | null): string[] {
    if (!selection) {
      return [...this.devises]; // Affiche toutes les devises si rien n'est sélectionné
    }
    return this.devises.filter(devise => devise !== selection);
  }

  initConversionForm(): void {
    this.conversionForm = new FormGroup({
      base: new FormControl('', Validators.required),
      cible: new FormControl('', Validators.required),
      montantBase: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  AjouterConversion(): void {
    if (this.conversionForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }
  
    const { base, cible, montantBase } = this.conversionForm.getRawValue();
  
    if (base === cible) {
      this.errorMessage = "La devise source et cible ne peuvent pas être identiques.";
      return;
    }
  
    // Réinitialisation avant la conversion
    this.isSaving = true;
    this.errorMessage = '';
    this.resultat = null;
  
    this.tauxService.getTaux(base, cible).subscribe({
      next: (data) => {
        if (data && data.conversion_rate) {
          const taux = data.conversion_rate;
          this.resultat = montantBase * taux;
  
          const conversion: Devise = {
            base,
            cible,
            montantBase,
            montantConverti: this.resultat,
            date: new Date(),
          };
  
          this.deviseService.ajouterConversion(conversion).subscribe({
            complete: () => {
              this.isSaving = false;
              alert('Conversion sauvegardée avec succès !');
            },
            error: () => {
              this.isSaving = false;
              this.errorMessage = "Erreur lors de l'enregistrement de la conversion.";
            },
          });
        } else {
          this.isSaving = false;
          this.errorMessage = "Erreur lors de la récupération du taux de conversion.";
        }
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = "Erreur lors de la récupération du taux de conversion.";
      },
    });
  }
}
