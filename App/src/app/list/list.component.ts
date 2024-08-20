import { Component, OnInit, HostListener } from '@angular/core';
import { ApiNotizService } from '../Service/api-notiz.service';
import { SearchBarService } from '../Service/search-bar.service';
import { Router } from '@angular/router';
import DOMPurify from 'dompurify';


interface Notiz {
  id: number;
  titel: string;
  erstellungsdatum?: string; 
  inhalt: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  notizen: Notiz[] = [];
  isLoading: boolean = false;
  filteredNotizen: Notiz[] = [];
  searchTerm: string = '';
  selectedNoteId: number | null = null;


  currentSort: 'titel' | 'erstellungsdatum' = 'titel'; // Standardmäßig nach Titel sortieren



  constructor(
    private apiNotizService: ApiNotizService,
    private searchBarService: SearchBarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.apiNotizService.getNotizen().subscribe({
      next: (data: any) => {
        if (data?.['hydra:member'] && Array.isArray(data['hydra:member'])) {
          this.notizen = data['hydra:member'] as Notiz[];
          this.filteredNotizen = this.notizen; // Initialisiere filteredNotizen mit der vollständigen Liste
          console.log('Notizen abgerufen:', this.notizen); // Zeigt die abgerufenen Notizen an
          this.sortNotizen(); // Sortiere Notizen nach dem Abrufen
        } else {
          console.warn('Unerwartetes Datenformat:', data);
          this.notizen = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Notizen:', error);
        this.isLoading = false; // Stellt sicher, dass der Ladevorgang im Fehlerfall gestoppt wird
      }
    });
  }

  // Methode zum Sortieren der Notizen
  sortNotizen() {
    console.log('Sortiere Notizen nach:', this.currentSort); // Zeigt die Sortierkriterien an

    if (this.currentSort === 'titel') {
      this.notizen.sort((a: Notiz, b: Notiz) => {
        const titleA = a.titel ?? ''; // Standardmäßig auf leeren String setzen, wenn Titel null/undefiniert ist
        const titleB = b.titel ?? ''; // Standardmäßig auf leeren String setzen, wenn Titel null/undefiniert ist
        return titleA.localeCompare(titleB);
      });
    } else if (this.currentSort === 'erstellungsdatum') {
      this.notizen.sort((a: Notiz, b: Notiz) => {
        const dateA = this.parseDate(a.erstellungsdatum);
        const dateB = this.parseDate(b.erstellungsdatum);

        console.log('Datum A:', dateA, 'Datum B:', dateB); // Zeigt die geparsten Daten an

        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime(); // Aufsteigend sortieren
        } else if (dateA) {
          return -1; // Notizen mit Datum vor Notizen ohne Datum platzieren
        } else if (dateB) {
          return 1; // Notizen mit Datum nach Notizen ohne Datum platzieren
        } else {
          return 0; // Beide fehlen
        }
      });
    }
  }

  // Methode zum Parsen eines Datumsstrings in ein Date-Objekt
  parseDate(dateStr?: string): Date | null {
    if (!dateStr) {
      return null; // Gibt null zurück, wenn der Datumstring fehlt oder ungültig ist
    }

    // Konvertiert den Datumstring in ein Date-Objekt
    return new Date(dateStr);
  }

  // Methode zum Ändern der Sortierkriterien
  changeSorting(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSort = selectElement.value as 'titel' | 'erstellungsdatum';
    this.sortNotizen();
  }

  // Methode zur Suche
  search(searchTerm: string) {
    // Reinigt den Suchbegriff von HTML-Tags und unsicheren Inhalten
    this.searchTerm = DOMPurify.sanitize(searchTerm.trim());
    if (!this.searchTerm) {
      this.filteredNotizen = [];
      return;
    }
    this.filteredNotizen = this.searchBarService.search(this.notizen, this.searchTerm);
  }

  // Methode zum Entfernen von HTML-Tags aus der Eingabe
  stripTags(input: string): string {
    return input.replace(/<\/?[^>]+(>|$)/g, '');
  }

  // Methode zur Verarbeitung des Formulars
  handleFormSubmit(event: Event, searchInput: HTMLInputElement) {
    event.preventDefault();
    if (this.selectedNoteId !== null) {
      this.router.navigate(['/read', this.selectedNoteId]);
    }
  }

  // Methode zur Verarbeitung von Klicks auf Optionen
  handleOptionClick(noteId: number) {
    this.selectedNoteId = noteId;
  }

  // HostListener zum Schließen der Dropdown-Liste bei Klick außerhalb
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.searchTerm = ''; // Löscht den Suchbegriff, um das Dropdown zu schließen
    }
  }
}
