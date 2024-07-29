export interface IHomeworkBaseDTO {
    title: string;
    description: string;
    endsAt: Date;
    stateId: number;
    subjectId: string;
}

export interface IHomeworkForCreationDTO extends IHomeworkBaseDTO {

}

export interface IHomeworkForUpdateDTO extends IHomeworkBaseDTO {
    id: string;
}

export interface IHomeworkDTO extends IHomeworkBaseDTO {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IHomeworkTableRowDTO {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    endsAt: string;
    stateId: number;
    subjectId: string;
    subjectName: string;
    gradeId: string;
    gradeName: string;
}