export class CoursesAddedStats {
    coursesAdded: string = "";
    courseInstancesAdded: string = "";
}

export function createCoursesAddedStats(overrides?: Partial<CoursesAddedStats>): CoursesAddedStats  {
    return {
        coursesAdded : "",
        courseInstancesAdded: ""
    }
}