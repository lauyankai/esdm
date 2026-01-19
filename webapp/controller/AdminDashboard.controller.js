sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, JSONModel, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("projectesdm.controller.AdminDashboard", {
        
        onInit() {
            // Initialize the model
            this._initializeModel();
        },

        _initializeModel() {
            // Get the admin dashboard model from the component
            const oModel = this.getOwnerComponent().getModel("adminDashboard");
            
            if (!oModel) {
                MessageToast.show("Unable to load admin dashboard data");
            }
        },

        onNavBack() {
            // Navigate back to the home page
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1", {}, true);
        },

        onViewAtRiskStudents() {
            // Navigate to filtered view of at-risk students
            MessageToast.show("Viewing at-risk students across all departments");
            // Here you would typically navigate to a detailed view or open a dialog
        },

        onViewPendingActions() {
            // Show pending administrative actions
            MessageToast.show("Loading pending approval requests");
            // Here you would show pending approvals, requests, etc.
        },

        onDepartmentPress(oEvent) {
            // View detailed department information
            const oContext = oEvent.getSource().getBindingContext("adminDashboard");
            const oDepartment = oContext.getObject();
            
            MessageToast.show("Viewing details for " + oDepartment.name + " Department");
            // Navigate to department detail view
        },

        onAdvisorPress(oEvent) {
            // View advisor details and their advisees
            const oContext = oEvent.getSource().getBindingContext("adminDashboard");
            const oAdvisor = oContext.getObject();
            
            MessageToast.show("Viewing details for " + oAdvisor.name);
            // Could navigate to the advisor's dashboard view
        },

        onAddAdvisor() {
            // Open dialog to add new advisor
            MessageBox.information("This would open a form to add a new academic advisor to the system.");
        },

        onExportAdvisors() {
            // Export advisors list to Excel
            MessageToast.show("Exporting advisors list to Excel...");
            // Implement export functionality
        },

        onSystemAlertPress(oEvent) {
            // Handle system alert press
            const oContext = oEvent.getSource().getBindingContext("adminDashboard");
            const oAlert = oContext.getObject();
            
            MessageBox.information(oAlert.description, {
                title: oAlert.title
            });
        }
    });
});
