import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiNotizService } from '../Service/api-notiz.service';
import { Router } from '@angular/router';
import DOMPurify from 'dompurify';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'] // Fixed typo here
})
export class CreateComponent {
  // Formulargruppe zur Verwaltung der Eingaben für 'titel' und 'inhalt'
  notiz = new FormGroup({
    titel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9 ]*$')
    ]),
    inhalt: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
      Validators.pattern('^[a-zA-Z0-9,.! ]*$')
    ])// 'inhalt' Feld mit erforderlicher Validierung
  });
  submitted = false; // Variable, um den Einsende-Status zu verfolgen

  // Konstruktor, um den ApiNotizService und den Router zu injizieren
  constructor(private apiNotizService: ApiNotizService, private router: Router) { }

  // Methode zum Erstellen einer neuen Notiz
  createNotiz() {
    this.submitted = true; // Markiert das Formular als eingereicht
    if (this.notiz.valid) { // Überprüft, ob das Formular gültig ist
     // Erstellt ein neues Notizobjekt mit aktuellem Datum und Uhrzeit
      let newNotiz = {
        titel: DOMPurify.sanitize(this.notiz.value.titel ?? ''),
        inhalt: DOMPurify.sanitize(this.notiz.value.inhalt ?? ''),
        erstellungsdatum: new Date().toISOString() // Aktuelles Datum und Uhrzeit hinzufügen
      };

      // Ruft die API auf, um die neue Notiz zu erstellen
      this.apiNotizService.createNotiz(newNotiz).subscribe(
        () => {
          alert("Created"); 
          this.notiz.reset(); // Setzt das Formular zurück
          this.submitted = false; // Setzt den Einsende-Status zurück
          this.router.navigate(['/list']); 
        },
        error => {
          console.error('Error creating note:', error); // Gibt Fehler in der Konsole aus 
          alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'); // Informiert den Benutzer über den Fehler
          this.submitted = false; // Handhabt Fehler und setzt den Einsende-Status zurück
        }
      );
    }
  }
}