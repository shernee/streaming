export interface userGroupShape {
    group_id: number;
    group_name: string;
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

export interface groupListDetailsShape {
    group_id: number;
    group_name: string;
    max_members: number;
    current_num_members: number;
    stage: string;
    user_member: boolean;
}

export interface groupListShape {
    all_groups: Array<groupListDetailsShape>
}

export interface groupDetailMembersShape {
    username: string;
    paid: boolean;
}

export interface groupDetailShape {
    group_id: number;
    group_name: string;
    subscription_name: string;
    service_name: string;
    subscription_price: number;
    max_members_allowed:number;
    current_members: Array<groupDetailMembersShape>;
    group_stage: string;
    price_per_member:number;
    is_member: boolean;
    user_id: number;
    user_paid: boolean;
    subscription_email: string;
    subscription_password: string;
}

export interface SignUpShape {
    username : string,
    first_name: string,
    last_name: string,
    email : string,
    password : string,
 }

 export interface paymentCardShape {
    card_number : number,
    user_name: string,
    card_expiry: string,
    card_cvc : number,
    card_issuer : string,
 }

 export enum GroupStage {
    Formation = "Waiting for Members",
    Formed = "Payment in Progress",
    Verified = "Subscribed",
 }