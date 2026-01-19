sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], (Controller, JSONModel, MessageToast, MessageBox, Fragment) => {
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
        },

        // Student Allocation Methods
        onOpenAllocationDialog() {
            // Load the dialog fragment
            if (!this.oAllocationDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "projectesdm.view.StudentAllocationDialog",
                    controller: this
                }).then((oDialog) => {
                    this.oAllocationDialog = oDialog;
                    // Bind the model to the dialog
                    const oModel = this.getView().getModel("adminDashboard");
                    oDialog.setModel(oModel, "adminDashboard");
                    this.getView().addDependent(oDialog);
                    this._setupAllocationDialog();
                }).catch((oError) => {
                    MessageBox.error("Failed to load allocation dialog: " + oError);
                });
            } else {
                this._setupAllocationDialog();
            }
        },

        _setupAllocationDialog() {
            // Reset dialog state
            const oAdminModel = this.getOwnerComponent().getModel("adminDashboard");
            const oModel = this.getView().getModel("adminDashboard");
            
            // Get all students from model data (if available)
            const allStudents = oAdminModel?.getData()?.allStudents || [];
            
            // Set up initial students list if not already in model
            if (!oModel.getProperty("/allStudents") || oModel.getProperty("/allStudents").length === 0) {
                oModel.setProperty("/allStudents", allStudents);
            }

            // Reset selections using Fragment.byId
            const sViewId = this.getView().getId();
            const oTable = Fragment.byId(sViewId, "studentSelectionTable");
            if (oTable) {
                oTable.clearSelection();
            }
            
            // Reset advisor selection
            const oAdvisorSelect = Fragment.byId(sViewId, "advisorSelect");
            if (oAdvisorSelect) {
                oAdvisorSelect.setSelectedKey("");
            }

            this.oAllocationDialog.open();
        },

        onStatusFilterChange(oEvent) {
            // Filter students based on selected status
            const sStatus = oEvent.getSource().getSelectedKey();
            const oModel = this.getView().getModel("adminDashboard");
            const aAllStudents = oModel.getProperty("/allStudents");
            let aFiltered = [];

            switch(sStatus) {
                case "unassigned":
                    aFiltered = aAllStudents.filter(s => !s.currentAdvisor);
                    break;
                case "atrisk":
                    aFiltered = aAllStudents.filter(s => s.isAtRisk);
                    break;
                default: // "all"
                    aFiltered = aAllStudents;
            }

            oModel.setProperty("/filteredStudents", aFiltered);
        },

        onAllocateStudents() {
            // Get selected students and advisor using Fragment.byId
            const sViewId = this.getView().getId();
            const oTable = Fragment.byId(sViewId, "studentSelectionTable");
            const aSelectedIndices = oTable.getSelectedIndices();
            const oAdvisorSelect = Fragment.byId(sViewId, "advisorSelect");
            const sSelectedAdvisorId = oAdvisorSelect.getSelectedKey();

            if (!sSelectedAdvisorId) {
                MessageBox.warning("Please select an advisor first.");
                return;
            }

            if (aSelectedIndices.length === 0) {
                MessageBox.warning("Please select at least one student to allocate.");
                return;
            }

            // Get the advisor details
            const oModel = this.getView().getModel("adminDashboard");
            const aAdvisors = oModel.getProperty("/advisors");
            const oSelectedAdvisor = aAdvisors.find(a => a.advisorId === sSelectedAdvisorId);

            // Get selected students
            const aAllStudents = oModel.getProperty("/allStudents");
            const aSelectedStudents = aSelectedIndices.map(i => aAllStudents[i]);

            // Show confirmation
            MessageBox.confirm(
                `Allocate ${aSelectedStudents.length} student(s) to ${oSelectedAdvisor.name}?`,
                {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    onClose: (sAction) => {
                        if (sAction === MessageBox.Action.OK) {
                            this._performAllocation(aSelectedStudents, oSelectedAdvisor, oModel);
                        }
                    }
                }
            );
        },

        _performAllocation(aStudents, oAdvisor, oModel) {
            // Update student records with new advisor
            const aAllStudents = oModel.getProperty("/allStudents");
            
            aStudents.forEach(oStudent => {
                const iIndex = aAllStudents.findIndex(s => s.studentId === oStudent.studentId);
                if (iIndex >= 0) {
                    aAllStudents[iIndex].currentAdvisor = oAdvisor.name;
                    aAllStudents[iIndex].advisorId = oAdvisor.advisorId;
                }
            });

            // Update advisor's advisee count
            const aAdvisors = oModel.getProperty("/advisors");
            const oUpdatedAdvisor = aAdvisors.find(a => a.advisorId === oAdvisor.advisorId);
            if (oUpdatedAdvisor) {
                oUpdatedAdvisor.adviseeCount = (parseInt(oUpdatedAdvisor.adviseeCount) || 0) + aStudents.length;
            }

            // Refresh the model
            oModel.refresh(true);

            // Close dialog and show success message
            this.oAllocationDialog.close();
            MessageToast.show(`Successfully allocated ${aStudents.length} student(s) to ${oAdvisor.name}`);
        },

        onCloseAllocationDialog() {
            this.oAllocationDialog.close();
        }
    });
});

