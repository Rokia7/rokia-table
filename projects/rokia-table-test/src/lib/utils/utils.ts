export function title(str: string) {
    return str.replace(/(^|\s)\S/g, (t) => { return t.toUpperCase() });
}

export function localStringToNumber(s: any) {
    return Number(String(s).replace(/[^0-9.-]+/g, ''))
}