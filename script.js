

const container = document.querySelector(".app");

const myApp = [
    {
        type: "country",
        msg: "Pick the Appropriate Option",
        path: "images/countries",
        structure: [
                        {question:"Japan",options:['taiwan.png','italy.png','japan.png','australia.png'],key:2},
                        {question:"USA",options:['australia.png','usa.png','china.png','taiwan.png'],key:1},
                        {question:"China",options:['taiwan.png','italy.png','usa.png','china.png'],key:3},
                        {question:"Italy",options:['australia.png','japan.png','italy.png','china.png'],key:2},
                        {question:"Taiwan",options:['taiwan.png','italy.png','japan.png','usa.png'],key:0},
                        {question:"Australia",options:['china.png','usa.png','italy.png','australia.png'],key:3},
        ]
    },

    {
        type: "landmark",
        msg: "Pick the Appropriate Option",
        path: "images/landmarks",
        structure: [
                        {question:"Big Ben",options:['eiffeltower.jpg','bigben.jpg','sydneyoperahouse.jpg','tajmahal.jpg'],key:1},
                        {question:"Eiffel Tower",options:['eiffeltower.jpg','tajmahal.jpg','statueofliberty.jpg','mtfuji.jpg'],key:0},
                        {question:"Mount Fuji",options:['sydneyoperahouse.jpg','statueofliberty.jpg','mtfuji.jpg','tajmahal.jpg'],key:2},
                        {question:"Statue of Liberty",options:['eiffeltower.jpg','bigben.jpg','sydneyoperahouse.jpg','statueofliberty.jpg'],key:3},
                        {question:"Taj Mahal",options:['eiffeltower.jpg','mtfuji.jpg','statueofliberty.jpg','tajmahal.jpg'],key:3},
                        {question:"Sydney Opera House",options:['sydneyoperahouse.jpg','tajmahal.jpg','eiffeltower.jpg','bigben.jpg'],key:0},
        ]
    },

    {
        type: "flag",
        msg: "Pick the Appropriate Option",
        path: "images/flags",
        structure: [
                        {question:"Canada",options:['greece.png','germany.png','canada.png','switzerland.png'],key:2},
                        {question:"France",options:['norway.png','greece.png','france.png','canada.png'],key:2},
                        {question:"Germany",options:['germany.png','switzerland.png','norway.png','france.png'],key:0},
                        {question:"Greece",options:['switzerland.png','greece.png','canada.png','norway.png'],key:1},
                        {question:"Norway",options:['norway.png','france.png','switzerland.png','greece.png'],key:0},
                        {question:"Switzerland",options:['germany.png','canada.png','greece.png','switzerland.png'],key:3},
        ]
    }

]

// create select element
const select = document.createElement("select");
      select.setAttribute("onchange", "load(this)")
    for(let j=0; j<myApp.length; j++){
        const option=document.createElement("option");
        option.value=j;
        option.innerHTML=myApp[j].type;
        select.appendChild(option)
    }
    document.querySelector(".quiz-box").appendChild(select)
    
  
    
    // create class
    
    class App{
        constructor(myApp, container){
            this.app = myApp;
            this.container = container;
            this.index = 0;
            this.score = 0;
            this.quizSize = this.app.structure.length;
            this.optionSize = this.app.structure[0].options.length;
            this.msgEle = this.container.querySelector(".msg");
            this.quizEle = this.container.querySelector(".quiz");
            this.optionEle = this.container.querySelector(".option-box");
            this.questionNumber = this.container.querySelector(".question-number");
            this.scoreEle = this.container.querySelector(".score-board");
            this.setQuestion();
            this.setOptions();
            this.scoreBoard();
        }

        setQuestion(){
            this.msgEle.innerHTML=this.app.msg;
            this.quizEle.innerHTML=this.app.structure[this.index].question;
            this.questionNumber.innerHTML=(this.index+1)+"/"+this.quizSize;
        }

        setOptions(){
            this.optionEle.innerHTML="";
            for(let i=0; i<this.optionSize; i++){
                const button = document.createElement("button")
                      button.type="button";
                      button.id=i;
                const img = document.createElement("img");
                      img.src = this.app.path+"/"+this.app.structure[this.index].options[i];
                      button.appendChild(img)
                    this.optionEle.appendChild(button)
            }
            this.optionClick();

        }

        scoreBoard(){
            this.scoreEle.innerHTML = this.score;
        }

        optionClick(){
            const that=this;
            const options = this.optionEle.children;
            for(let i=0; i<options.length; i++){
                options[i].addEventListener("click",function(){
                    const span=document.createElement("span");
                    if(this.id==that.app.structure[that.index].key){
                        span.innerHTML="Correct";
                        this.classList.add("correct");
                        that.score++;
                        that.scoreBoard();
                   } 
                   else{
                        span.innerHTML="Wrong";
                        this.classList.add("wrong");
                   }
                   this.appendChild(span);
                   for(let j=0; j<that.optionEle.children.length; j++){
                    if(this.id==that.optionEle.children[j].id){

                    }
                    else{
                        that.optionEle.children[j].classList.add("hide");
                    }
                   }
                    this.style.pointerEvents="none";
                    that.index++;

                   if(that.index>that.quizSize-1){
                       setTimeout(function(){
                        that.quizOver();
                   },1500);
                }
                   else{
                    // next quiz update
                   setTimeout(function(){
                       that.setQuestion()
                       that.setOptions()
                   },1500)
                }
                })                
            }
        }

        quizOver(){

            this.msgEle.innerHTML="";
            this.quizEle.innerHTML="";
            
            if(this.score > this.quizSize/2){
                this.optionEle.innerHTML="<h1>Quiz Over, <br> You Have Lots Of Useless Knowledge!</h1>";
            }
            else{
                this.optionEle.innerHTML="<h1>Quiz Over, <br> You're a dummy!</h1>";
            }
        }
    }

    // create object without onchange of select
    const app1 = new App(myApp[0],container)

    function load(ele) {
        const app1 = new App(myApp[ele.value],container)
      
     }

