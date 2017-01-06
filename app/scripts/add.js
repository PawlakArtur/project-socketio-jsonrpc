document.addEventListener("DOMContentLoaded", function() {
    var dataList = (function() {
        var socket = io.connect("http://jobsandbox.greatcare.pl:8056?sessionID=sesja1");

        return {
            getSocket: function() {
                return socket;
            }
        }
    })();

    function login() {
        var socket = dataList.getSocket();
        socket.emit("query", { jsonrpc: "2.0", "method": "login", "params": {"login": "root", "password": "12345"}, "id": 1});
        queryResult();
    }

    function queryResult() {
        var socket = dataList.getSocket();
        socket.on("queryResult", function (data) {
            console.log(data);
            switch (data.id) {
                case 1:
                    console.log("logged");
                    break;
            }
        });
    }

    function addEvents() {
        var addForm = document.getElementById("addCustomer");
        addForm.addEventListener("submit", function(e){
            e.preventDefault();
            var socket = dataList.getSocket();
            socket.emit("query", { jsonrpc: "2.0", "method": "CRM.command.createOrganization", "params": {
                "organizationID": ((Math.random() * 1000000) + 1) + "",
                "name": e.target[0].value,
                "representativeAddress": {
                    "country": e.target[1].value,
                    "state": e.target[2].value,
                    "city": e.target[3].value,
                    "streetAddress": e.target[4].value,
                    "landlinePhoneNumber": e.target[5].value,
                    "annotation": e.target[6].value
                },
                "VATCountry": e.target[7].value,
                "VATID": e.target[8].value,
                "ownerRoleID": "8aabc854-5b6a-4c3c-8fd7-8ec8ee832dec"
            }
            });
            var inputs = document.querySelectorAll("input[type='text'']");
            for(var input in inputs) {
                inputs[input].value = "";
            }
        });
    }

    login();
    addEvents();
});