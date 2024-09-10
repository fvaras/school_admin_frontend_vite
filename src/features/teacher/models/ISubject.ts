export interface ISubjectBaseDTO {
    name: string;
    color: string | null;
    gradeId: string;
    teacherId: string;
    stateId: number;
}

export interface ISubjectDTO extends ISubjectBaseDTO {
    id: string;
}