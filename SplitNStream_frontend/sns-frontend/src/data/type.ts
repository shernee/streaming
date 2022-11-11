export interface userShape {
    first_name: string;
    last_name: string;
    email: string;
}

export interface subscriptionShape {
    name: string;
    price: number;
}

export interface serviceShape {
    [key: string]: Array<subscriptionShape>
}