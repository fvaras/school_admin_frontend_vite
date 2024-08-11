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