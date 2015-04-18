window.onload = function() {
    addSkills("bow")
};

function addSkills(weapon) {
    var skillsElemental = {
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
    var skillsBow = {
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

    var skillsWeapon;
    switch (weapon) {
        case "bow":
            skillsWeapon = skillsBow;
            break;
        // extend for other weapons here later
    }

    function addSkillsElems(skills, id) {
        for (var key in skills) {
            var div = document.createElement("div");
            div.classList.add("checkbox");
            var label = document.createElement("label");
            var input = document.createElement("input");
            var labelText = document.createTextNode(skills[key]);
            input.setAttribute("type", "checkbox");
            input.setAttribute("name", "skills");
            input.setAttribute("value", key);
            label.appendChild(input);
            label.appendChild(labelText);
            div.appendChild(label);
            document.getElementById(id).appendChild(div);
        }
    }

    addSkillsElems(skillsElemental, "skills-elemental");
    addSkillsElems(skillsWeapon.general, "skills-general");
    addSkillsElems(skillsWeapon.misc, "skills-misc");
}
