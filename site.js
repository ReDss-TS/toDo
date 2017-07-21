src = "//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"

function loadLits() {
    $.ajax({
        url: 'DBWorker.php',
        type: 'post',
        data: {
            "callSelect": 'go'
        },
        success: function(response) {
            var allLists = response;
            if (allLists != null) {
                var listContainer = document.getElementById('Lists');
                var data = JSON.parse(allLists);
                data.forEach(function(m) {
                    listContainer.innerHTML += '<div class="myList" id="' + m.ID + '"> <div id="myDIV" class="header2"> <h2 style="margin:5px" id="listTitle' + m.ID + '">' + m.Title + '</h2> <input type="text" id="myInput' + m.ID + '" placeholder="Title..."> <span onclick="newElement(' + m.ID + ')" class="addBtn">Add</span> </div> <div id="myDivBtn" class="btnControl"> <input type="button" value="Save" id="btnSaveId' + m.ID + '" onclick="saveState(' + m.ID + ')" class="cBtn"> <input type="button" value="Delete" onclick="deleteState(' + m.ID + ')" class="cBtn">  </div> <ul id="myUL' + m.ID + '"> </ul> </div> ';
                    var container = JSON.parse(m.Container);
                    var listElement = document.getElementById('myUL' + m.ID);
                    container.Container.item.forEach(function(el) {
                        listElement.innerHTML += '<li>' + el.name + '<span class="close">x</span></li>';
                        newElement(m.ID);
                    }, this);
                }, this);
            }
        }
    });
}

function saveState(idList) {
    var item = [];
    var idUL = document.getElementById('myUL' + idList);
    var listItems = idUL.getElementsByTagName('li');
    for (var i = 0; i < listItems.length; i++) {
        var listItem = listItems[i];
        var checked = false;
        if (listItem.className === "checked") {
            checked = true;
        }
        var itemName = listItem.innerText;
        itemName = itemName.substr(0, itemName.length - 1);
        // var checkedValue = $('#listItem').is(":checked");
        item.push({
            name: itemName,
            checked: checked
        });
    }
    var ID = idList;
    var Title = document.getElementById("listTitle" + idList + "").innerHTML;
    var todo = {
        Container: {
            item: item
        }
    };
    var res = JSON.stringify(todo);
    $.ajax({
        url: "DBWorker.php",
        type: 'post',
        dataType: "json",
        data: {
            "callUpdate": ID,
            "title": Title,
            "r": res
        },
        error: function(error) {
            alert(error);
        }
    });
}

function deleteState(idList) {
    var ID = idList;
    $.ajax({
        url: 'DBWorker.php',
        type: 'post',
        data: {
            "callDelete": ID
        },
        error: function(error) {
            alert(error);
        }
    });
    var delList = document.getElementById(idList);
    delList.parentNode.removeChild(delList);
}
// function editList() {
// }
// Create a new list item when clicking on the "Add" button
function newElement(idList) {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput" + idList).value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {} else {
        document.getElementById("myUL" + idList).appendChild(li);
    }
    document.getElementById("myInput" + idList).value = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            this.parentElement.parentElement.removeChild(this.parentElement);
            // var div = this.parentElement;
            // div.style.display = "none";
        }
    }
}
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("mClose")[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function newList() {
    var titleList = document.getElementById("titleOfList").value;
    $.ajax({
        url: 'DBWorker.php',
        type: 'post',
        data: {
            "callInsert": titleList
        },
        success: function(response) {
            var idList = response;
            if (idList != null) {
                var foo = document.getElementById('Lists');
                foo.innerHTML += '<div class="myList" id="' + idList + '"> <div id="myDIV" class="header2"> <h2 style="margin:5px" id="listTitle' + idList + '">' + titleList + '</h2> <input type="text" id="myInput' + idList + '" placeholder="Title..."> <span onclick="newElement(' + idList + ')" class="addBtn">Add</span> </div> <div id="myDivBtn" class="btnControl"> <input type="button" value="Save" id="btnSaveId' + idList + '" onclick="saveState(' + idList + ')" class="cBtn"> <input type="button" value="Delete" onclick="deleteState(' + idList + ')" class="cBtn">  </div> <ul id="myUL' + idList + '"> </ul> </div> ';
            }
        }
    });
}
loadLits();
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);