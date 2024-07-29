import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiNotizService } from '../Service/api-notiz.service';
import { FormGroup, FormControl } from '@angular/forms';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loadingTime = 0;
  loadingTimer: any;

  notiz: any = {};
  notizId: number = 0;
  isUpdating: boolean = false;
  updateForm: FormGroup = new FormGroup({
    titel: new FormControl(''),
    inhalt: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private apiNotizService: ApiNotizService,
    private router: Router
  ) {}

  // Lädt die Notizdaten basierend auf der ID und initialisiert das Formular
  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.notizId = +params['notizId'];
      if (this.notizId) {
        this.apiNotizService.getNotiz(this.notizId).subscribe(notiz => {
          this.notiz = notiz;
          this.isLoading = false;
          this.updateForm.patchValue(notiz);
        }, error => {
          console.error('Fehler beim Abrufen der Notiz:', error);
          this.isLoading = false;
        });
      } else {
        this.notiz = {};
        this.isLoading = false;
      }
    });

    this.loadingTimer = setInterval(() => {
      this.loadingTime += 1000; // Zeitmessung für Ladeaktivitäten
    }, 1000);
  }

  // Aktiviert den Aktualisierungsmodus
  updateNotiz() {
    this.isUpdating = true;
  }

  // Speichert die aktualisierte Notiz
  saveNotiz() {
    if (this.updateForm.valid) {
      // Sanitisiert die Eingabewerte
      const sanitizedTitel = DOMPurify.sanitize(this.updateForm.value.titel);
      const sanitizedInhalt = DOMPurify.sanitize(this.updateForm.value.inhalt);

      const updatedNotiz = {
        ...this.notiz,
        titel: sanitizedTitel,
        inhalt: sanitizedInhalt
      };

      this.apiNotizService.updateNotiz(updatedNotiz).subscribe(
        () => {
          alert('Notiz aktualisiert!');
          this.isUpdating = false;
          this.ngOnInit(); // Lädt die Notizdaten neu
        },
        error => {
          console.error('Fehler beim Aktualisieren der Notiz:', error);
          this.isUpdating = false;
        }
      );
    }
  }

  // Löscht die Notiz und navigiert zur Liste
  deleteNotiz(id: number) {
    this.apiNotizService.deleteNotiz(id).subscribe(
      () => {
        alert('Notiz gelöscht!');
        this.router.navigate(['/list']);
      },
      error => {
        console.error('Fehler beim Löschen der Notiz:', error);
      }
    );
  }

  // Stoppt den Timer beim Verlassen der Komponente
  ngOnDestroy(): void {
    clearInterval(this.loadingTimer);
  }
}
