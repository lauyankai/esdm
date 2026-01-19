sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("projectesdm.controller.AdvisorDashboard", {
        
        onInit() {
            // Initialize the model immediately
            this._initializeModel();
        },

        _initializeModel() {
            // Get the advisor dashboard model from the component
            const oModel = this.getOwnerComponent().getModel("advisorDashboard");
            
            if (!oModel) {
                MessageToast.show("Unable to load advisor dashboard data");
            }
        },

        onNavBack() {
            // Navigate back to the home page
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1", {}, true);
        },

        onFilterAtRisk() {
            // Filter to show only at-risk students
            const oTable = this.byId("adviseesTable");
            const oBinding = oTable.getBinding("items");
            const aFilters = [new Filter("isAtRisk", FilterOperator.EQ, true)];
            oBinding.filter(aFilters);
            MessageToast.show("Showing at-risk students only");
        },

        onSearch(oEvent) {
            // Search functionality
            const sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            const oTable = this.byId("adviseesTable");
            const oBinding = oTable.getBinding("items");
            
            if (sQuery && sQuery.length > 0) {
                const aFilters = [
                    new Filter({
                        filters: [
                            new Filter("name", FilterOperator.Contains, sQuery),
                            new Filter("studentId", FilterOperator.Contains, sQuery)
                        ],
                        and: false
                    })
                ];
                oBinding.filter(aFilters);
            } else {
                oBinding.filter([]);
            }
        },

        onFilterChange(oEvent) {
            // Filter by academic standing
            const sSelectedKey = oEvent.getParameter("selectedItem").getKey();
            const oTable = this.byId("adviseesTable");
            const oBinding = oTable.getBinding("items");
            
            if (sSelectedKey === "All") {
                oBinding.filter([]);
            } else {
                const aFilters = [new Filter("academicStanding", FilterOperator.EQ, sSelectedKey)];
                oBinding.filter(aFilters);
            }
        },

        onStudentSelect(oEvent) {
            // Handle student selection
            const oSelectedItem = oEvent.getParameter("listItem");
            if (oSelectedItem) {
                const oContext = oSelectedItem.getBindingContext("advisorDashboard");
                const oStudent = oContext.getObject();
                console.log("Selected student:", oStudent);
            }
        },

        onStudentPress(oEvent) {
            // Navigate to student's academic progress dashboard
            const oContext = oEvent.getSource().getBindingContext("advisorDashboard");
            const oStudent = oContext.getObject();
            
            MessageToast.show("Loading progress for " + oStudent.name);
            
            // Here you would typically:
            // 1. Store the selected student ID
            // 2. Navigate to the Academic Progress Dashboard
            // 3. Load that specific student's data
            
            // For now, we'll just navigate to the general academic progress view
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteAcademicProgress");
        },

        onViewStudentDetails(oEvent) {
            // View detailed academic progress for a specific student
            const oContext = oEvent.getSource().getBindingContext("advisorDashboard");
            const oStudent = oContext.getObject();
            
            MessageToast.show("Viewing details for " + oStudent.name);
            
            // Navigate to academic progress dashboard
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteAcademicProgress");
        },

        onAlertPress(oEvent) {
            // Handle alert item press
            const oContext = oEvent.getSource().getBindingContext("advisorDashboard");
            const oAlert = oContext.getObject();
            
            MessageToast.show(oAlert.title);
        }
    });
});
