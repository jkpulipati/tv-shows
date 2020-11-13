export interface ShowModel {
    'id': number;
    'url': string;
    'name': string;
    'type': string;
    'language': string;
    'genres': Array<string>,
    'status': string;
    'runtime': number;
    'premiered': string;
    'officialSite': string;
    'schedule': {
    'time': '22:00';
    'days': [
    'Tuesday'
    ]
    };
    'rating': {
        'average': 8.9
    };
    'weight': 95;
    'network': {
        'id': 2;
        'name': 'CBS';
        'country': {
        'name': 'United States';
        'code': 'US';
        'timezone': 'America/New_York'
        }
    };
    'webChannel': null;
    'externals': {
    'tvrage': 28376;
    'thetvdb': 248742;
    'imdb': 'tt1839578'
    };
    'image': {
    'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg';
    'original': 'http://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg'
    };
    'summary': string;
    'updated': number;
    '_links': {
        'self': {
            'href': 'http://api.tvmaze.com/shows/2'
        };
        'previousepisode': {
            'href': 'http://api.tvmaze.com/episodes/659372'
        }
    };
}
