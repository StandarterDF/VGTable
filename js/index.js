Counter = 0
function HamsterCombat()
{
    if (Counter <= 8)
    {
        Counter++;
    }
    else 
    {
        document.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
}

function WeekOfYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return Math.ceil(day/7);
}

function SettingsButton() {
    document.location.href = "settings.html";
}
function FAQButton() {
    document.location.href = "faq.html";
}
function ShowCurrentTable(Group, Subgroup, DateSeparator, Data=TableTest) {
    if (Data.groups[Group]) {
        ArrayDates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        ArrayDatesRus = ["Понедельник", "Вторник", "Среда", "Чертверг", "Пятница", "Суббота"];
        CurrentDate = new Date();
        for (CDate of ArrayDates)
        {
            if (ArrayDates[CurrentDate.getDay() - 1] == CDate)
            {
                document.getElementById(CDate).insertAdjacentHTML("beforeEnd",
                    `<div class="WeekDay" id="WeekDay` + CDate + `" style="background-color: #ff9d90; color: black; margin-top: 10px;"> ${ArrayDatesRus[ArrayDates.indexOf(CDate)]} </div>`
                )
            } else {
                document.getElementById(CDate).insertAdjacentHTML("beforeEnd",
                    `<div style="black; margin-top: 10px;" class="WeekDay" id="WeekDay` + CDate + `"> ${ArrayDatesRus[ArrayDates.indexOf(CDate)]} </div>`
                )
            }
            //console.log(Data.groups[Group][DateSeparator][CDate].length)
            if (Data.groups[Group][DateSeparator][CDate].length !== undefined)
            {
                for (Lesson of Data.groups[Group][DateSeparator][CDate])
                {
                    var DateNow = new Date();
                    // console.log(`2024-01-01T`+`${DateNow.getHours()}:${DateNow.getMinutes()}` + ":00.000Z");
                    var DateNow = DateNow.getHours()*60+DateNow.getMinutes();
                    var DateStart = Number(Lesson[2].split(":")[0])*60 + Number(Lesson[2].split(":")[1])
                    var DateEnd =   Number(Lesson[3].split(":")[0])*60 + Number(Lesson[3].split(":")[1])
                    console.log(`Date Now (${CDate}) -> ${DateNow}`);
                    console.log(`Date Start (${CDate}) -> ${DateStart}`); 
                    console.log(`Date End (${CDate}) -> ${DateEnd}`); 
                    DayStyle = "background-color: #3D3D3D;";
                    if ((DateNow >= DateStart && DateNow <= DateEnd) && CDate === ArrayDates[CurrentDate.getDay() - 1])
                    {
                        DayStyle = "background-color: #973334;";
                    }
                    //console.log(DateStart);
                    //console.log(DateEnd);
                    if (Lesson[6] == Subgroup || Lesson[6] == 0)
                    {
                        document.getElementById(CDate).insertAdjacentHTML("beforeEnd",
                            `<div id="Lesson1" class="Lesson"> 
                                    <div class="upper"> 
                                        <div class="upnumber">${Lesson[0]}</div>
                                        <div class="uptime" style="${DayStyle}">${Lesson[2]} - ${Lesson[3]}</div>
                                    </div>
                                    <div class="middle"> 
                                        <div class="midtext">${Lesson[1]}</div>
                                    </div>
                                    <div class="bottom">
                                        <div class="teachname">${Lesson[4]}</div>
                                        <div class="classnum">${Lesson[5]}</div>
                                    </div>
                                </div>`
                        )
                    }
                }
            }
        }
    } else {
        var Banner = document.getElementById("Divider");
        Banner.innerText = "Пожалуйста, выставьте настройки!";
        Banner.style.height = "300px";
        Banner.style.fontSize = "50px";
        Banner.style.borderRadius = "25px";
        Banner.style.lineHeight = "300px";
    }
}
function ClearTable() {
    var ArrayDates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (CDate of ArrayDates) {
        document.getElementById(CDate).innerHTML = "";
    }
}
function ChangeDateSeparator() {
    if (document.getElementById("Divider").innerText === "Пожалуйста, выставьте настройки!") {
        document.location.href = "settings.html";
    } else {
        ClearTable();
        if (document.getElementById("Divider").innerText === "Числитель")
        {
            document.getElementById("Divider").innerText = "Знаменатель";
            ShowCurrentTable(
                localStorage.getItem("VGTable_GroupID"), 
                localStorage.getItem("VGTable_SubgroupID"), 
                "Denominator");
        }
        else if (document.getElementById("Divider").innerText === "Знаменатель") {
            document.getElementById("Divider").innerText = "Числитель";
            ShowCurrentTable(
                localStorage.getItem("VGTable_GroupID"), 
                localStorage.getItem("VGTable_SubgroupID"), 
                "Numerator");
        }
    }
}
function AutoStart() {
    var DateSeparator = localStorage.getItem("VGTable_DateseparatorID");
    //console.log("(VGTable_DateseparatorID): " + DateSeparator);
    var SplitSep = (localStorage.getItem("VGTable_DateseparatorID") === "Числитель" ? 0 : 1);
    if ((WeekOfYear() + SplitSep) % 2 == 0) {
        DateSeparator = "Numerator";
    } else {
        DateSeparator = "Denominator";
        document.getElementById("Divider").innerText = "Знаменатель";
    }
    ShowCurrentTable(
        localStorage.getItem("VGTable_GroupID"), 
        localStorage.getItem("VGTable_SubgroupID"), 
        DateSeparator);
}
AutoStart();