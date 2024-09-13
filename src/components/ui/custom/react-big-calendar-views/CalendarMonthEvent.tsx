interface IProps {
    event: any
}

const CalendarMonthEvent = ({ event }: IProps) => {
    // const { event } = props;
    const { title, resource } = event;
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

export default CalendarMonthEvent