/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/prodea/training/employeeapp2/model/models",
    "com/prodea/training/employeeapp2/model/ErrorHandler",

],
    function (UIComponent, Device, models, ErrorHandler) {
        "use strict";

        return UIComponent.extend("com.prodea.training.employeeapp2.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // initialize the error handler with the component
                this._oErrorHandler = new ErrorHandler(this);
            }
        });
    }
);