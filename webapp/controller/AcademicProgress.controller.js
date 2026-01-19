sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("projectesdm.controller.AcademicProgress", {
        
        onInit() {
            // Get the router
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteAcademicProgress").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched(oEvent) {
            // Initialize the academic progress model when route is matched
            this._initializeModel();
        },

        _initializeModel() {
            // Get the academic progress model from the component
            const oModel = this.getOwnerComponent().getModel("academicProgress");
            
            if (!oModel) {
                MessageToast.show("Unable to load academic progress data");
            }
        },

        onNavBack() {
            // Navigate back to the previous page
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1", {}, true);
        },

        onTilePress(oEvent) {
            // Handle tile press event - can be used to drill down into specific metrics
            const sTileHeader = oEvent.getSource().getHeader();
            MessageToast.show("Viewing details for: " + sTileHeader);
        },

        onViewSemesterDetails(oEvent) {
            // Get the semester data from the clicked row
            const oContext = oEvent.getSource().getBindingContext("academicProgress");
            const oSemesterData = oContext.getObject();
            
            MessageToast.show("Viewing details for: " + oSemesterData.semester);
            
            // Here you would typically navigate to a detail page or open a dialog
            // showing more information about the selected semester
        },

        onCoursePress(oEvent) {
            // Handle course selection
            const oContext = oEvent.getSource().getBindingContext("academicProgress");
            const oCourseData = oContext.getObject();
            
            MessageToast.show("Selected course: " + oCourseData.courseName);
        },

        // Helper method to format dates
        formatDate(sDate) {
            if (!sDate) {
                return "";
            }
            const oDate = new Date(sDate);
            return oDate.toLocaleDateString();
        },

        // Helper method to determine GPA color/state
        getGPAState(fGPA) {
            if (fGPA >= 3.5) {
                return "Success";
            } else if (fGPA >= 3.0) {
                return "Good";
            } else if (fGPA >= 2.5) {
                return "Warning";
            } else {
                return "Error";
            }
        },

        // Helper method to determine attendance state
        getAttendanceState(iAttendance) {
            if (iAttendance >= 90) {
                return "Success";
            } else if (iAttendance >= 75) {
                return "Warning";
            } else {
                return "Error";
            }
        }
    });
});
