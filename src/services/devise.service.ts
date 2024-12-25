
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devise } from '../models/devise.model';

@Injectable({
  providedIn: 'root',
})
export class DeviseService {
  private apiUrl = 'http://localhost:3000/devises'; // URL du backend JSON-Server

  constructor(private http: HttpClient) {}

  // Ajouter une conversion
  ajouterConversion(conversion: Devise): Observable<Devise> {
    return this.http.post<Devise>(this.apiUrl, conversion);
  }

  // Récupérer l'historique des conversions
  afficherConversions(): Observable<Devise[]> {
    return this.http.get<Devise[]>(this.apiUrl);
  }

  // Supprimer une conversion
  supprimerConversion(id: string): Observable<void> { // id est maintenant un string
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
