import { InjectionToken } from '@angular/core';

export const API_CONFIG = {
    SHOWS: '/shows',
    SHOW_EPISODE_LIST: '/shows/:id/episodes',
    SHOW_SEASONS: '/shows/:id/seasons',
    SHOW_CAST: '/shows/:id/cast',
    SHOW_CREW: '/shows/:id/crew',
    SHOW_IMAGES: '/shows/:id/images',
    CREW_CAST_SEASON_DETAILS: '?embed[]=seasons&embed[]=cast&embed[]=crew'
};


export const API_CONFIG_TOKEN = new InjectionToken<typeof API_CONFIG>('api.config');
