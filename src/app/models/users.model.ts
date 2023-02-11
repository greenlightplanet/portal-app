export interface User {
    saveFlag: boolean;
    updateFlag: boolean;
    deleteFlag: boolean;
    getFlag: boolean;
    email: string;
    login_type: string;
    password: string;
    name: string;
    phone: string;
    role: string;
    country: string;
    zone: string;
    region: string;
    area: string;
    territory: string;
    super_user: string;
    latitude: string;
    longitude: string;
}