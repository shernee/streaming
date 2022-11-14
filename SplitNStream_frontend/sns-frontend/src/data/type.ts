interface userGroupShape {
    group: number;
    subscription: string;
}

export interface userShape {
    first_name: string;
    last_name: string;
    email: string;
    Formation?: Array<userGroupShape>;
    Formed?: Array<userGroupShape>;
    Verified?: Array<userGroupShape>;
}

interface subscriptionShape {
    subscription_id: number;
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