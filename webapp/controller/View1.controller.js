sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("projectesdm.controller.View1", {
        onInit() {
        },

        onNavigateToAcademicProgress() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteAcademicProgress");
        }
    });
});