export interface IPlanningTableRowDTO {
    id: string;
    gradeId: string;
    gradeName: string;
    subjectId: string;
    subjectName: string;
    title: string;
    description: string | null;
    estimatedDuration: string | null;
    startDate: string | null;
    endDate: string | null;
    stateId: number;
}