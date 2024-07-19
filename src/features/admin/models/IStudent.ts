import { IUserDTO, IUserForCreationDTO } from "./IUser";

export interface IStudentBaseDTO {
    bloodGroup: string;
    allergies: string;
    joiningDate: string | null;
    stateId: number;
    gradeId: number | null;
    guardian1Id: number;
    guardian2Id: number;
}

export interface IStudentForCreationDTO extends IStudentBaseDTO {
    user: IUserForCreationDTO;
}

export interface IStudentForUpdateDTO extends IStudentBaseDTO {

}

export interface IStudentDTO extends IStudentBaseDTO {
    id: number;
    createdAt: string;
    updatedAt: string | null;
    user: IUserDTO;
}

export interface IStudentTableRowDTO {
    id: number;
    userName: string;
    userId: string;
    rut: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: number;
    birthDate: string | null;
    bloodGroup: string;
    allergies: string;
    joiningDate: string | null;
    stateId: number;
    gradeId: number;
    gradeName: string;
}