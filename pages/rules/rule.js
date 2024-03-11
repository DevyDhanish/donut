const ruleBlockHolder = document.getElementById("rule-view-block");
const ruleAddRuleBtn = document.getElementById("rule-add-button");
let ruleCount = 0;
let ruleSelectCount = 0;
let ruleHolder = [];
let ruleBuffer = [];

const ruleSet = [
    {
        "select" : [ "select", "if" ]
    },
    {
        "select" : ["select"],
        "if" : [ "select", "connType", ]
    },
    {
        "select" : ["select"],
        "connType" : ["select", "5g", "4g"],
        "Speed" : ["select", "30", "40", "10" ],
    },
    {
        "select" : ["select", "then"],
    },
    {
        "select" : ["select", "exec", "disConn", "Conn", "notify"],
    },
    {
        "select" : [ "done" ],
    }
]

// gives us a select block options will be the ruleset provided
function getRuleBlock(_ruleset)
{
    const ruleDropDownMenu = document.createElement("select");

    for(var i = 0; i < _ruleset.length; i++)
    {
        var ruleOption = document.createElement("option");
        ruleOption.value = _ruleset[i];
        ruleOption.innerHTML = ruleOption.value;
        ruleDropDownMenu.appendChild(ruleOption);
    }

    return ruleDropDownMenu;
}

function createRuleBlock(blockToAttachTo, _ruleSet)
{
    if(ruleSelectCount >= ruleSet.length - 1)
    {
        var args = document.getElementById("args" + (ruleCount - 1));
        ruleBuffer.push(args.value);
        ruleHolder.push(ruleBuffer);
        ruleBuffer = [];
        console.log(ruleHolder);

        const ruleCreated = new Event("ruleCreated", () => {})
        document.dispatchEvent(ruleCreated);
        
        return;
    }

    let ruleSelect = getRuleBlock(_ruleSet);
    blockToAttachTo.appendChild(ruleSelect);

    ruleSelect.addEventListener("change", (event) => {

        ruleSelectCount++;
        ruleBuffer.push(event.target.value);
        if(ruleSet[ruleSelectCount][event.target.value])
        {
            createRuleBlock(blockToAttachTo, ruleSet[ruleSelectCount][event.target.value]);
        }
        else
        {
            createRuleBlock(blockToAttachTo, ruleSet[ruleSelectCount]["select"]);
        }
    }) 
}

ruleAddRuleBtn.addEventListener("click", () => {

    ruleSelectCount = 0;
    // create new div add all the drop down to the div
    var ruleBlockDiv = document.createElement("div");
    var ruleBlockId = document.createElement("p");
    var inputBlock = document.createElement("input");
    inputBlock.type = "text";
    inputBlock.id = "args" + ruleCount;
    inputBlock.placeholder = "Cmd here if any rule ends with exec";

    ruleBlockId.innerHTML = ruleCount;
    ruleBlockDiv.className = "rule-block";
    ruleBlockDiv.appendChild(ruleBlockId);
    ruleBlockDiv.appendChild(inputBlock);

    createRuleBlock(ruleBlockDiv, ruleSet[0]["select"]);

    // then add the div to the main block

    ruleBlockHolder.appendChild(ruleBlockDiv);

    ruleCount++;
})

document.addEventListener("ruleCreated", () => {
    console.log("rule created");

    var data = {
        "rules" : []
    }

    data["rules"] = ruleHolder;

    window.donut.writeToFile("./rules.json", data);
})

window.donut.loadFromFile("./rules.json");

window.donut.getFileData((data) => {
    var ruleData = data["rules"];
    ruleHolder = ruleData;

    for(let i = 0; i < ruleData.length; i++)
    {
        ruleSelectCount = 0;
        // create new div add all the drop down to the div
        var ruleBlockDiv = document.createElement("div");
        var ruleBlockId = document.createElement("p");
        var inputBlock = document.createElement("input");
        inputBlock.type = "text";
        inputBlock.id = "args" + ruleCount;
        inputBlock.placeholder = "Cmd here if any rule ends with exec";
    
        ruleBlockId.innerHTML = ruleCount;
        ruleBlockDiv.className = "rule-block";
        ruleBlockDiv.appendChild(ruleBlockId);
        ruleBlockDiv.appendChild(inputBlock);


        for(let j = 0; j < ruleData[i].length; j++)
        {
            var selectItem = document.createElement("select");
            var option = document.createElement("option")
            option.selected = true;

            option.value = ruleData[i][j];
            option.innerHTML = ruleData[i][j];

            selectItem.appendChild(option);

            ruleBlockDiv.appendChild(selectItem);
        }
    
        ruleBlockHolder.appendChild(ruleBlockDiv);
    
        ruleCount++;
    }
})