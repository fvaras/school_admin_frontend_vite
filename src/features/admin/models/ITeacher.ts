import { IUserDTO, IUserForCreationDTO } from "./IUser";

export interface ITeacherBaseDTO {
    contactEmail: string;
    contactPhone: string;
    education: string;
    stateId: number;
}

export interface ITeacherForCreationDTO extends ITeacherBaseDTO {
    user: IUserForCreationDTO;
}

export interface ITeacherForUpdateDTO extends ITeacherBaseDTO {

}

export interface ITeacherDTO extends ITeacherBaseDTO {
    id: string;
    createdAt: string;
    updatedAt: string | null;
    user: IUserDTO;
}

export interface ITeacherTableRowDTO {
    id: string;
    userName: string;
    userId: string;
    rut: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: number;
    contactEmail: string;
    contactPhone: string;
    birthDate: string | null;
    education: string;
    stateId: number;
}