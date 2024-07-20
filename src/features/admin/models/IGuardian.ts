import { IUserDTO, IUserForCreationDTO } from "./IUser";

export interface IGuardianBaseDTO {
    relation: string;
    stateId: number;
}

export interface IGuardianForCreationDTO extends IGuardianBaseDTO {
    user: IUserForCreationDTO;
}

export interface IGuardianForUpdateDTO extends IGuardianBaseDTO {

}

export interface IGuardianDTO extends IGuardianBaseDTO {
    id: string;
    stateId: number;
    createdAt: string;
    updatedAt: string | null;
    user: IUserDTO;
}

export interface IGuardianTableRowDTO {
    id: string;
    userName: string;
    userId: string;
    rut: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string | null;
    stateId: number;
    relation: string;
}