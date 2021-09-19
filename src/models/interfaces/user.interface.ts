export interface BaseUser {
    name: string;
    email: string;
    password: string;
    address: string;
    telephone: string;
}

export interface User extends BaseUser {
    id: number;
}

export interface Users {
    [key: number]: User
}