export interface User {
    id: string;
    email: string;
    fullName?: string;
    imageUrl?: string;
    name?: string;
    image?: string;
}

export interface Message {
    id: string;
    role: any;
    content: string;
    timestamp: string;
}

export interface Version {
    id: string;
    timestamp: string;
    code: string;
}