"use strict";
let table = document.querySelector("table"),
    matrix = Array.from(table.querySelectorAll("tr")).slice(1);
for(let i = 0; i < matrix.length; i++){   //превращаем таблицу в матрицу
    matrix[i] = matrix[i].cells;
}
let warshipLocace=[]; //переменная для хранения координат целых кораблей

table.tBodies[0].addEventListener("mousedown", ({target})=>{ 
    let tr = target.closest("tr");
    if(tr.firstElementChild=== target){ //убираем обработчик с нумеровванного поля
        return
    }
    if(target.classList.contains("warship")){// проверяем наличия попадания и маркируем
        target.classList.add("hurt");
        itog();
    }else {
        target.classList.add("shot");}
});


 start();

function start(matrix){///1
    let warship4 = [4, 1],   // длина корабля, количество
        warship3 = [3, 2],
        warship2 = [2, 3],
        warship1 = [1, 4];
     
   location1(warship4);
   location1(warship3);
   location1(warship2);
   location1(warship1);
}

function location1(warship){///2 функция по определению координат кораблей
    let i = 0;
    for(let i =0; i<warship[1]; i++){
        while( i < warship[1]){
            let  warshipDirection = (Math.random() * 10 < 5) ? "row":"column";
    
            let coordinateX = (warshipDirection ==="row") ? 
            Math.ceil(Math.random() * (10-warship[0])):
            Math.ceil(Math.random() * 10);

            let coordinateY = (warshipDirection ==="row") ? 
            Math.floor(Math.random() * 10):
            Math.floor(Math.random() * (10-warship[0]));
              
            if(matrix[coordinateY][coordinateX].classList.contains("warship") || matrix[coordinateY][coordinateX].classList.contains("warshipClosed")){
                continue;//проверяем на соблюдение условий растановки. А есть метод для проверки нескольких классов????????
            }
            if(warshipDirection==="row"){ 
                if(matrix[coordinateY][coordinateX + warship[0]].classList.contains("warship") || matrix[coordinateY][coordinateX + warship[0]].classList.contains("warshipClosed")){
                    continue;
                }        
            }else{
                if(matrix[coordinateY + warship[0]][coordinateX].classList.contains("warship") || matrix[coordinateY + warship[0]][coordinateX].classList.contains("warshipClosed")){
                    continue; 
                }
            }
            installation( coordinateX,  coordinateY, warshipDirection, warship);
        i++;
        }
    }
}

function installation( coordinateX,  coordinateY, warshipDirection, warship){///3  функция по растановке кораблей
    let warshipLocace1=[];////////////
    if(warshipDirection === "row") {
        for(let i = coordinateX; i <  coordinateX + warship[0]; i++){
            matrix[coordinateY][i].classList.add("warship");
            warshipLocace1.push( matrix[coordinateY][i]);
            if(coordinateY < 9){                                  //помечаем смежные клетки с кораблями
                matrix[coordinateY+1][i].classList.add("warshipClosed");
            }
            if(coordinateY > 0){
                matrix[coordinateY-1][i].classList.add("warshipClosed");
            }
            if( (i === coordinateX) && !(coordinateX===1) ){
                if(coordinateY >0){
                    matrix[coordinateY-1][i-1].classList.add("warshipClosed");
                }
                matrix[coordinateY][i-1].classList.add("warshipClosed");
                if(coordinateY < 9){
                    matrix[coordinateY+1][i-1].classList.add("warshipClosed");
                }
            }
            if( (i === coordinateX + warship[0] - 1) && !(i===10) ){
                if(coordinateY >0){
                    matrix[coordinateY-1][i+1].classList.add("warshipClosed");
                }
                matrix[coordinateY][i+1].classList.add("warshipClosed");
                if(coordinateY < 9){
                    matrix[coordinateY+1][i+1].classList.add("warshipClosed");
                }
            }
        }
    }       
    else{
        for(let i = coordinateY; i < coordinateY + warship[0]; i++){
            matrix[i][coordinateX].classList.add("warship");
            warshipLocace1.push( matrix[i][coordinateX]);////////
            if(coordinateX > 1){
                matrix[i][coordinateX-1].classList.add("warshipClosed");
            }
            if(coordinateX < 10){
                matrix[i][coordinateX+1].classList.add("warshipClosed");
            }
            if( (i === coordinateY) && !(coordinateY===0) ){
                if(coordinateX >1){
                    matrix[i-1][coordinateX-1].classList.add("warshipClosed");
                }
                matrix[i-1][coordinateX].classList.add("warshipClosed");
                if(coordinateX < 10){
                    matrix[i-1][coordinateX+1].classList.add("warshipClosed");
                }
            }
            if( (i === coordinateY + warship[0] - 1) && !(i===11) ){
                if(coordinateX >1){
                    matrix[i+1][coordinateX-1].classList.add("warshipClosed");
                }
                matrix[i+1][coordinateX].classList.add("warshipClosed");
                if(coordinateX < 10){
                    matrix[i+1][coordinateX+1].classList.add("warshipClosed");
                }
            }
        }    
    }
    warshipLocace.push(warshipLocace1);
 
    
}
function itog(){// функция отмечает уничтоженные корабли
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
