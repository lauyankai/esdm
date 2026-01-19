sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("projectesdm.controller.View1", {
        onInit() {
        },

        onNavigateToAcademicProgress() {
            try {
                const oRouter = this.getOwnerComponent().getRouter();
                console.log("Router object:", oRouter);
                console.log("Attempting to navigate to RouteAcademicProgress");
                oRouter.navTo("RouteAcademicProgress");
                console.log("navTo called successfully");
            } catch (error) {
                MessageToast.show("Navigation error: " + error.message);
                console.error("Navigation error:", error);
            }
            },

            onNavigateToAdvisorDashboard() {
                try {
                    const oRouter = this.getOwnerComponent().getRouter();
                    console.log("Navigating to Advisor Dashboard");
                    oRouter.navTo("RouteAdvisorDashboard");
                } catch (error) {
                    MessageToast.show("Navigation error: " + error.message);
                    console.error("Navigation error:", error);
                }
            }
    });
});