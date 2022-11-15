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

interface groupDetailsShape {
    
    group_id: number;
    subscription_name: string;
    service_name: string;
    subscription_price: number;
    max_members_allowed:number;
    current_members: Array<userGroupShape>;
    group_stage: string;
    price_per_member:number;
    is_member: boolean;
    user_id: number;
}

export interface groupdetailsShape {

    [key: string]: Array<groupDetailsShape>
}