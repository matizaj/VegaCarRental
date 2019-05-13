export interface Vehicle {
    id: number;
    model: {id: number, name: string };
    make: {id: number, name: string };
    isRegistered: boolean;
    features: any[];
    contact: Contact;
}
export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    features: Array<number>;
    contact: Contact;
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}
