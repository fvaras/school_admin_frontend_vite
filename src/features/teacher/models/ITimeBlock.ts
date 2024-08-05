export interface ITimeBlockBaseDTO {
    year: number | null;
    day: number;
    start: string;
    end: string;
    isRecess: boolean;
    blockName: string;
    color: string | null;
    subjectId: string | null;
}

export interface ITimeBlockForCreationDTO extends ITimeBlockBaseDTO {
    gradeId: string | null;
}

export interface ITimeBlockForUpdateDTO extends ITimeBlockBaseDTO {

}

export interface ITimeBlockDTO extends ITimeBlockBaseDTO {
    id: string;
    gradeId: string | null;
}

export interface ITimeBlockTableRowDTO {
    id: string;
    year: number;
    day: number;
    start: string;
    end: string;
    isRecess: boolean;
    blockName: string;
    color: string | null;
    gradeId: string;
    subjectId: string | null;
}