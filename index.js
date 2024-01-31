const tic = function () {
    const map = Array(9).fill(null);
    const symb = ["x.png", "o.png"];
    let turn = 0;
    let won=false;

    function win(mapp) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (mapp[a] && mapp[a] === mapp[b] && mapp[a] === mapp[c]) {
                return condition;
            }
        }

        return null;
    }

    function render() {
        const resetButton = document.getElementById("resetButton");
        const boardElement = document.getElementById("board");
        const cells = boardElement.getElementsByClassName("cell");

        resetButton.addEventListener("click", resetGame);

        const winningCondition = win(map);

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];

            if (winningCondition && winningCondition.includes(i)) {
                cell.classList.add("winning-cell");

                won=true;
            } else {
                //*** */
                cell.classList.remove("winning-cell");
            }

            cell.innerHTML = '';
            if(map[i]!==null){
            const imgElement = document.createElement('img');
            
            imgElement.src = map[i];
            imgElement.width = 100;
            imgElement.height = 100;

            cell.appendChild(imgElement);
            }
            cell.addEventListener("pointerdown", (event) => {
                event.preventDefault();
                handlePointerDown(i, event);
            });
        }
        if(won){
            if(turn%2==0){
                const wonElementO = document.createElement('p');
                wonElementO.id="o";
                wonElementO.textContent = "O has won";
                document.body.appendChild(wonElementO);
            }
            else{
                const wonElementO = document.createElement('p');
                wonElementO.id="x";
                wonElementO.textContent = "X has won";
                document.body.appendChild(wonElementO);
            }

        }


    }

    function handlePointerDown(pos, event) {
        if ((map[pos] == null)&&(won==false)) {
            map[pos] = symb[turn % 2];
            turn++;
            render();
        }
//            const winningCondition = win(map);
//            if (winningCondition) {
//                console.log(`Player ${symb[(turn - 1) % 2]} wins!`);
//            }
//        } else {
//            console.log("Invalid");
//        }
    }



//won temp





    function resetGame() {
        if(document.getElementById('o')){
            const deletingElementO=document.getElementById('o');
            deletingElementO.remove();
        }
        else if(document.getElementById('x')){
            const deletingElementX=document.getElementById('x');
            deletingElementX.remove();
        }
        map.fill(null);
        turn = 0;
        won=false;
        render();
    }

    return { render, resetGame };
};

const { render, resetGame } = tic();

render();

