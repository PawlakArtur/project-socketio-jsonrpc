document.addEventListener("DOMContentLoaded", function() {
    var dataList = (function() {
        var socket = io.connect("http://jobsandbox.greatcare.pl:8056?sessionID=sesja1");
        var list = [];

        return {
            getSocket: function() {
                return socket;
            },
            setList: function(newList) {
                list = newList;
            },
            getList: function() {
                return list;
            }
        }
    })();

    function login() {
        var socket = dataList.getSocket();
        socket.emit("query", { jsonrpc: "2.0", "method": "login", "params": { "login": "root", "password": "12345" }, "id": 1});
        queryResult();
    }

    function getCustomerDetails() {
        var socket = dataList.getSocket();
        var customerId = window.location.search.substr(1);
        socket.emit("query", { jsonrpc: "2.0", "method": "CRM.query.getOrganization", "params": { "organizationID": customerId }, "id": 2});
    }

    function showCustomerDetails(customer) {
        var detailsElement = document.getElementsByClassName("customerDetails")[0];
        var customerName,
            customerAddressCountry,
            customerAddressState,
            customerAddressCity,
            customerAddressStreet,
            customerAddressPhone,
            customerAddressAnnotation,
            customerVatCounty,
            customerVatId,
            customerNameLabel,
            customerAddressCountryLabel,
            customerAddressStateLabel,
            customerAddressCityLabel,
            customerAddressStreetLabel,
            customerAddressPhoneLabel,
            customerAddressAnnotationLabel,
            customerVatCountyLabel,
            customerVatIdLabel;

        customerName = document.createElement("div");
        customerName.appendChild(document.createTextNode(customer.name));
        customerNameLabel = document.createElement("div");
        customerNameLabel.appendChild(document.createTextNode("Name:"));

        customerVatCounty = document.createElement("div");
        customerVatCounty.appendChild(document.createTextNode(customer.VATCountry));
        customerVatCountyLabel = document.createElement("div");
        customerVatCountyLabel.appendChild(document.createTextNode("VAT Country:"));

        customerVatId = document.createElement("div");
        customerVatId.appendChild(document.createTextNode(customer.VATID));
        customerVatIdLabel = document.createElement("div");
        customerVatIdLabel.appendChild(document.createTextNode("VAT ID:"));

        customerAddressCountry = document.createElement("div");
        customerAddressCountry.appendChild(document.createTextNode(customer.representativeAddress.country));
        customerAddressCountryLabel = document.createElement("div");
        customerAddressCountryLabel.appendChild(document.createTextNode("Country:"));

        customerAddressState = document.createElement("div");
        customerAddressState.appendChild(document.createTextNode(customer.representativeAddress.state));
        customerAddressStateLabel = document.createElement("div");
        customerAddressStateLabel.appendChild(document.createTextNode("Address State:"));

        customerAddressCity = document.createElement("div");
        customerAddressCity.appendChild(document.createTextNode(customer.representativeAddress.city));
        customerAddressCityLabel = document.createElement("div");
        customerAddressCityLabel.appendChild(document.createTextNode("Address City:"));

        customerAddressStreet = document.createElement("div");
        customerAddressStreet.appendChild(document.createTextNode(customer.representativeAddress.streetAddress));
        customerAddressStreetLabel = document.createElement("div");
        customerAddressStreetLabel.appendChild(document.createTextNode("Address Street:"));

        customerAddressPhone = document.createElement("div");
        customerAddressPhone.appendChild(document.createTextNode(customer.representativeAddress.landlinePhoneNumber));
        customerAddressPhoneLabel = document.createElement("div");
        customerAddressPhoneLabel.appendChild(document.createTextNode("Address Phone:"));

        customerAddressAnnotation = document.createElement("div");
        customerAddressAnnotation.appendChild(document.createTextNode(customer.representativeAddress.annotation));
        customerAddressAnnotationLabel = document.createElement("div");
        customerAddressAnnotationLabel.appendChild(document.createTextNode("Address Annotation:"));

        detailsElement.appendChild(customerNameLabel);
        detailsElement.appendChild(customerName);
        detailsElement.appendChild(customerAddressCountryLabel);
        detailsElement.appendChild(customerAddressCountry);
        detailsElement.appendChild(customerAddressStateLabel);
        detailsElement.appendChild(customerAddressState);
        detailsElement.appendChild(customerAddressCityLabel);
        detailsElement.appendChild(customerAddressCity);
        detailsElement.appendChild(customerAddressStreetLabel);
        detailsElement.appendChild(customerAddressStreet);
        detailsElement.appendChild(customerAddressPhoneLabel);
        detailsElement.appendChild(customerAddressPhone);
        detailsElement.appendChild(customerAddressAnnotationLabel);
        detailsElement.appendChild(customerAddressAnnotation);
        detailsElement.appendChild(customerVatCountyLabel);
        detailsElement.appendChild(customerVatCounty);
        detailsElement.appendChild(customerVatIdLabel);
        detailsElement.appendChild(customerVatId);
    }
    function queryResult() {
        var socket = dataList.getSocket();
        socket.on("queryResult", function (data) {
            console.log(data);
            switch (data.id) {
                case 1:
                    getCustomerDetails();
                    break;
                case 2:
                    showCustomerDetails(data.result);
                    break;
            }
        });
    }

    login();
});