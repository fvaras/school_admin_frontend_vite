export interface IPlanningBaseDTO {
    subjectId: string;
    title: string;
    description?: string;
    expectedLearning?: string;
    contents?: string;
    activities?: string;
    resources?: string;
    evaluationPlan?: string;
    estimatedDuration?: { ticks: number };
}

export interface IPlanningForCreationDTO extends IPlanningBaseDTO {

}

export interface IPlanningForUpdateDTO extends IPlanningBaseDTO {
    id: string;
}

export interface IPlanningDTO extends IPlanningBaseDTO {
    id: string;
}

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

export interface PlanningWithTimeBlocksForUpdateDTO extends IPlanningForUpdateDTO {
    timeBlockId: string;
    originalPlanningId: string;
    date: string;
}