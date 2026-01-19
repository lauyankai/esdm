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
                MessageToast.show("Navigating to Academic Progress Dashboard...");
                oRouter.navTo("RouteAcademicProgress");
            } catch (error) {
                MessageToast.show("Navigation error: " + error.message);
                console.error("Navigation error:", error);
            }
        }
    });
});