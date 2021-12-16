const myForm = document.querySelector('#my-form');
const tName = document.querySelector('#name');
const dNumber = document.querySelector('#diskInput');
const teamNum = document.querySelector('#TeamNum');
const battleMessage = document.querySelector('#battleMessage');
let tI = 1;
let competitorList = [];

class disk_trainer {
    constructor(trainerName, diskNumber, teamNumber){
        this.trainerName = trainerName;
        this.diskNumber = diskNumber;
        this.teamNumber = teamNumber;
    }

    getDiskSelection() {
        return this.diskNumber;
    }

    getTeamSelection() {
        return this.teamNumber;
    }

    getTrainerName() {
        return this.trainerName;
    }
}

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    if(tName.value === '' || dNumber.value === '' || teamNum.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    } else {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${tName.value} has chosen Disk ${dNumber.value} and is on Team ${teamNum.value}`));

        roster.appendChild(li);

        const Competitor = new disk_trainer(tName.value, dNumber.value, teamNum.value); 
        console.log(Competitor);
        competitorList.push(Competitor);
        console.log(competitorList);

        // clear fields
        tName.value = '';
        dNumber.value = '';
        teamNum.value = '';
    }

}

function diskA() {
    diskResultA = 3;
    // console.log(`Disk A spins 3`);
    return diskResultA;
}

function diskB() {
    diskSpinB = Math.random(1, 101) * 100;
    // console.log(`Disk B spins ${diskSpinB}`);
    if(diskSpinB <= 56) {
        diskResultB = 2;
    } else if(diskSpinB > 56 && diskSpinB < 79) {
        diskResultB = 4;
    } else {
        diskResultB = 6;
    }
    return diskResultB;
}

function diskC() {
    diskSpinC = Math.random(1, 101) * 100;
    // console.log(`Disk C spins ${diskSpinC}`);
    if(diskSpinC <= 51) {
        diskResultC = 1;
    } else {
        diskResultC = 5;
    }
    return diskResultC;
}

function battleTime() {
    if(document.querySelector("#battleMessage").getElementsByTagName("li").length >= 4){
        battleMessage.lastElementChild.remove();
        battleMessage.lastElementChild.remove();
        battleMessage.lastElementChild.remove();
    }

    function generateINT(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    i = generateINT(0, competitorList.length);
    // console.log(`i is ${i}`);
    ii = generateINT(0, competitorList.length);
    if (i == ii) {
        ii = generateINT(0, competitorList.length);
        if (i == ii) {
            ii = generateINT(0, competitorList.length);
        }
    }
    // console.log(`ii is ${ii}`);

    const contestant1 = competitorList[i];
    if (contestant1.getDiskSelection() == 1){
        battleNum1 = diskA();
        monster1 = 'Burgersaur';
    } else if (contestant1.getDiskSelection() == 2){
        battleNum1 = diskB();
        monster1 = 'Burritank';
    } else {
        battleNum1 = diskC();
        monster1 = 'Wartortilla';
    }
    // console.log(battleNum1);

    const contestant2 = competitorList[ii];
    if (contestant2.getDiskSelection() == 1){
        battleNum2 = diskA();
        monster2 = 'Burgersaur';
    } else if (contestant2.getDiskSelection() == 2){
        battleNum2 = diskB();
        monster2 = 'Burritank';
    } else {
        battleNum2 = diskC();
        monster2 = 'Wartortilla';
    }
    // console.log(battleNum2);

    if (battleNum1 > battleNum2) {
       resultMessage =  `${contestant1.getTrainerName()}'s level ${battleNum1} ${monster1} beat ${contestant2.getTrainerName()}'s level ${battleNum2} ${monster2}!`;
    } else {
       resultMessage = `${contestant2.getTrainerName()}'s level ${battleNum2} ${monster2} beat ${contestant1.getTrainerName()}'s level ${battleNum1} ${monster1}!`;
    }

    const li2 = document.createElement('li');
        li2.appendChild(document.createTextNode(resultMessage));

        battleMessage.appendChild(li2);

    return 0;
}

//issues to fix: ties occur with same disks, prevent user from entering non 1/2/3 disk
//things to add: win counter for specific people, make teams matter

/*
diskymon:
Disk A = 3 100%
Disk B = 6 22%; 4 22%; 2 56%
Disk C = 5 49%; 1 51%
*/