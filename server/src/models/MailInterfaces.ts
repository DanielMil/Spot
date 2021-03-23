export interface MailObject {
    from: string | undefined;
    to: string;
    subject: string;
    text: string;
}

export interface MailResponseObject {
    message: string;
    redirectURL: string;
    resetPasswordToken: string;
}
