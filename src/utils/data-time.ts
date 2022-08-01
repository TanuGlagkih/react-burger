export const dateTime = (data: string) => {
    const current = new Date();
    const orderTime = new Date(data);

    let dayCount: string;
    const days = Math.round((current.getTime() - orderTime.getTime()) / (1000 * 60 * 60 * 24));

    if (current.getFullYear() === orderTime.getFullYear()
        || current.getMonth() === orderTime.getMonth()) {
        if (current.getDate() === orderTime.getDate()) {
            dayCount = 'Сегодня, '
        } else if (current.getDate() - orderTime.getDate() === 1) {
            dayCount = 'Вчера, '
        } else if (current.getDate() - orderTime.getDate() <= 4) {
            dayCount = `${current.getDate() - orderTime.getDate()} дня назад, `
        } else {
            dayCount = `${current.getDate() - orderTime.getDate()} дней назад, `
        }
    } else if (days <= 4) {
        dayCount = `${days} дня назад, `
    } else {
        dayCount = `${days} дней назад, `
    }

    const newOrderTime = orderTime.toTimeString();

    let gmt: string = newOrderTime.slice(15, 16)
    if (gmt === '0') {
        gmt = newOrderTime.slice(14, 15)
    } else {
        gmt = newOrderTime.slice(14, 16)
    }

    return dayCount + newOrderTime.slice(0, 5) + ' i-GMT' + newOrderTime.slice(12, 13) + gmt;
}