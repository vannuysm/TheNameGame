(function() {
    let allProfiles;
    let selectedAnswer;
    let keymap = {
        49: 1, 50: 2, 51: 3, 52: 4, 53: 5,
        97: 1, 98: 2, 99: 3, 100: 4, 101: 5
    };

    document.addEventListener('keypress', event => {
        let key = keymap[event.which];
        if (key == null) {
            return;
        }

        event.preventDefault();
        let profile = document.querySelector(`.profile:nth-child(${key})`);
        profile.click();
    });

    document.querySelectorAll('.play-again').forEach(element => {
        element.addEventListener('click', event => {
            let button = event.currentTarget;
            let gameMode = button.dataset.gameMode;

            clearGameBoard();
            play(gameMode);
        })
    });

    (async function() {
        allProfiles = await getAllProfiles();
        play();
    })();

    function attachListeners() {
         document.querySelectorAll('.profile').forEach(element => {
            element.addEventListener('click', evaluateAnswer);
        });
    }

    function clear(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function clearGameBoard() {
        clear(document.getElementById('game-board-header'));
        clear(document.getElementById('game-board'));
    }

    function evaluateAnswer(event) {
        let profileElement = event.currentTarget;
        let profileId = profileElement.dataset.profileId;
        
        profileElement.querySelector('.name').style.visibility = 'visible';

        if (profileId == selectedAnswer.id) {
            profileElement.classList.add('right');
        }
        else {
            profileElement.classList.add('wrong');
        }
    }

    async function getAllProfiles() {
        let profilesCache = localStorage.getItem('profiles');

        if (profilesCache != null) {
            return JSON.parse(profilesCache);
        }

        try {
            let response = await fetch('https://willowtreeapps.com/api/v1.0/profiles/');
            let json = await response.json();

            let profiles = json.items.filter(isValidProfile);
            localStorage.setItem('profiles', JSON.stringify(profiles));

            return profiles;
        }
        catch (e) {
            console.error('Something went wrong while retrieving profiles.', e);
            return [];
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomProfiles(profiles) {
        let profileIndices = [];
        let max = profiles.length;

        if (max < 5) {
            return profiles;
        }

        while (profileIndices.length < 5) {
            let index = getRandomInt(0, max);

            if (!profileIndices.includes(index)) {
                profileIndices.push(index);
            }
        }

        let randomProfiles = [];
        profileIndices.forEach(index => randomProfiles.push(profiles[index]));

        return randomProfiles;
    }

    function isNullishOrEmpty(value) {
        return value == null || value === '';
    }

    function isValidProfile(profile) {
        if (profile.headshot == null) {
            return false;
        }

        if (isNullishOrEmpty(profile.headshot.url)) {
            return false;
        }

        return true;
    }

    function play(mode) {
        switch (mode) {
            case 'mat*':
                playMatSplat();
                break;
            case 'team':
                playTeam();
                break;
            default:
                playDefault();
                break;
        }
    }

    function playDefault() {
        let profiles = getRandomProfiles(allProfiles);

        start(profiles);
    }

    function playMatSplat() {
        let matSplatProfiles = allProfiles.filter(profile => profile.firstName.toLowerCase().startsWith('mat'));
        let profiles = getRandomProfiles(matSplatProfiles);

        start(profiles);
    }

    function playTeam() {
        let currentEmployeeProfiles = allProfiles.filter(profile => !isNullishOrEmpty(profile.jobTitle));
        let profiles = getRandomProfiles(currentEmployeeProfiles);

        start(profiles);
    }

    function renderAnswer(profiles) {
        let template = document.getElementById('template-selected');
        template.content.querySelector('.selected-name').innerText = `${selectedAnswer.firstName} ${selectedAnswer.lastName}`;

        renderTemplate('game-board-header', template);
    }

    function renderProfiles(profiles) {
        let number = 1;

        profiles.forEach(profile => {
            let template = document.getElementById('template-profile');

            template.content.querySelector('.profile').dataset.profileId = profile.id;
            template.content.querySelector('img').src = profile.headshot.url;
            template.content.querySelector('.name').innerText = `${profile.firstName} ${profile.lastName}`;
            template.content.querySelector('.number').innerText = number;

            renderTemplate('game-board', template);
            number++;
        });
    }

    function renderTemplate(placementId, template) {
        let gameBoard = document.getElementById(placementId);
        let rendered = document.importNode(template.content, true);

        gameBoard.appendChild(rendered);
    }

    function start(profiles) {
        if (profiles == null || profiles.length === 0) {
            alert('Could not start the game because there are no profiles.');
        }

        let max = profiles.length - 1;
        selectedAnswer = profiles[getRandomInt(0, max)];

        renderAnswer(profiles);
        renderProfiles(profiles);
        attachListeners();
    }
})();

