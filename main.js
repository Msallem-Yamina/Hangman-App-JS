const Ranletters = "abcdefghijklmnopqrstuvwxyz";
let arrlett = Ranletters.split(''),
    letters = document.querySelector(".letters"),
    lc = localStorage.getItem("best-Attempt");

if (lc !== null){
    document.querySelector(".score span").innerHTML = lc;    
    // document.getElementsByTagName("header")[0].insertBefore(div, document.querySelector("header .category"));
}
// Generate Letters 
arrlett.forEach(l => {
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(l));
    span.className = "letter-box";
    letters.appendChild(span);
});

// Object Of Words + Categries
const words = {
    programming: ["php", "java script", "css", "go", "java", "scala", "ruby", "c", "react js","vue js","laravel" ],
    movies: ["Prestige", "inception", "Parasite", "Interstellar"],
    people: ["Hitcock", "alexander" , "Cristiano Ronaldo", "Lionel Messi", "Neymar","Paulo Dybala"],
    contry: ["Tunisie", "Egypt", "Yemen", "Palestine", "Algerie"]
} 

// Get Random Propriety
let Allkeys = Object.keys(words),
    // Random Number Depend On keys length
    numran = Math.floor(Math.random() * Allkeys.length),
    // Category
    ranCatName = Allkeys[numran],
    // Category Value 
    ranCatValue = words[ranCatName],
    // Random Number depend on words
    ranValueName = Math.floor(Math.random() * ranCatValue.length),
    // value of word chosen
    ranValue = ranCatValue[ranValueName],
    lettGuess = document.querySelector("footer .letters-guess");
// Convert chosen word to Array
 let Arrword = Array.from(ranValue.toLowerCase());
Arrword.forEach((lw)=>{
    let s = document.createElement("span");
    if (lw === ' '){
        s.className = "with-space";
    }
    lettGuess.appendChild(s);
});
// Set Gategory Info
document.querySelector(".category span").innerHTML = ranCatName;
let spguess = document.querySelectorAll(".letters-guess span"),
    wrongAtt = 0,
    thedraw = document.querySelector(".draw");
// Handle Clicking On letters
document.addEventListener ("click", (e)=>{
    if (e.target.classList.contains("letter-box")){
        e.target.classList.add ("clicked");
        let l = e.target.innerHTML.toLowerCase(),
        st = false;
        Arrword.forEach((item,itemIdx)=>{
            if(l === item) {
                st = true;
                spguess.forEach((span,spanIdx)=>{
                    if(itemIdx === spanIdx){
                        span.innerHTML = item;
                        span.classList.add("true");
                    }
                });
            }
        });
        // If Letter Is Wrong 
        if (st === false){
            wrongAtt++;
            thedraw.classList.add(`Wrong-${wrongAtt}`);
            document.getElementById("fail").play();
            if (wrongAtt === 8){
                endGame();
                letters.classList.add ("finished");
            }
        }else {
            document.getElementById("success").play();
            let spt = document.querySelectorAll(".letters-guess span.true"),
                len = spt.length;
            if (Arrword.includes(' ') === true) len++;
            if (Arrword.length === len){
                 if ((lc === null) || (lc > wrongAtt)){
                     localStorage.setItem("best-Attempt", wrongAtt);
                 }
                let d = document.createElement("div");
                d.appendChild(document.createTextNode(`Great ! You Reached The Goal After ${wrongAtt} Attempts.`));
                d.className = "succ";
                document.body.appendChild(d);
                document.querySelector(".succ").onclick = function(){
                    window.location.reload();
                }
            }
        }
    }
});
function endGame(){
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(`Game Over, The Word Is ${ranValue}`));
    div.className = "popup";
    document.body.appendChild(div);
    document.querySelector(".popup").addEventListener("click",function(){
        setTimeout(() => {
           window.location.reload(); 
        }, 1000);
    });
}