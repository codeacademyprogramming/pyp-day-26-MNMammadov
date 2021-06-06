export interface IRoom {
    id: number;
    svgAttrs: {
        x: string;
        y: string;
        width: string;
        height: string;
    }
    reservations: IReservation[];
}

export interface IReservation {
    id: string;
    roomId: number;
    reservedBy: string;
    from: string; // Date
    to: string; // Date
    notes?: string;
}