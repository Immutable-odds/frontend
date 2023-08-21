export function getDaysFactor(datetime: string | number) {
    const timestamp = new Date(datetime).getTime()
    const timeNow = Date.now()
    const millisecondsPerHour = 3600000;
    const millisecondsPerDay = 86400000;

    const diffInMilliseconds = Math.abs(timestamp - timeNow);
    const days = Math.floor(diffInMilliseconds / millisecondsPerDay);
    const remainingMilliseconds = diffInMilliseconds % millisecondsPerDay;
    const hours = Math.floor(remainingMilliseconds / millisecondsPerHour);

    if (days >= 1) {
        return `${days} day${days === 1 ? '' : 's'}`;
    } else if (hours >= 1) {
        return `${hours} hour${hours === 1 ? '' : 's'}`;
    } else {
        return '0 hours';
    }
}
