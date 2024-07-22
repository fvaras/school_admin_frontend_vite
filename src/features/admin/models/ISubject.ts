export interface ISubjectBaseDTO {
    name: string;
    color: string | null;
    gradeId: string;
    teacherId: string;
    stateId: number;
}

export interface ISubjectForCreationDTO extends ISubjectBaseDTO {

}

export interface ISubjectForUpdateDTO extends ISubjectBaseDTO {

}

export interface ISubjectDTO extends ISubjectBaseDTO {
    id: string;
}

export interface ISubjectTableRowDTO {
    id: string;
    name: string;
    stateId: number;
    gradeId: string;
    gradeName: string;
    teacherId: string;
    teacherName: string;
}