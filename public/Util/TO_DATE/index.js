export function to_Date(num) {
    return new Date(num).toLocaleDateString();
}

export function to_Time(num) {
    return new Date(num).toLocaleTimeString();
}

export function to_Zero(num) {
    const t_Date = new Date(num);
    t_Date.setHours(0,0,0,0);
    return t_Date.getTime();
}