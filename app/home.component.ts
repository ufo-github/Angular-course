import { Component, OnInit } from '@angular/core';
import { Ad } from './shared/ad';
import { Event, exampleEvent } from './shared/event';
import { UniverseService } from './shared/universe.service';

@Component({
    template: require('./home.template.html'),
    styles: [require('./home.style.css')],
    providers: [UniverseService]
})
export class HomeComponent implements OnInit {
    constructor (private universe: UniverseService) {
    }

    ngOnInit() {
        this.loadEvents();
    }

    loadEvents() {
        this.universe.getTodayEvents().then(events => this.events = events);
        this.universe.getFutureEvents().then(events => {
            this.moreEvents = events;
        });
    }

    getAdAtIndex(i: number): Ad {
        if (!this.hasAdAtIndex(i)) {
            return null;
        }
        return {
            title: 'Sponsored Event',
            image_url: '/assets/images/ad-150x150.png',
            url: 'http://localhost:3000/events'
        }
    }

    hasAdAtIndex(i: number): boolean {
        return i % 3 === 0;
    }

    private events: any[];
    private moreEvents: any[];
    private ads: any[];
};