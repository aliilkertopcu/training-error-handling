sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/prodea/training/employeeapp2/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter) {
        "use strict";
        return Controller.extend("com.prodea.training.employeeapp2.controller.Employee", {
            formatter: formatter,
            onInit: function () {
                var oTable = this.getView().byId("idTable");

                var oJsonModel = new sap.ui.model.json.JSONModel({});
                this.getView().setModel(oJsonModel, "json");

                oTable.attachUpdateFinished(function(sString){
                    console.log("değişken fonksiyonu çalıştı" + "parametre: " + sString);
                });
            },

            /**
             * @override
             */
            onAfterRendering: function() {
                var oModel = this.getView().getModel("oDataModel");
                var oJsonModel = this.getView().getModel("json");
            
                oModel.read("/EmployeeSet", {
                    success: function(oData, response){
                        oJsonModel.setData(oData);
                        
                        var oResponseMessageStructure = JSON.parse(response.headers["sap-message"]);
                        var aMessages = oResponseMessageStructure.details;
                        delete oResponseMessageStructure.details;
                        aMessages.push(oResponseMessageStructure);
                        
                        oJsonModel.setProperty("/messages", aMessages)
                    },

                    

                    
                    error: function(oData){

                    }
                });
            },

            openPopover: function(oEvent){
                this.byId("idMessagePopover").openBy(oEvent.getSource())
            }
        });
    });
