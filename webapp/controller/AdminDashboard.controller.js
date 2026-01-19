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
            // Open dialog to add new advisor from lecturer list
            if (!this.oAddAdvisorDialog) {
                console.log("Loading add advisor dialog fragment...");
                Fragment.load({
                    id: this.getView().getId(),
                    name: "projectesdm.view.AddAdvisorDialog",
                    controller: this
                }).then((oDialog) => {
                    console.log("Add advisor dialog loaded successfully");
                    this.oAddAdvisorDialog = oDialog;
                    const oModel = this.getView().getModel("adminDashboard");
                    oDialog.setModel(oModel, "adminDashboard");
                    this.getView().addDependent(oDialog);
                    this._openAddAdvisorDialog();
                }).catch((oError) => {
                    console.error("Failed to load add advisor dialog:", oError);
                    MessageBox.error("Failed to load dialog: " + oError);
                });
            } else {
                this._openAddAdvisorDialog();
            }
        },

        _openAddAdvisorDialog() {
            this.oAddAdvisorDialog.open();
        },

        onLecturerChange(oEvent) {
            // Update the details when lecturer is selected from dropdown
            const sViewId = this.getView().getId();
            const oSelect = oEvent.getSource();
            const sSelectedKey = oSelect.getSelectedKey();
            const oModel = this.getView().getModel("adminDashboard");
            const aLecturers = oModel.getProperty("/availableLecturers");
            const oSelectedLecturer = aLecturers.find(l => l.lecturerId === sSelectedKey);

            if (oSelectedLecturer) {
                Fragment.byId(sViewId, "selectedDepartment").setText(oSelectedLecturer.department);
                Fragment.byId(sViewId, "selectedSpecialization").setText(oSelectedLecturer.specialization);
                Fragment.byId(sViewId, "selectedEmail").setText(oSelectedLecturer.email);
                Fragment.byId(sViewId, "selectedPhone").setText(oSelectedLecturer.phone);
            }
        },

        onLecturerTableSelect(oEvent) {
            // When a lecturer is selected from the table, update the dropdown
            const sViewId = this.getView().getId();
            const oItem = oEvent.getParameter("listItem");
            const oContext = oItem.getBindingContext("adminDashboard");
            const oLecturer = oContext.getObject();
            
            const oSelect = Fragment.byId(sViewId, "lecturerSelect");
            if (oSelect && oLecturer) {
                oSelect.setSelectedKey(oLecturer.lecturerId);
                // Trigger the change event manually
                Fragment.byId(sViewId, "selectedDepartment").setText(oLecturer.department);
                Fragment.byId(sViewId, "selectedSpecialization").setText(oLecturer.specialization);
                Fragment.byId(sViewId, "selectedEmail").setText(oLecturer.email);
                Fragment.byId(sViewId, "selectedPhone").setText(oLecturer.phone);
            }
        },

        onConfirmAddAdvisor() {
            const sViewId = this.getView().getId();
            const oSelect = Fragment.byId(sViewId, "lecturerSelect");
            const sSelectedKey = oSelect.getSelectedKey();

            if (!sSelectedKey) {
                MessageBox.warning("Please select a lecturer to add as advisor.");
                return;
            }

            const oModel = this.getView().getModel("adminDashboard");
            const aLecturers = oModel.getProperty("/availableLecturers");
            const aAdvisors = oModel.getProperty("/advisors");
            const oSelectedLecturer = aLecturers.find(l => l.lecturerId === sSelectedKey);

            // Check if already an advisor
            const bAlreadyAdvisor = aAdvisors.some(a => a.advisorId === sSelectedKey);
            if (bAlreadyAdvisor) {
                MessageBox.warning(`${oSelectedLecturer.name} is already registered as an advisor.`);
                return;
            }

            // Create new advisor entry
            const oNewAdvisor = {
                advisorId: oSelectedLecturer.lecturerId,
                name: oSelectedLecturer.name,
                department: oSelectedLecturer.department,
                adviseeCount: 0,
                atRiskCount: 0,
                riskState: "Success",
                activeSince: new Date().getFullYear().toString(),
                status: "Active",
                statusState: "Success"
            };

            // Add to advisors list
            aAdvisors.push(oNewAdvisor);
            oModel.setProperty("/advisors", aAdvisors);

            // Update lecturer status
            const iLecturerIndex = aLecturers.findIndex(l => l.lecturerId === sSelectedKey);
            if (iLecturerIndex >= 0) {
                aLecturers[iLecturerIndex].isAdvisor = "Already Advisor";
            }

            // Update system stats
            const oSystemStats = oModel.getProperty("/systemStats");
            oSystemStats.totalAdvisors = (parseInt(oSystemStats.totalAdvisors) || 0) + 1;
            oModel.setProperty("/systemStats", oSystemStats);

            oModel.refresh(true);

            MessageToast.show(`${oSelectedLecturer.name} has been added as an academic advisor.`);
            this.oAddAdvisorDialog.close();
        },

        onCloseAddAdvisorDialog() {
            this.oAddAdvisorDialog.close();
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
                console.log("Loading allocation dialog fragment...");
                Fragment.load({
                    id: this.getView().getId(),
                    name: "projectesdm.view.StudentAllocationDialog",
                    controller: this
                }).then((oDialog) => {
                    console.log("Dialog loaded successfully");
                    this.oAllocationDialog = oDialog;
                    // Bind the model to the dialog
                    const oModel = this.getView().getModel("adminDashboard");
                    console.log("Model:", oModel?.getData?.allStudents?.length, "students");
                    oDialog.setModel(oModel, "adminDashboard");
                    this.getView().addDependent(oDialog);
                    this._setupAllocationDialog();
                }).catch((oError) => {
                    console.error("Failed to load dialog:", oError);
                    MessageBox.error("Failed to load allocation dialog: " + oError);
                });
            } else {
                console.log("Dialog already loaded, opening...");
                this._setupAllocationDialog();
            }
        },

        _setupAllocationDialog() {
            // Reset dialog state
            const oAdminModel = this.getOwnerComponent().getModel("adminDashboard");
            const oModel = this.getView().getModel("adminDashboard");
            
            console.log("Setting up allocation dialog");
            console.log("Admin model data:", oAdminModel?.getData());
            
            // Get all students from model data (if available)
            const allStudents = oAdminModel?.getData()?.allStudents || [];
            console.log("All students count:", allStudents.length);
            
            // Set up initial students list if not already in model
            if (!oModel.getProperty("/allStudents") || oModel.getProperty("/allStudents").length === 0) {
                oModel.setProperty("/allStudents", allStudents);
            }

            // Try to reset selections using Fragment.byId - but handle errors gracefully
            const sViewId = this.getView().getId();
            
            try {
                const oTable = Fragment.byId(sViewId, "studentSelectionTable");
                console.log("Table found:", !!oTable);
                if (oTable && typeof oTable.removeSelections === "function") {
                    oTable.removeSelections(true);
                } else if (oTable && typeof oTable.clearSelection === "function") {
                    oTable.clearSelection();
                }
            } catch (e) {
                console.warn("Could not clear table selection:", e);
            }
            
            // Reset advisor selection
            try {
                const oAdvisorSelect = Fragment.byId(sViewId, "advisorSelect");
                console.log("Advisor select found:", !!oAdvisorSelect);
                if (oAdvisorSelect && typeof oAdvisorSelect.setSelectedKey === "function") {
                    oAdvisorSelect.setSelectedKey("");
                }
            } catch (e) {
                console.warn("Could not reset advisor selection:", e);
            }

            this.oAllocationDialog.open();
        },

        onStatusFilterChange(oEvent) {
            // Filter students based on selected status
            const sStatus = oEvent.getSource().getSelectedKey();
            const sViewId = this.getView().getId();
            const oTable = Fragment.byId(sViewId, "studentSelectionTable");
            const oModel = this.getView().getModel("adminDashboard");
            const aAllStudents = oModel.getProperty("/allStudents");

            if (oTable && oTable.getItems) {
                const aItems = oTable.getItems();
                aItems.forEach((oItem, iIndex) => {
                    const oItemData = aAllStudents[iIndex];
                    let bVisible = false;
                    
                    if (sStatus === "unassigned") {
                        bVisible = !oItemData?.currentAdvisor;
                    } else if (sStatus === "atrisk") {
                        bVisible = oItemData?.isAtRisk;
                    } else {
                        bVisible = true;
                    }
                    
                    oItem.setVisible(bVisible);
                });
            }
        },

        onStudentSelectionChange(oEvent) {
            // Update the selection count
            const sViewId = this.getView().getId();
            const oTable = Fragment.byId(sViewId, "studentSelectionTable");
            const oSummaryText = Fragment.byId(sViewId, "summaryText");
            
            if (oTable && oSummaryText) {
                const aSelectedItems = oTable.getSelectedItems();
                const iCount = aSelectedItems ? aSelectedItems.length : 0;
                oSummaryText.setText(`${iCount} student${iCount !== 1 ? 's' : ''} selected`);
            }
        },

        onAllocateStudents() {
            // Get selected students and advisor using Fragment.byId
            const sViewId = this.getView().getId();
            const oTable = Fragment.byId(sViewId, "studentSelectionTable");
            const oAdvisorSelect = Fragment.byId(sViewId, "advisorSelect");
            const sSelectedAdvisorId = oAdvisorSelect.getSelectedKey();

            if (!sSelectedAdvisorId) {
                MessageBox.warning("Please select an advisor first.");
                return;
            }

            // Get selected items (for MultiToggle mode, use getSelectedItems instead of getSelectedIndices)
            const aSelectedItems = oTable.getSelectedItems();
            
            if (!aSelectedItems || aSelectedItems.length === 0) {
                MessageBox.warning("Please select at least one student to allocate.");
                return;
            }

            // Get the advisor details
            const oModel = this.getView().getModel("adminDashboard");
            const aAdvisors = oModel.getProperty("/advisors");
            const oSelectedAdvisor = aAdvisors.find(a => a.advisorId === sSelectedAdvisorId);

            // Get selected students from the binding context
            const aSelectedStudents = aSelectedItems.map(oItem => {
                return oItem.getBindingContext("adminDashboard").getObject();
            });

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

