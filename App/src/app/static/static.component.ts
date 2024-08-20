import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit, OnDestroy {
  images = [
    { src: 'public/assets/slide1.jpg', text: 'Notizen einfach erstellen und bearbeiten' },
    { src: 'public/assets/slide2.jpg', text: 'Notizen schnell und effektiv suchen' },
    { src: 'public/assets/slide3.jpg', text: 'Erinnerungen und Fristen setzen' },
    { src: 'public/assets/slide4.jpg', text: 'Notizen synchronisieren über alle Geräte' }
  ];

  currentIndex: number = 0;
  slideInterval: any;

  constructor() { }

  ngOnInit() {
    this.startSliding();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSliding() {
    this.slideInterval = setInterval(() => {
      this.nextImage();
    }, 2000); 
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateTrackPosition();
  }

  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateTrackPosition();
  }

  updateTrackPosition() {
    const track = document.getElementById('image-track');
    if (track) {
      const imageWidth = (track.children[0] as HTMLElement).offsetWidth;
      const offset = -(this.currentIndex * imageWidth);
      track.style.transition = 'transform 0.5s ease-in-out';
      track.style.transform = `translateX(${offset}px)`;
    }
  }
}
