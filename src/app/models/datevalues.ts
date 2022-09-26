export interface DateValues {
    chosenWeek: number,
    chosenYear: number,
    isClicked: boolean,
}

export function createDateValues(overrides?: Partial<DateValues>): DateValues {
    return {
        chosenWeek: 0,
        chosenYear: 0,
        isClicked: false,
        ...overrides
    }
}