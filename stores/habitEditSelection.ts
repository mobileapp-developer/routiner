import {useSyncExternalStore} from "react";

export type EditableField = "frequencyType" | "goalUnit" | "points" | "habitType";

export type HabitEditSelection = {
    field: EditableField;
    value: string;
    token: string;
};

let selection: HabitEditSelection | null = null;
const listeners = new Set<() => void>();

function emit() {
    listeners.forEach((listener) => listener());
}

export function setHabitEditSelection(field: EditableField, value: string) {
    selection = {
        field,
        value,
        token: `${Date.now()}`,
    };
    emit();
}

export function clearHabitEditSelection() {
    selection = null;
    emit();
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getSnapshot() {
    return selection;
}

export function useHabitEditSelection() {
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

