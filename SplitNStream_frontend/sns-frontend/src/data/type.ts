export interface userShape {
    first_name: string;
    last_name: string;
    email: string;
}

interface subscriptionShape {
    name: string;
    price: number;
}

export interface serviceShape {
    [key: string]: Array<subscriptionShape>
}

interface groupListDetailsShape {
    group: number;
    max_members: number;
    current_num_members: number;
}

export interface groupListShape {
    [key: string]: Array<groupListDetailsShape>
}