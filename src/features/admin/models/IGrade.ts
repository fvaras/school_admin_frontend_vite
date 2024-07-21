export interface IGradeBaseDTO {
    name: string;
    contactEmail: string;
    contactPhone: string;
    capacity: number;
    description: string;
    active: boolean;
}

export interface IGradeForManipulationDTO extends IGradeBaseDTO {
    teachersId: string[];
}

export interface IGradeForCreationDTO extends IGradeForManipulationDTO {

}

export interface IGradeForUpdateDTO extends IGradeForManipulationDTO {

}

export interface IGradeDTO extends IGradeBaseDTO {
    id: string;
    createdAt: string;
    updatedAt: string | null;
}