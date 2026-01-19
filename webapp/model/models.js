sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
function (JSONModel, Device) {
    "use strict";

    return {
        /**
         * Provides runtime information for the device the UI5 app is running on as a JSONModel.
         * @returns {sap.ui.model.json.JSONModel} The device model.
         */
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        /**
         * Creates a JSON model containing mock academic progress data.
         * @returns {sap.ui.model.json.JSONModel} The academic progress model.
         */
        createAcademicProgressModel: function () {
            var oData = {
                studentInfo: {
                    name: "Lau Yan Kai",
                    studentId: "A23CS0098",
                    major: "Computer Science",
                    academicYear: "Year 3",
                    enrollmentDate: "2023-09-01",
                    expectedGraduation: "2027-06-30"
                },
                kpis: {
                    currentGPA: "3.75",
                    creditsCompleted: 84,
                    creditsRequired: 120,
                    currentCourses: 6,
                    academicStanding: "Good",
                    standingColor: "Good"
                },
                gpaTrend: [
                    { semester: "Sem 1 2023", gpa: 3.45 },
                    { semester: "Sem 2 2023", gpa: 3.60 },
                    { semester: "Sem 1 2024", gpa: 3.68 },
                    { semester: "Sem 2 2024", gpa: 3.75 },
                    { semester: "Sem 1 2025", gpa: 3.82 },
                    { semester: "Sem 2 2025", gpa: 3.75 }
                ],
                currentCourses: [
                    {
                        courseCode: "CS401",
                        courseName: "Advanced Database Systems",
                        credits: 4,
                        currentGrade: "A-",
                        gradeState: "Success",
                        attendance: 92,
                        attendanceState: "Success",
                        status: "On Track",
                        statusState: "Success"
                    },
                    {
                        courseCode: "CS402",
                        courseName: "Machine Learning",
                        credits: 4,
                        currentGrade: "B+",
                        gradeState: "Good",
                        attendance: 88,
                        attendanceState: "Warning",
                        status: "On Track",
                        statusState: "Success"
                    },
                    {
                        courseCode: "CS403",
                        courseName: "Software Engineering",
                        credits: 3,
                        currentGrade: "A",
                        gradeState: "Success",
                        attendance: 95,
                        attendanceState: "Success",
                        status: "Excellent",
                        statusState: "Success"
                    },
                    {
                        courseCode: "CS404",
                        courseName: "Computer Networks",
                        credits: 3,
                        currentGrade: "B",
                        gradeState: "Good",
                        attendance: 85,
                        attendanceState: "Warning",
                        status: "On Track",
                        statusState: "Success"
                    },
                    {
                        courseCode: "MGT301",
                        courseName: "Project Management",
                        credits: 3,
                        currentGrade: "A-",
                        gradeState: "Success",
                        attendance: 90,
                        attendanceState: "Success",
                        status: "On Track",
                        statusState: "Success"
                    },
                    {
                        courseCode: "CS405",
                        courseName: "Cybersecurity Fundamentals",
                        credits: 3,
                        currentGrade: "C+",
                        gradeState: "Warning",
                        attendance: 78,
                        attendanceState: "Warning",
                        status: "At Risk",
                        statusState: "Warning"
                    }
                ],
                semesterHistory: [
                    {
                        semester: "Semester 2, 2025",
                        gpa: 3.75,
                        gpaState: "Success",
                        credits: 15,
                        courseCount: 5,
                        standing: "Good Standing",
                        standingState: "Success"
                    },
                    {
                        semester: "Semester 1, 2025",
                        gpa: 3.82,
                        gpaState: "Success",
                        credits: 16,
                        courseCount: 5,
                        standing: "Dean's List",
                        standingState: "Success"
                    },
                    {
                        semester: "Semester 2, 2024",
                        gpa: 3.75,
                        gpaState: "Success",
                        credits: 14,
                        courseCount: 5,
                        standing: "Good Standing",
                        standingState: "Success"
                    },
                    {
                        semester: "Semester 1, 2024",
                        gpa: 3.68,
                        gpaState: "Success",
                        credits: 15,
                        courseCount: 5,
                        standing: "Good Standing",
                        standingState: "Success"
                    },
                    {
                        semester: "Semester 2, 2023",
                        gpa: 3.60,
                        gpaState: "Success",
                        credits: 12,
                        courseCount: 4,
                        standing: "Good Standing",
                        standingState: "Success"
                    },
                    {
                        semester: "Semester 1, 2023",
                        gpa: 3.45,
                        gpaState: "Good",
                        credits: 12,
                        courseCount: 4,
                        standing: "Good Standing",
                        standingState: "Success"
                    }
                ]
            };

            var oModel = new JSONModel(oData);
            oModel.setDefaultBindingMode("TwoWay");
            return oModel;
        }
    };

});