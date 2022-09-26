import { CoursesAddedStats } from "./courseaddedstats";

export class CourseMutations {
    duplicateCourseInstances: number = 0;
    newCourses: number = 0;
    newCourseInstances: number = 0;

    setValues = (stats : CoursesAddedStats) => {
        this.duplicateCourseInstances = (stats.courseInstancesAdded.match(/d/g) || []).length
        this.newCourses = (stats.coursesAdded.match(/n/g) || []).length;
        this.newCourseInstances = (stats.courseInstancesAdded.match(/n/g) || []).length
    }
}

export function CreateCourseMutation(): CourseMutations {
    return new CourseMutations();
}