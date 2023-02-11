export interface Prospect {
    saveFlag: boolean;
    updateFlag: boolean;
    deleteFlag: boolean;
    getFlag: boolean;
    prospect_id: string;
    fse_angaza_id: string;
    agent_user_name: string;
    customer_name: string;
    status: string;
    customer_phone_number: string;
    customer_secondary_phone_number: string;
    customer_address: string;
    account_number: string;
    product_name: string;
    ticket_type: string;
    otp: string;
    unsuccessful_otp_attempts: string;
    installation_attempted: string;
    body: string;
    body_registration: string;
    latitude: string;
    longitude: string;
    checkin_accuracy: string;
    distance: string;
    area: string;
    is_otp_call_approved: string;
    country: string;
    reassignment_attempt: string;
  }