import React from 'react'

interface IProps {
    event: any
}

const CalendarAgendaEvent = ({ event }: IProps) => {
    // const { event } = props;
    const { start, end, title, resource } = event;
    const { type } = resource;

    const typeToClassName: any = {
        1: "bg-holidays",
        2: "bg-managment",
        3: "bg-meeting",
        4: "bg-social",
        9: "bg-others",
    };

    const className = typeToClassName[type] || "";

    return (
        <div className={`custom_event ${className}`}>
            {title}
        </div>
    );
}

export default CalendarAgendaEvent