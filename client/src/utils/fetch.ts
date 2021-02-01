export const status = (r: Response) => r.ok ? Promise.resolve(r) : Promise.reject(new Error(r.statusText));

export const json = (r: Response) => r.json();