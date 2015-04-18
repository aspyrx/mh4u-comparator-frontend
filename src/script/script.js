var ResultFieldsBow = {
    "rank": "Rank",
    "bow": "Bow",
    "htk": "HtK",
    "ctk": "CtK",
    "avg_dph": "Avg DpH",
    "dpc": "DpC",
    "split": "Split",
    "element": "Element",
    "coat_use": "Coat Use",
    "shot_info": "Shot Info"
};

var Monsters = {
    "great-jaggi": "Great Jaggi",
    "seltas": "Seltas",
    "nerscylla": "Nerscylla",
    "rathian": "Rathian"
};

var SkillsElemental = {
    "dragon-atk-1": "Dragon Attack +1",
    "dragon-atk-2": "Dragon Attack +2",
    "dragon-atk-3": "Dragon Attack +3",
    "fire-atk-1": "Fire Attack +1",
    "fire-atk-2": "Fire Attack +2",
    "fire-atk-3": "Fire Attack +3",
    "ice-atk-1": "Ice Attack +1",
    "ice-atk-2": "Ice Attack +2",
    "ice-atk-3": "Ice Attack +3",
    "thunder-atk-1": "Thunder Attack +1",
    "thunder-atk-2": "Thunder Attack +2",
    "thunder-atk-3": "Thunder Attack +3",
    "water-atk-1": "Water Attack +1",
    "water-atk-2": "Water Attack +2",
    "water-atk-3": "Water Attack +3",
};

var SkillsBow = {
    general: {
        "attack-up-s": "Attack Up (S)",
        "attack-up-m": "Attack Up (M)",
        "attack-up-l": "Attack Up (L)",
        "attack-up-xl": "Attack Up (XL)",
        "critical-eye-1": "Critical Eye +1",
        "critical-eye-2": "Critical Eye +2",
        "critical-eye-3": "Critical Eye +3",
        "critical-god": "Critical God",
        "normal-up": "Normal Up",
        "pellet-up": "Pellet Up",
        "pierce-up": "Pierce Up",
        "weakness-exploit": "Weakness Exploit"
    },
    misc: {
        "awaken": "Awaken",
        "load-up": "Load Up",
        "load-up-2-charge": "Load Up (natural 2-charge)",
        "use-c-range-c": "Use C.Range C",
        "use-power-c": "Use Power C"
    }
};

window.onload = function() {
    addSkills("bow");
    addMonsters();
    addResultHeadings("bow");
    addResult({
        "rank": "1",
        "bow": "Ukanlos Skyflier",
        "htk": "51",
        "ctk": "204",
        "avg_dph": "124",
        "dpc": "31",
        "split": "96/4",
        "element": "ice",
        "coat_use": "P:51/C:0/N:0",
        "shot_info": "Lv4 Rapid 5"
    }, "bow");
    $("#results").DataTable();
};

document.forms.comparator.onsubmit = function(e) {
    e.preventDefault();
    var formData = $(e.target).serializeArray();
    for (i = 0; i < formData.length; i++) {
        var data = formData[i];
        switch (data.name) {
            case "monster":
                setResultMonster(Monsters[data.value]);
                break;
        }
    }
    console.log(formData);
};

function setResultMonster(monster) {
    $("#results-monster").empty();
    document.getElementById("results-monster").appendChild(document.createTextNode(monster));
}

function addResultHeadings(weapon) {
    var fields;
    switch (weapon) {
        case "bow":
            fields = ResultFieldsBow;
            break;
        // extend for other weapons here later
    }

    var table = document.getElementById("results");
    var trHead = document.createElement("tr");
    var trFoot = document.createElement("tr");
    for (var key in fields) {
        var thHead = document.createElement("th");
        var thFoot = document.createElement("th");
        thHead.appendChild(document.createTextNode(fields[key]));
        thFoot.appendChild(document.createTextNode(fields[key]));
        trHead.appendChild(thHead);
        trFoot.appendChild(thFoot);
    }
    table.tHead.appendChild(trHead);
    table.tFoot.appendChild(trFoot);
}

function addResult(data, weapon) {
    var fields;
    switch (weapon) {
        case "bow":
            fields = ResultFieldsBow;
            break;
        // extend for other weapons here later
    }

    var table = document.getElementById("results");
    var tr = document.createElement("tr");
    for (var key in fields) {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(data[key]));
        tr.appendChild(td);
    }
    table.tBodies[0].appendChild(tr);
}

function addSkills(weapon) {
    var skillsWeapon;
    switch (weapon) {
        case "bow":
            skillsWeapon = SkillsBow;
            break;
        // extend for other weapons here later
    }

    function addSkillsElems(skills, id) {
        for (var key in skills) {
            var label = document.createElement("label");
            label.classList.add("btn");
            label.classList.add("btn-default");
            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("form", "comparator");
            input.setAttribute("name", "skills");
            input.setAttribute("value", key);
            label.appendChild(input);
            label.appendChild(document.createTextNode(skills[key]));
            document.getElementById(id).appendChild(label);
        }
    }

    $("#skills-elemental").empty();
    $("#skills-general").empty();
    $("#skills-misc").empty();
    addSkillsElems(SkillsElemental, "skills-elemental");
    addSkillsElems(skillsWeapon.general, "skills-general");
    addSkillsElems(skillsWeapon.misc, "skills-misc");
}

function addMonsters() {
    var select = document.getElementById("comparator-monster");
    $(select).empty();
    for (var key in Monsters) {
        var option = document.createElement("option");
        var optionText = document.createTextNode(Monsters[key]);
        option.setAttribute("value", key);
        option.appendChild(optionText);
        select.appendChild(option);
    }
}
