sap.ui.define([
    "sap/ui/core/UIComponent",
    "projectesdm/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("projectesdm.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // set the academic progress model
            this.setModel(models.createAcademicProgressModel(), "academicProgress");

                // set the advisor dashboard model
                this.setModel(models.createAdvisorDashboardModel(), "advisorDashboard");
            // set the admin dashboard model
            this.setModel(models.createAdminDashboardModel(), "adminDashboard");
            // enable routing
            this.getRouter().initialize();
        }
    });
});