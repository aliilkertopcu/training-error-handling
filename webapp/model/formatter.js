sap.ui.define([
], function () {
    "use strict";
    return {
        capitalizeFirstLetter: function (sString) {
            if (sString) {
                return sString.charAt(0).toUpperCase() + sString.slice(1);
            }
        }
    }
});