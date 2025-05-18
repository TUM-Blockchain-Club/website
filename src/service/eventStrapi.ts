export interface Location {
    name: string;
    link: string;
}

export interface Event {
    name: string;
    picture: string;
    start_time: Date;
    end_time: Date;
    description: string;
    link: string;
    location: Location;
}