// import _ from 'lodash'
import { format } from 'date-fns'

export const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('es-CL', {
        minimumFractionDigits: 0,
    }).format(number);
};

// export const formatChileanAmount = (amount: number): string => {
//     const formattedAmount = new Intl.NumberFormat('es-CL', {
//         style: 'currency',
//         currency: 'CLP',
//         minimumFractionDigits: 0,
//     }).format(amount);

//     return _.replace(formattedAmount, '$', '$ ');
// };

export const formatDateTime = (dateString: string, outputFormat: string = 'yyyy-MM-dd HH:mm:ss'): string => {
    const date = new Date(dateString);
    return format(date, outputFormat);
};

export const formatDate = (dateString: string, outputFormat: string = 'yyyy-MM-dd'): string => {
    return formatDateTime(dateString, outputFormat);
};

export const formatDateType = (date: Date, outputFormat: string = 'yyyy-MM-dd'): string => {
    return format(date, outputFormat);
};

export const formatTime = (dateString: string, outputFormat: string = 'HH:mm:ss'): string => {
    return formatDateTime(dateString, outputFormat);
};

export const formatNumberToString = (num: number): string => {
    const formattedNumber = num.toFixed(0);
    return formattedNumber.replace(/,/g, '');
}

export const combineDateAndTime = (date?: Date, time?: string): Date | undefined => {
    if (!date || !time) return undefined;
    const [hours, minutes] = time.split(':').map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes);
    return combinedDate;
};