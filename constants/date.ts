export function toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function fromDateKey(dateKey: string): Date {
    const [year, month, day] = dateKey.split('-').map(Number);

    return new Date(year, month - 1, day);
}

export function addDaysToDateKey(dateKey: string, days: number): string {
    const date = fromDateKey(dateKey);
    date.setDate(date.getDate() + days);

    return toDateKey(date);
}

export function diffDateKeysInclusive(from: string, to: string): number {
    const fromDate = fromDateKey(from);
    const toDate = fromDateKey(to);

    const utcFrom = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    const utcTo = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());

    return Math.round((utcTo - utcFrom) / 86400000) + 1;
}

