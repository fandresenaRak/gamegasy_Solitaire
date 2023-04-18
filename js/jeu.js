//por cibler les elements
function _$(elts){
    return document.getElementById(elts);
}
//pour creer des elements
function _creatElts(elts){
    return document.createElement(elts);
}

//cretion de fonction pour compter les boule restant
function compteBoule(listebtn){
    let cpt = 0;
    for(let i=0 ; i<listebtn.length; i++){
        if(listebtn[i].value == 1){
            cpt++;
        }
    }
    return cpt;
}
var clickbtn="";
function display(num){
    clickbtn = num;
}

function positivite(nbr){
    if(nbr<0)
        return nbr*(-1);
    else    
        return nbr;
}

function supprimerlesboule(tab,clickbtn,listebtn,precdBtnClick,LigaSupprimer,ColaSupprimer){
    var precdElts = _$(precdBtnClick);
    var nouvElts = _$(clickbtn);
    let eltsaSupp = _$("btn_L"+(LigaSupprimer)+"_C_"+ColaSupprimer);

    if(eltsaSupp.value==1 && nouvElts.value!=1 && precdElts.value==1){
        tab[LigaSupprimer][ColaSupprimer] = 0;
        console.log("Lig a sup : "+LigaSupprimer);
        console.log("Col a sup :"+ColaSupprimer);

        let idboulesup = _$("btn_L"+LigaSupprimer+"_C_"+ColaSupprimer);
        idboulesup.value = 0;

        let precdElts = _$(precdBtnClick);
        precdElts.value = 0;

        //une nouvelle boule dans la case
        let nouvElts = _$(clickbtn);
        nouvElts.value = 1;

        clickbtn="";
        precdBtnClick="";
        colorer(listebtn);
        //condition si on gagne ou pas
        if(compteBoule(listebtn)==1){
            alert("Bravooooooo! :)");
        }
    }
}

function colorer(listebtn){
    for(let i=0; i<tab.length;i++){
        for(let j=0 ;j<tab[i].length;j++){
            for(let k = 0 ; k < listebtn.length;k++){
                if(listebtn[k].value == 1){
                    listebtn[k].setAttribute('style','background-image : '+pierreImg+';');
                }
                else if(listebtn[k].value==0){
                    listebtn[k].removeAttribute('style','background-image:'+pierreImg+';');
                    listebtn[k].setAttribute('style','background: url(../img/plateau.jpg);');
                }
            }
        }
    }
}

//commencer
var cptBoutton=0;
var pierreImg = 'url(../img/pierre.jpg)'; 
var tab = [["x","x","x","x","x","x","x","x","x"],["x","x","x","x","x","x","x","x","x"],["x","x","x",1,1,1,"x","x","x"],["x","x",1,1,1,1,1,"x","x"],["x",1,1,1,1,1,1,1,"x"],["x",1,1,1,0,1,1,1,"x"],["x",1,1,1,1,1,1,1,"x"],["x","x",1,1,1,1,1,"x","x"],["x","x","x",1,1,1,"x","x","x"],["x","x","x","x","x","x","x","x","x"],["x","x","x","x","x","x","x","x","x"]];
let NbrBoule = _$('NbrBoule');

var creationTable = function(){
    let tbody = _$("tbody");
    //creation de l'elements html tr
    for(let i=0; i<tab.length;i++){
        let tr = _creatElts("tr");
        tbody.appendChild(tr);
        //creation de l'elements html td
        for(let j=0; j<tab[i].length;j++){
            tbody.appendChild(tr);
            let td = _creatElts("td");
            tr.appendChild(td);

            let cercle = _creatElts("span");
            cercle.innerHTML = tab[i][j];
            cercle.id = "cercle_L_"+i+"_c_"+j;
            if(cercle.textContent!="x"){
                let btn = _creatElts("button");
                cptBoutton++;
                btn.id = "btn_L"+i+'_C_'+j;
                btn.value = tab[i][j];
                btn.setAttribute('onclick',"display('"+btn.id+"')");
                td.appendChild(btn);
            }
        }
    }
}

creationTable();

window.addEventListener('load',(e)=>{
    e.preventDefault();
    let listebtn=document.getElementsByTagName('button');
    let tempprecedBtnClick="";
    let cptClick = 0;
    let precdBtnClick="";

    colorer(listebtn);
    document.addEventListener('click',(e)=>{
        for(let i = 0; i<tab.length;i++){
            for(let j=0 ; j<tab[i].length;j++ ){
                let id = "btn_L"+i+"_C_"+j;
                let elts = _$(id);
                if(elts!=null){
                    elts.removeAttribute('style','border : 2px solid  rgba(0, 255, 21, 0.5);');
                    if(elts.value!=0){
                        elts.setAttribute('style','background-images: '+pierreImg+';');
                    }
                    if(elts.value == 0){
                        elts.setAttribute('style','background : url(../img/pierre.jpg);');
                    }
    
                }
            }
        }

        //en commencement le precBtnclick et le clickbtn sont la meme
        if(cptClick == 0){
            tempprecedBtnClick = clickbtn;
        }else{
            precdBtnClick = tempprecedBtnClick;
            tempprecedBtnClick = clickbtn;
        }

        let ElmtsbouttonChoisit = _$(clickbtn);
        if(clickbtn == ElmtsbouttonChoisit.id && ElmtsbouttonChoisit.value!=0){
            let btn = document.querySelector('.btnBorderRed');
            cptClick=1;
            //supresion de bordure pour q'on peut le remplacer
            if(btn)
                btn.classList.remove('btnBorderRed');
            ElmtsbouttonChoisit.classList.add('btnBorderRed');
        }

        //deplacement du pierre
        let Ligneauto = parseInt(clickbtn[5]);
        let Colauto = parseInt(clickbtn[9]);
        let colgauche = _$("btn_L"+Ligneauto+"_C_"+(Colauto-2));
        let coldroite = _$("btn_L"+Ligneauto+"_C_"+(Colauto+2));

        let lighaut = _$("btn_L"+(Ligneauto-2)+"_C_"+Colauto); 
        let ligbas = _$("btn_L"+(Ligneauto+2)+"_C_"+Colauto);

        //conditoin afaka ifananle vato
        //le if ito n condition amafana n boule raha meme ligne
        if(((precdBtnClick[5] - clickbtn[5])==0) && precdBtnClick!=""&& precdBtnClick!=clickbtn){
            let ColaSupprimer;
            let LigaSupprimer = clickbtn[5];

            if(parseInt(precdBtnClick[9])> parseInt(clickbtn[9]) && ((parseInt(precdBtnClick[9])-1) != parseInt(clickbtn[9]))){
                ColaSupprimer = parseInt(precdBtnClick[9])-1;
                supprimerlesboule(tab,clickbtn,listebtn,precdBtnClick,LigaSupprimer,ColaSupprimer);
            }
            else{
                if(parseInt(precdBtnClick[9]) < parseInt(clickbtn[9]) && ((parseInt(precdBtnClick[9])) != (parseInt(clickbtn[9])-1))){
                    ColaSupprimer = parseInt(clickbtn[9])-1;
                    supprimerlesboule(tab,clickbtn,listebtn,precdBtnClick,LigaSupprimer,ColaSupprimer);
                }
            }
        }
        //le else ito n condition amafana boule raha meme colonne
        else{
            if(((precdBtnClick[9]-clickbtn[9])==0) && precdBtnClick!="" && precdBtnClick != clickbtn){
                let LigaSupprimer;
                ColaSupprimer = clickbtn[9];

                if((parseInt(precdBtnClick[5])> parseInt(clickbtn[5])) && ((precdBtnClick[5]-1) != clickbtn[5])){
                    LigaSupprimer = parseInt(precdBtnClick[5])-1;
                    supprimerlesboule(tab,clickbtn,listebtn,precdBtnClick,LigaSupprimer,ColaSupprimer);
                }
                else{
                    if((parseInt(precdBtnClick[5]) < parseInt(clickbtn[5])) && ((parseInt(precdBtnClick[5])) != (parseInt(clickbtn[5])-1))){
                        LigaSupprimer = parseInt(clickbtn[5])-1;
                        supprimerlesboule(tab,clickbtn,listebtn,precdBtnClick,LigaSupprimer,ColaSupprimer);
                    }
                }
            }
        }

    });

});
