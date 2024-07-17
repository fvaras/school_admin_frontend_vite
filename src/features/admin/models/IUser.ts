export interface IUser {
    id: number
    createdAt?: Date
    updatedAt?: Date
    userName: string
    rut: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    gender: number
    birthDate: Date
    stateId: number
}

export interface IUserBaseDTO {
    userName: string;
    rut: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: number;
    birthDate: string | null;
    stateId: number;
}

export interface IUserForCreationDTO extends IUserBaseDTO {
    password: string;
}

export interface IUserForUpdateDTO extends IUserBaseDTO {

}

export interface IUserDTO extends IUserBaseDTO {
    id: number;
    createdAt: string;
    updatedAt: string | null;
}