export function limit(val: number, min?: number | null, max?: number): number {
    let res = val;
    if(isNaN(val))
        res = 0;
    if(typeof min == 'number')
        res = Math.max(Number(min), res);
    if(typeof max == 'number')
        res = Math.min(Number(max), res);
    return res;
}