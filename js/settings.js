function TextToCookie(Param1, Param2) {
    var DateNow = new Date();
    DateNow.setDate(DateNow.getDate() + 999);
    return String(Param1) + "=" + String(Param2) + ";expires=" + DateNow.toUTCString() + ";";
} 
function SaveSettings() {
    var ID_List = ["VGTable_GroupID", "VGTable_SubgroupID", "VGTable_DateseparatorID", "VGTable_ThemeID", "VGTable_DebugID"];
    var GroupID = document.getElementById("GroupID");
    var SubgroupID = document.getElementById("SubgroupID");
    var DateseparatorID = document.getElementById("DateseparatorID");
    var ThemeID = document.getElementById("ThemeID");
    var DebugID = document.getElementById("DebugID");
    var elements = [GroupID, SubgroupID, DateseparatorID, ThemeID, DebugID];
    elements.forEach(function (element) {
        localStorage.setItem("VGTable_"+element.id, element.value);
    });
    console.log(GroupID);
    console.log(SubgroupID);
    console.log(DateseparatorID);
    console.log(ThemeID);
    console.log(document.cookie)
}

function VGTable()
{
    document.location.href = "index.html";
}
function SettingsButton() {
    document.location.href = "settings.html";
}
function FAQButton() {
    document.location.href = "faq.html";
}
function AutoStart()
{
    // Получаем список элементов в виде массива
    const elementIDs = ["VGTable_GroupID", "VGTable_SubgroupID", "VGTable_DateseparatorID", "VGTable_ThemeID", "VGTable_DebugID"];
    var GroupsID = document.getElementById("GroupID");
    // Цикл по элементам в массиве
    for (let i = 0; i < elementIDs.length; i++) {
        const elementID = `${elementIDs[i]}`;

        // Проверяем наличие этого элемента в LocalStorage
        if (!localStorage.getItem(elementID)) {
            // Если элемента нет в LocalStorage, добавляем их с значением 0
            localStorage.setItem(elementID, 1);
        }
    }
    var AllGroups = Object.keys(TableTest["groups"]);
    console.log(AllGroups);
    for (i = 0; i <= AllGroups.length; i++)
    {
        if (localStorage.getItem("VGTable_GroupID") != AllGroups[i])
        {
            GroupsID.insertAdjacentHTML("beforeEnd", `<Option>${AllGroups[i]}</Option>`);
        }
        else 
        {
            GroupsID.insertAdjacentHTML("beforeEnd", `<Option selected>${AllGroups[i]}</Option>`);
        }
    }
    if (localStorage.getItem("VGTable_DateseparatorID") === "Числитель") {
        document.getElementById("DateseparatorID_1").selected = "selected";
    } else {
        document.getElementById("DateseparatorID_2").selected = "selected";
    }
    document.getElementById("SubgroupID").getElementsByTagName("option")[Number(localStorage.getItem("VGTable_SubgroupID")) - 1].selected = "selected";
}
AutoStart();