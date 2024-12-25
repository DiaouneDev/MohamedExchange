import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class TauxService {
  private apiKey = '46faeff4b6901d7ba68170d4'; // La clé de notre API
  private baseUrl = 'https://v6.exchangerate-api.com/v6'; // API de taux de conversion

  constructor(private http: HttpClient) {}

  // Récupérer les taux de conversion
  getTaux(base: string, cible: string): Observable<any> {
    const url = `https://api.allorigins.win/raw?url=https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${base}/${cible}`;
    
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Erreur API:', error);
        console.error('Réponse de l\'API:', error?.error || 'Pas de réponse');
        
        return throwError('Erreur lors de la récupération du taux de conversion');
      })
    );
  }

  getDevises(): Observable<any> {
    const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/codes`;
  
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des devises:', error);
        return throwError('Impossible de récupérer la liste des devises.');
      })
    );
  }
  

}
