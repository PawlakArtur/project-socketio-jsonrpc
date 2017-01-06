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
        socket.emit("query", { jsonrpc: "2.0", "method": "login", "params": {"login": "root", "password": "12345"}, "id": 1});
        queryResult();
    }

    function getCustomersList() {
        var socket = dataList.getSocket();
        socket.emit("query", { jsonrpc: "2.0", "method": "CRM.query.getOrganizationList", "id": 2});
    }

    function showCustomers() {
        var list = dataList.getList();
        var customerContainer = document.getElementsByClassName("customer-list")[0];
        var customerList = customerContainer.getElementsByTagName("ul")[0];
        var customerElement,
            customerLink;
        for(var customer in list) {
            customerElement = document.createElement("li");
            customerLink = document.createElement("a");
            customerLink.setAttribute("href", "/details.html?" + list[customer].organizationID);
            customerLink.appendChild(document.createTextNode(list[customer].name));
            customerElement.appendChild(customerLink);
            customerList.appendChild(customerElement);
        }
    }

    function queryResult() {
        var socket = dataList.getSocket();
        socket.on("queryResult", function (data) {
            console.log(data);
            switch (data.id) {
                case 1:
                    getCustomersList();
                    break;
                case 2:
                    dataList.setList(data.result);
                    showCustomers();
                    break;
            }
        });
    }
    login();
});