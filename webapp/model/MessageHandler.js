sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/MessageBox"
], function(UI5Object, MessageBox) {
	"use strict";

	return UI5Object.extend("com.prodea.training.employeeapp2.model.MessageHandler", {

		/**
		 * Handles application errors by automatically attaching to the model events and displaying errors when needed.
		 * @class
		 * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
		 * @public
		 */
		constructor: function(oComponent) {
			this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
			this._oComponent = oComponent;
			this._oModel = oComponent.getModel("oDataModel");
			this._bMessageOpen = false;
			this._sErrorText = this._oResourceBundle.getText("errorText");

			this._oModel.attachMetadataFailed(function(oEvent) {
				var oParams = oEvent.getParameters();
				this._showServiceError(oParams.response);
			}, this);

			this._oModel.attachRequestFailed(function(oEvent) {
				var oParams = oEvent.getParameters();
				// An entity that was not found in the service is also throwing a 404 error in oData.
				// We already cover this case with a notFound target so we skip it here.
				// A request that cannot be sent to the server is a technical error that we have to handle though
				if (oParams.response.statusCode !== "404" || (oParams.response.statusCode === 404 && oParams.response.responseText.indexOf(
						"Cannot POST") === 0)) {
					this._showServiceError(oParams.response);
				}
			}, this);
		},

		/**
		 * Shows a {@link sap.m.MessageBox} when a service call has failed.
		 * Only the first error message will be display.
		 * @param {string} sDetails a technical error to be displayed on request
		 * @private
		 */
		_showServiceError: function(sDetails) {
			if (this._bMessageOpen) {
				return;
			}

			// var jsonError, errorDetails, errorMessage = "";

			// try {
			// 	jsonError = JSON.parse(sDetails.responseText);
			// 	errorDetails = jsonError.error.innererror.errordetails;

			// 	for (var i in errorDetails) {
			// 		errorMessage += "\u2022 " + errorDetails[i].message + ".\n";
			// 	}
			// } catch (exception) {
			// 	var xmlDoc = $.parseXML( sDetails.responseText ),
			// 		$xml = $( xmlDoc ),
			// 		$errormessage = $xml.find( "message" );

			// 	errorMessage = $errormessage.text();
			// }

			// this._bMessageOpen = true;
			// MessageBox.error(errorMessage, {
			// 	id: "serviceErrorMessageBox",
			// 	details: sDetails,
			// 	actions: [MessageBox.Action.CLOSE],
			// 	onClose: function() {
			// 		this._bMessageOpen = false;
			// 	}.bind(this)
			// });
		}
	});
});