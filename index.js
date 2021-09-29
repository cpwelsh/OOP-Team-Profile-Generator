const inquirer = require('inquirer');
const fs = require('fs')
const InputPrompt = require('inquirer/lib/prompts/input');
let managerInfo = null
const engineerInfo = []
const internInfo = []
const cardTemplate = `

<div class="card" style="width: 18rem;">
<div class="card-body">
    <h5 class="card-title">$TITLE</h5>
    <ul>
        $VALUES
    </ul>
</div>
</div>

`
const menu = [{
    type: 'list',
    name: 'addMember',
    message: 'Do you want to add an engineer or intern or finish building your team?',
    choices: ['Engineer', 'Intern', 'Finish Team']
}]
const internPrompt = [{
    type: 'input',
    name: 'internName',
    message: 'What is the Interns name?'
}, {
    type: 'input',
    name: 'internID',
    message: 'What is the Interns employee ID?'
}, {
    type: 'input',
    name: 'internEmail',
    message: 'What is the Interns email address?'
}, {
    type: 'input',
    name: 'internSchool',
    message: 'What is the Interns school?'
}]
const engineerPrompt = [{
    type: 'input',
    name: 'engineerName',
    message: 'What is the engineer name?'
}, {
    type: 'input',
    name: 'engineerID',
    message: 'What is the enginners employee ID?'
}, {
    type: 'input',
    name: 'engineerGit',
    message: 'What is the Engineers GitHub Username?'
}]

inquirer.prompt([{
    type: 'input',
    name: 'managerName',
    message: 'What is the managers name?'
}, {
    type: 'input',
    name: 'managerID',
    message: 'What is the managers employee ID?'
}, {
    type: 'input',
    name: 'managerEmail',
    message: 'What is the managers email address?'
}, {
    type: 'input',
    name: 'managerNumber',
    message: 'What is the managers office number?'
}])
    .then((answers) => {

    
        const managerName = answers.managerName
        const managerID = answers.managerID
        const managerEmail = answers.managerEmail
        const managerNumber = answers.managerNumber

        managerInfo = { title: 'Manager', info: { managerName, managerID, managerEmail, managerNumber } }

        promptForInput()
    })

function generateCardHTML(info, title) {

    let list = ''

    for (let value of Object.values(info)) {

        list += `<li>${value}</li> `
    }

    let cardHTML = cardTemplate.replace('$VALUES', list).replace('$TITLE', title)

    return cardHTML


    console.log(cardsHtml)

}

async function promptForInput() {
    inquirer.prompt(menu)
        .then((answers) => {

            //Determine what to prompt...
            let prompt = null

            const addMember = answers.addMember

            if (addMember == 'Finish Team') {
                //Done prompting...

                let list = [managerInfo].concat(engineerInfo, internInfo)

                console.log(list)
                console.log(engineerInfo)
                console.log(internInfo)

                let allCardsHTML = ''

                for (let info of list) {
                    allCardsHTML += generateCardHTML(info.info, info.title)
                }

                //Write files to HTML
                let contents = fs.readFileSync('template.html').toString().replace('$CARDS', allCardsHTML)
                fs.writeFileSync('index.html', contents)

                console.log(contents)
                return
            } else if (addMember == 'Engineer') {
                prompt = engineerPrompt
            } else if (addMember == 'Intern') {
                prompt = internPrompt
            }

            inquirer.prompt(prompt)
                .then((answers) => {
                    if (addMember == 'Engineer') {
                        const engineerName = answers.engineerName
                        const engineerID = answers.engineerID
                        const engineerGit = answers.engineerGit
                        engineerInfo.push({ title: 'Enginner', info: { engineerName, engineerID, engineerGit } })
                    } else if (addMember == 'Intern') {
                        const internName = answers.internName
                        const internEmail = answers.internEmail
                        const internID = answers.internID
                        const internSchool = answers.internSchool
                        internInfo.push({ title:'Intern', info: { internName, internEmail, internID, internSchool } })
                    }

                    promptForInput()
                })
        })
}