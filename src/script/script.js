var CurrentWeapon;

var Weapons = {
    "bow": {
        resultFields: {
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
        },
        skills: {
            general: {
                "attack-up-s": "Attack Up +S",
                "attack-up-m": "Attack Up +M",
                "attack-up-l": "Attack Up +L",
                "attack-up-xl": "Attack Up +XL",
                "critical-eye-1": "Critical Eye +1",
                "critical-eye-2": "Critical Eye +2",
                "critical-eye-3": "Critical Eye +3",
                "critical-eye-god": "Critical Eye +God",
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
        }
    }
}

var Monsters = {
    "great-jaggi": {
        "name": "Great Jaggi",
        "hp": "2600"
    },
    "seltas": {
        "name": "Seltas",
        "hp": "2000"
    },
    "nerscylla": {
        "name": "Nerscylla",
        "hp": "3900"
    },
    "rathian": {
        "name": "Rathian",
        "hp": "4500"
    }
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

window.onload = function() {
    setCurrentWeapon(Weapons.bow);
    setMonsters();
};

function setCurrentWeapon(weapon) {
    CurrentWeapon = weapon;
    setSkills(weapon);
    setResultFields(weapon);
}

document.forms.comparator.onsubmit = function(e) {
    e.preventDefault();
    $("#comparator-submit").button("loading");
    var formData = $(e.target).serializeArray();

    // pretend an ajax request is happening
    window.setTimeout(function() {
        for (i = 0; i < formData.length; i++) {
            var data = formData[i];
            switch (data.name) {
                case "monster":
                    setResultMonster(Monsters[data.value]);
                    break;
            }
        }

        clearResults();
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

        $("#comparator-submit").blur().button("reset");
        showResults(true);
        console.log(formData);
    }, 1500);
};

function showResults(show) {
    var resultsContainer = document.getElementById("results-container")
    if (show) {
        $("#results").DataTable().draw();
        resultsContainer.classList.remove("hidden")
    } else {
        resultsContainer.classList.add("hidden")
    }
}

function setResultMonster(monster) {
    var resultsMonster = document.getElementById("results-monster");
    $(resultsMonster).empty();
    var small = document.createElement("small");
    small.appendChild(document.createTextNode(monster.hp + " HP"));
    resultsMonster.appendChild(document.createTextNode(monster.name + " "));
    resultsMonster.appendChild(small);
}

function setResultFields(weapon) {
    var fields = weapon.resultFields;
    var columns = [];
    for (var key in fields) {
        columns.push({
            data: key,
            title: fields[key]
        });
    }

    $("#results").DataTable({
        columns: columns,
    });
}

function clearResults() {
    $("#results").DataTable().clear();
}

function addResult(data, weapon) {
    $("#results").DataTable().row.add(data);
}

function setSkills(weapon) {
    function addSkillsElems(skills, id) {
        var groups = {};
        for (var key in skills) {
            var group;
            var groupName = skills[key];
            var idx = groupName.indexOf("+");
            if (idx >= 0) {
                var groupName = groupName.substr(0, idx);
            }

            if (groups[groupName] !== undefined) {
                group = groups[groupName];
            } else {
                group = document.createElement("div");
                group.classList.add("form-group", "btn-group", "full-width");
                group.setAttribute("data-toggle", "buttons");
                if (idx >= 0) {
                    var label = document.createElement("label");
                    label.classList.add("btn", "btn-default");
                    label.setAttribute("disabled", "");
                    label.appendChild(document.createTextNode(groupName));
                    group.appendChild(label);
                }

                document.getElementById(id).appendChild(group);
                groups[groupName] = group;
            }

            var label = document.createElement("label");
            label.classList.add("btn", "btn-default");
            var input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("form", "comparator");
            input.setAttribute("name", "skills");
            input.setAttribute("value", key);
            input.setAttribute("autocomplete", "off");
            label.appendChild(input);
            label.appendChild(document.createTextNode(idx >= 0 ? skills[key].substr(idx) : skills[key]));
            group.appendChild(label);

            $(label).click(function() {
                if (!this.classList.contains("active")) {
                    var $siblings = $(this).siblings();
                    for (var i = 0; i < $siblings.length; i++) {
                        var sibling = $siblings[i];
                        if (sibling.classList.contains("active")) {
                            $(sibling).button("toggle");
                        }
                    }
                }
            });
        }
    }

    $("#skills-elemental").empty();
    $("#skills-general").empty();
    $("#skills-misc").empty();
    addSkillsElems(SkillsElemental, "skills-elemental");
    addSkillsElems(weapon.skills.general, "skills-general");
    addSkillsElems(weapon.skills.misc, "skills-misc");
}

function setMonsters() {
    var select = document.getElementById("comparator-monster");
    $(select).empty();
    for (var key in Monsters) {
        var option = document.createElement("option");
        var optionText = document.createTextNode(Monsters[key].name);
        option.setAttribute("value", key);
        option.appendChild(optionText);
        select.appendChild(option);
    }
}
