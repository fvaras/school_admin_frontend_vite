export interface AuthInfoDTO {
    user: UserInfoDTO;
    token: string;
}

export interface TokenInfoDTO {
    username: string;
    profileId: number;
}

export interface UserInfoDTO {
    userName: string;
    rut: string;
    firstName: string;
    lastName: string;
    email: string;
    profileId: number;
}