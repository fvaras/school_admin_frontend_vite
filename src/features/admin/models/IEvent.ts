export interface ICalendarEventBaseDTO {
    title: string;
    startDate: Date;
    endDate: Date;
    type: number;
    details: string;
    stateId: number;
    calendarId: string;
}

export interface ICalendarEventForCreationDTO extends ICalendarEventBaseDTO {
    startISODate: string;
    endISODate: string;
}

export interface ICalendarEventForUpdateDTO extends ICalendarEventBaseDTO {
    startISODate: string;
    endISODate: string;
}

export interface ICalendarEventDTO extends ICalendarEventBaseDTO {
    id: string;
}