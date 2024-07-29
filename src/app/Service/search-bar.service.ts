import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  constructor() { }

  search(notes: any[], searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    return notes.filter(note => 
      note.titel.toLowerCase().includes(searchTerm) || 
      note.inhalt.toLowerCase().includes(searchTerm)
    );
  }
}

