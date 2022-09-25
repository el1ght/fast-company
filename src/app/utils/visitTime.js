export const getTime = (time) => {
    const date = new Date(Number(time));
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
        const dayDif = dateNow.getDay() - date.getDay();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();
                if (minutesDif >= 0 && minutesDif < 5) return '1 минуту назад';
                if (minutesDif >= 5 && minutesDif < 10) return '5 минут назад';
                if (minutesDif >= 10 && minutesDif < 30) {
                    return '30 минут назад';
                }
                return `${date.getHours()}:${date.getMinutes()}`;
            }
        }
        return `${date.getDay()} ${date.toLocaleString('default', {
            month: 'long'
        })}`;
    }
    return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
};
