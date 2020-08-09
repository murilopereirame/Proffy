export function convertHourToMinute(time: string) {
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour*60) + minutes;

    return timeInMinutes;
}

export function convertMinuteToHoursString(time: number) {
    const hours = parseInt((time/60).toString());
    const minutes = parseInt((time%60).toString());

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function whichDayIsIt(day: number) {
    switch(day) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Segunda';
        case 2:
            return 'Terça';
        case 3:
            return 'Quarta';
        case 4:
            return 'Quinta';
        case 5:
            return 'Sexta';
        case 6:
            return 'Sábado';
        default:
            return ''
    }
}