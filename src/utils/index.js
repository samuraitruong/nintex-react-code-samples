export function round(number, decimal) {
    decimal = decimal || 2;
    if (!number || isNaN(number)) 
        return "0"
    return Math.ceil(number * Math.pow(10, decimal)) / Math.pow(10, 2);
}