"use strict";
let table = document.querySelector("table"),
    matrix = Array.from(table.querySelectorAll("tr")).slice(1);
for(let i = 0; i < matrix.length; i++){
    matrix[i] = Array.from(matrix[i].cells).slice(1);
  
}
let warshipLocace=[];

table.tBodies[0].addEventListener("mousedown", ({target})=>{ 
    let tr = target.closest("tr");
    if(tr.firstElementChild=== target){
        return
    }
    if(target.classList.contains("warship")){
        target.classList.add("hurt");
        zzz();
    }else {
        target.classList.add("shot");}
    
});

 start();

function start(matrix){
    let warship4 = [4, 1],   // длина корабля, количество
        warship3 = [3, 2],
        warship2 = [2, 3],
        warship1 = [1, 4];
     
   location1(warship4);
   location1(warship3);
   location1(warship2);
   location1(warship1);
}

function location1(warship){
    let i = 0;
    for(let i =0; i<warship[1]; i++){
        while( i < warship[1]){
            let  warshipDirection = (Math.random() * 10 > 5) ? "row":"column";
            let coordinateX = (warshipDirection ==="row") ? 
            Math.floor(Math.random() * (matrix[0].length - warship[0])):
            Math.floor(Math.random() * matrix[0].length);

            let coordinateY = (warshipDirection === "row") ? 
            Math.floor(Math.random() * matrix.length):
            Math.floor(Math.random() * (matrix.length - warship[0]));
              
            if(matrix[coordinateY][coordinateX].hasAttribute('class')||
            (warshipDirection==="row")&&(matrix[coordinateY][coordinateX + warship[0]].hasAttribute('class'))||
            (warshipDirection==="column")&&(matrix[coordinateY + warship[0]][coordinateX].hasAttribute('class'))){
                continue;
            }
            installation( coordinateX,  coordinateY, warshipDirection, warship);
        i++;
        }
    }
}

function installation( coordinateX,  coordinateY, warshipDirection, warship){
    let warshipLocace1=[];
    if(warshipDirection === "row") {
        for(let x = coordinateX - 1; x <=  coordinateX + warship[0]; x++){
           if(!((x === coordinateX - 1)||(x ===  coordinateX + warship[0]))){
               matrix[coordinateY][x].classList.add("warship");
                warshipLocace1.push( matrix[coordinateY][x]);
            }
           
            if((x < 0)||(x === matrix[0].length)){
                continue;
            }
            for(let y = coordinateY - 1; y < coordinateY + 2; y++){
                if((y<0)||(y === matrix.length)){
                    continue;
                }
                if(matrix[y][x].classList.contains("warship")){
                    continue;
                }else{
                    matrix[y][x].classList.add("warshipClosed"); 
                }
            }
        }
    }else{
        for(let y = coordinateY - 1; y <=  coordinateY + warship[0]; y++){
           if(!((y === coordinateY - 1)||(y ===  coordinateY + warship[0]))){
               matrix[y][coordinateX].classList.add("warship");
               warshipLocace1.push( matrix[y][coordinateX]);/////////////////////////////////!!!!!!!!!!!!!!!!!!!
            }
            
            if((y < 0)||(y === matrix.length)){
                continue;
            }
            for(let x = coordinateX - 1; x < coordinateX + 2; x++){
                if((x<0)||(x === matrix[0].length)){
                    continue;
                }
                if(matrix[y][x].classList.contains("warship")){
                    continue;
                }else{
                    matrix[y][x].classList.add("warshipClosed"); 
                }
            }
        }
    }
    warshipLocace.push(warshipLocace1);
}
function zzz(){
    for(let i=0; i<warshipLocace.length; i++){
        let caunter=0; 
        for(let j =0; j<warshipLocace[i].length; j++){
            
           if(warshipLocace[i][j].classList.contains("hurt")){
               caunter++;
               if(caunter===warshipLocace[i].length) {
                for(let z = 0; z < warshipLocace[i].length; z++){ 
                    warshipLocace[i][z].classList.add("smite");
                }  
                 if(warshipLocace.length === 1){
                      alert("вы выиграли!");
                      return;
                    }
                if(warshipLocace.length-1 === i){
                i--;        
                 warshipLocace.splice(i+1, 1); 
                 return;
                }
                  warshipLocace.splice(i, 1);   
               }
            }
        }
    }
}

