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
                        gradeState: "Success",
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
                        gradeState: "Success",
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
                        gpaState: "Success",
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
            },

            /**
             * Creates a JSON model containing mock advisor dashboard data with multiple advisees.
             * @returns {sap.ui.model.json.JSONModel} The advisor dashboard model.
             */
            createAdvisorDashboardModel: function () {
                var oData = {
                    advisorInfo: {
                        name: "Dr. Assoc. Prof. Noorminshah",
                        department: "Computer Science",
                        totalAdvisees: 12
                    },
                    summary: {
                        totalAdvisees: 12,
                        atRiskCount: 3,
                        goodStandingCount: 8,
                        averageGPA: "3.42"
                    },
                    birthdays: [
                        {
                            studentId: "A23CS0098",
                            name: "Lau Yan Kai",
                            date: new Date("2004-08-03"),
                            major: "Computer Science"
                        },
                        {
                            studentId: "A23CS0022",
                            name: "Joanne Ching",
                            date: new Date("2004-07-15"),
                            major: "Computer Science"
                        },
                        {
                            studentId: "A23CS0061",
                            name: "Chew Chu Xian",
                            date: new Date("2004-09-09"),
                            major: "Computer Science"
                        },
                        {
                            studentId: "A24CS0105",
                            name: "Ahmad bin Hassan",
                            date: new Date("2005-02-22"),
                            major: "Computer Science"
                        },
                        {
                            studentId: "A25CS0078",
                            name: "Emily Tan",
                            date: new Date("2006-11-05"),
                            major: "Computer Science"
                        },
                        {
                            studentId: "A24CS0156",
                            name: "David Chen",
                            date: new Date("2005-01-30"),
                            major: "Computer Science"
                        }
                    ],
                    advisees: [
                        {
                            studentId: "A23CS0098",
                            name: "Lau Yan Kai",
                            major: "Computer Science",
                            academicYear: "Year 3",
                            currentGPA: 3.75,
                            gpaState: "Success",
                            creditsCompleted: 84,
                            creditsRequired: 120,
                            academicStanding: "Good Standing",
                            standingState: "Success",
                            lastContact: "2026-01-15",
                            isAtRisk: false
                        },
                        {
                            studentId: "A23CS0022",
                            name: "Joanne Ching",
                            major: "Computer Science",
                            academicYear: "Year 3",
                            currentGPA: 3.92,
                            gpaState: "Success",
                            creditsCompleted: 88,
                            creditsRequired: 120,
                            academicStanding: "Dean's List",
                            standingState: "Success",
                            lastContact: "2026-01-10",
                            isAtRisk: false
                        },
                        {
                            studentId: "A23CS0061",
                            name: "Chew Chu Xian",
                            major: "Computer Science",
                            academicYear: "Year 3",
                            currentGPA: 3.88,
                            gpaState: "Success",
                            creditsCompleted: 86,
                            creditsRequired: 120,
                            academicStanding: "Dean's List",
                            standingState: "Success",
                            lastContact: "2026-01-12",
                            isAtRisk: false
                        },
                        {
                            studentId: "A24CS0105",
                            name: "Ahmad bin Hassan",
                            major: "Computer Science",
                            academicYear: "Year 2",
                            currentGPA: 2.45,
                            gpaState: "Warning",
                            creditsCompleted: 48,
                            creditsRequired: 120,
                            academicStanding: "At Risk",
                            standingState: "Warning",
                            lastContact: "2026-01-18",
                            isAtRisk: true
                        },
                        {
                            studentId: "A24CS0089",
                            name: "Sarah Lee",
                            major: "Computer Science",
                            academicYear: "Year 2",
                            currentGPA: 3.55,
                            gpaState: "Success",
                            creditsCompleted: 52,
                            creditsRequired: 120,
                            academicStanding: "Good Standing",
                            standingState: "Success",
                            lastContact: "2026-01-08",
                            isAtRisk: false
                        },
                        {
                            studentId: "A24CS0134",
                            name: "Kumar Raj",
                            major: "Computer Science",
                            academicYear: "Year 2",
                            currentGPA: 3.25,
                            gpaState: "Success",
                            creditsCompleted: 50,
                            creditsRequired: 120,
                            academicStanding: "Good Standing",
                            standingState: "Success",
                            lastContact: "2026-01-14",
                            isAtRisk: false
                        },
                        {
                            studentId: "A25CS0078",
                            name: "Emily Tan",
                            major: "Computer Science",
                            academicYear: "Year 1",
                            currentGPA: 2.15,
                            gpaState: "Error",
                            creditsCompleted: 18,
                            creditsRequired: 120,
                            academicStanding: "Academic Probation",
                            standingState: "Error",
                            lastContact: "2026-01-17",
                            isAtRisk: true
                        },
                        {
                            studentId: "A25CS0092",
                            name: "Michael Wong",
                            major: "Computer Science",
                            academicYear: "Year 1",
                            currentGPA: 3.65,
                            gpaState: "Success",
                            creditsCompleted: 20,
                            creditsRequired: 120,
                            academicStanding: "Good Standing",
                            standingState: "Success",
                            lastContact: "2026-01-11",
                            isAtRisk: false
                        },
                        {
                            studentId: "A23CS0145",
                            name: "Fatimah Ibrahim",
                            major: "Computer Science",
                            academicYear: "Year 3",
                            currentGPA: 3.48,
                            gpaState: "Success",
                            creditsCompleted: 80,
                            creditsRequired: 120,
                            academicStanding: "Good Standing",
                            standingState: "Success",
                            lastContact: "2026-01-09",
                            isAtRisk: false
                        },
                        {
                            studentId: "A24CS0156",
                            name: "David Chen",
                            major: "Computer Science",
                            academicYear: "Year 2",
                            currentGPA: 2.85,
                            gpaState: "Warning",
                            creditsCompleted: 46,
                            creditsRequired: 120,
                            academicStanding: "At Risk",
                            standingState: "Warning",
                            lastContact: "2026-01-16",
                            isAtRisk: true
                        },
                        {
                            studentId: "A23CS0167",
                            name: "Nurul Huda",
                            major: "Computer Science",
                            academicYear: "Year 3",
                            currentGPA: 3.72,
                            gpaState: "Success",
                            creditsCompleted: 82,
                            creditsRequired: 120,
                            academicStanding: "Good Standing",
                            standingState: "Success",
                            lastContact: "2026-01-13",
                            isAtRisk: false
                        },
                        {
                            studentId: "A24CS0178",
                            name: "Jason Lim",
                            major: "Computer Science",
                            academicYear: "Year 2",
                            currentGPA: 3.38,
                            gpaState: "Success",
                            creditsCompleted: 54,
                            creditsRequired: 120,
                            academicStanding: "Good Standing",
                            standingState: "Success",
                            lastContact: "2026-01-07",
                            isAtRisk: false
                        }
                    ],
                    recentAlerts: [
                        {
                            title: "Low Attendance Alert - Emily Tan",
                            description: "Student has missed 4 consecutive classes in CS201",
                            icon: "sap-icon://alert",
                            date: "2 days ago",
                            severity: "Error",
                            studentId: "A25CS0078"
                        },
                        {
                            title: "Grade Alert - Ahmad bin Hassan",
                            description: "Current grade dropped to D in Database Systems",
                            icon: "sap-icon://warning",
                            date: "3 days ago",
                            severity: "Warning",
                            studentId: "A24CS0105"
                        },
                        {
                            title: "Dean's List Achievement - Joanne Ching",
                            description: "Student achieved Dean's List for Fall 2025 semester",
                            icon: "sap-icon://employee-approvals",
                            date: "5 days ago",
                            severity: "Success",
                            studentId: "A23CS0022"
                        },
                        {
                            title: "Advising Session Requested - David Chen",
                            description: "Student has requested an advising appointment",
                            icon: "sap-icon://appointment",
                            date: "1 week ago",
                            severity: "Information",
                            studentId: "A24CS0156"
                        }
                    ]
                };

                var oModel = new JSONModel(oData);
                oModel.setDefaultBindingMode("TwoWay");
                return oModel;
            }
    };

});