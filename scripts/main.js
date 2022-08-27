document.body.style.fontFamily = "montserrat";
document.body.style.backgroundColor = "#ebebeb";

let header = document.querySelector('#countries');

let title = document.querySelector('h2');
title.style.textAlign = "center";
title.style.color = "#fe9c2b";
title.style.fontSize = "2rem";
title.style.marginBottom = "0px";
title.style.letterSpacing = ".3rem";

let text1 = document.querySelector('.subtitle');
text1.textContent = "Currently, we have ";
text1.style.fontSize = ".9rem";
text1.style.textAlign = "center";
text1.style.marginTop = "1vh";

let text2 = document.createElement('span');
text1.appendChild(text2);
text2.textContent = "250 countries";

/* BUTTONS */
let btnWrapper = document.querySelector('.graph-buttons');
btnWrapper.style.display = "flex";
btnWrapper.style.alignItems = "center";
btnWrapper.style.justifyContent = "center";
btnWrapper.style.width = "100%";
btnWrapper.style.backgroundColor = "#ffffff";

let populationBtn = document.querySelector('.population');
populationBtn.style.backgroundColor = "#e37b05";
populationBtn.style.border = "none";
populationBtn.style.margin = "1rem .5rem";
populationBtn.style.padding = "2vh 1.5vw";

let languagesBtn = document.querySelector('.languages');
languagesBtn.style.backgroundColor = "#fe9c2b";
languagesBtn.style.border = "none";
languagesBtn.style.margin = "1rem .5rem";
languagesBtn.style.padding = "2vh 1.5vw";

/* DINAMIC TITLE */
let graphTitle = document.querySelector('.graph-title');
graphTitle.style.textAlign = "center";
graphTitle.style.fontSize = ".8rem";
graphTitle.style.marginTop = "0px";
graphTitle.style.paddingBottom = "1rem";
graphTitle.style.width = "100%";
graphTitle.style.backgroundColor = "#ffffff";

/* GRID CONTAINER */
let graphs = document.querySelector('.graphs-pop');
graphs.style.display = "grid";
graphs.style.gridTemplateColumns = "repeat(3, 1fr)";
graphs.style.margin = "0 auto";

let nameContainer;
let graphWrapper;
let numberContainer;

function createGridItems(){
    /* COUNTRY NAME/LANGUAGE NAME */
    nameContainer = document.createElement('div');
    nameContainer.classList = "country-name-container";
    nameContainer.style.gridColumn = "1 / 2";
    nameContainer.style.display = "grid";
    nameContainer.style.gridTemplateRows = "repeat(11, 1fr)";
    graphs.appendChild(nameContainer);

    /* GRAPHICS */
    graphWrapper = document.createElement('div');
    graphWrapper.classList = 'graph-wrapper';
    graphWrapper.style.gridColumn = "2 / 3";
    graphWrapper.style.paddingTop = "2.2vh";
    graphWrapper.style.display = "grid";
    graphWrapper.style.gridTemplateRows = "repeat(11, 1fr)";
    graphs.appendChild(graphWrapper);

    /* NUMBERS */
    numberContainer = document.createElement('div');
    numberContainer.classList = "country-population-container";
    numberContainer.style.gridColumn = "3 / 4"
    numberContainer.style.display = "grid";
    numberContainer.style.gridTemplateRows = "repeat(11, 1fr)";
    graphs.appendChild(numberContainer);
}
createGridItems();


/* ---------- POPULATION ---------- */
/* TOTAL POPULATION */
let counter = 0;
function totalPopulation(arr){
    for(item of arr){
        counter += item.population;
    }
    let worldName = document.createElement('p');
    worldName.textContent = "World";
    worldName.style.textAlign = "center";
    worldName.classList = "world-country-name";
    nameContainer.appendChild(worldName);

    let worldPopulation = document.createElement('p');
    worldPopulation.textContent = counter;
    worldPopulation.classList = "world-population-number";
    worldPopulation.style.textAlign = "center";
    numberContainer.appendChild(worldPopulation);

    let worldProgressBar = document.createElement('progress');
    worldProgressBar.classList = "world-progress-bar";
    worldProgressBar.style.width = "25vw";
    worldProgressBar.style.height = "5vh";
    worldProgressBar.style.marginBottom = ".5vh"; 
    worldProgressBar.max = counter;
    worldProgressBar.value = counter;
    graphWrapper.appendChild(worldProgressBar);
}

/* MOST POPULATED SORTED */
function tenMostPopulatedDefault(arr){
    counter = 0;
    graphTitle.textContent = "10 Most Populated Countries In The World";
    totalPopulation(arr);
    countries_data.sort(function (a,b){
        if (a.population > b.population) return -1;
        if(a.population < b.population) return 1;
        return 0;
    })
    for (let i = 0; i < 10; i++){
        let arrName = document.createElement('p');
        arrName.textContent = arr[i].name;
        arrName.classList = "country-name";
        arrName.style.textAlign = "center";
        nameContainer.appendChild(arrName);
        
        let arrPopulation = document.createElement('p');
        arrPopulation.classList = "population-number";
        arrPopulation.textContent = arr[i].population;
        arrPopulation.style.textAlign = "center";
        numberContainer.appendChild(arrPopulation);

        let progressBar = document.createElement('progress');
        progressBar.classList = "progress-bar";
        progressBar.style.width = "25vw";
        progressBar.style.height = "5vh";
        progressBar.style.marginBottom = ".5vh";        
        progressBar.max = counter;
        progressBar.value = arr[i].population;
        graphWrapper.appendChild(progressBar);
    }
}
tenMostPopulatedDefault(countries_data);


/* ---------- LANGUAGES ---------- */
function mostSpokenLanguages(arr,num){
    graphTitle.textContent = "10 Most Spoken Languages In The World";
    let languagesArr = [];
    for(let i = 0; i < arr.length; i++){
        let languajesArr = arr[i].languages;
        for(let j = 0; j < languajesArr.length; j++){
            languagesArr.push(languajesArr[j]);
        }
    }
    let timesRepeated = languagesArr.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
    let timesRepeatedArr = Object.entries(timesRepeated)
    let newArrLang = [];
    for(const lang of timesRepeatedArr){
        let newObj = Object.assign({},lang);
        newObj["lang"] = newObj[0];
        delete newObj[0];
        newObj["count"] = newObj[1];
        delete newObj[1];
        newArrLang.push(newObj)
    }
    newArrLang.sort(function(a,b){
        if(a.count > b.count) return -1;
        if(a.count < b.count) return 1;
        return 0;
    })
    let newArrLangNum = [];
    for(let i = 0; i < num; i++){
        newArrLangNum.push(newArrLang[i])
    }
    for(item of newArrLangNum){
        let langName = document.createElement('p');
        langName.textContent = item.lang;
        langName.classList = "lang-name";
        langName.style.textAlign = "center";
        nameContainer.appendChild(langName);
        
        let itemCount = document.createElement('p');
        itemCount.textContent = item.count;
        itemCount.style.textAlign = "center";
        numberContainer.appendChild(itemCount);

        let progressBar = document.createElement('progress');
        progressBar.classList = "progress-bar";
        progressBar.style.width = "25vw";
        progressBar.style.height = "5vh";
        progressBar.style.marginBottom = ".5vh";        
        progressBar.max = 100;
        progressBar.value = item.count;
        graphWrapper.appendChild(progressBar);
    }
}

function removeOtherItems(){
    nameContainer.remove();
    numberContainer.remove();
    graphWrapper.remove();
}

/* ---------- EVENT LISTENERS ---------- */

/* EVENT LISTENER - POPULATION BTN */
populationBtn.addEventListener('click', e => {
    languagesBtn.style.backgroundColor = "#fe9c2b";
    populationBtn.style.backgroundColor = "#e37b05";
    removeOtherItems();
    createGridItems();
    tenMostPopulatedDefault(countries_data);
});

/* EVENT LISTENER - LANGUAGE BTN */
languagesBtn.addEventListener('click', e => {
    populationBtn.style.backgroundColor = "#fe9c2b";
    languagesBtn.style.backgroundColor = "#e37b05";
    removeOtherItems();
    createGridItems();
    mostSpokenLanguages(countries_data,10);
});