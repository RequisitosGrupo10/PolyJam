document.addEventListener('DOMContentLoaded', () => {
    document.oncontextmenu = new Function("return false");
    const grid = document.getElementById('grid');

    const cardArray = [
        {
            name: 'empty',
            img: 'js/images/empty.png'
        },
        {
            name: '1',
            img: 'js/images/1.png'
        },
        {
            name: '2',
            img: 'js/images/2.png'
        },
        {
            name: '3',
            img: 'js/images/3.png'
        },
        {
            name: '4',
            img: 'js/images/4.png'
        },
        {
            name: '5',
            img: 'js/images/5.png'
        },
        {
            name: '6',
            img: 'js/images/6.png'
        },
        {
            name: '7',
            img: 'js/images/7.png'
        },
        {
            name: '8',
            img: 'js/images/8.png'
        },
        {
            name: 'empty',
            img: 'js/images/empty.png'
        },
        {
            name: 'bomb',
            img: 'js/images/bomb.png'
        },
        {
            name: 'blank',
            img: 'js/images/blank.png'
        },
        {
            name: 'flag',
            img: 'js/images/flag.png'
        },
        {
            name: 'question',
            img: 'js/images/question.png'
        }
    ]
    
    const button = document.getElementsByName("NewGame")[0];
    button.onclick = function() {
        generateGrid(); };

    generateGrid();

    function generateGrid() {
        //generate 10 by 10 grid
        grid.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            row = grid.insertRow(i);
            row.setAttribute('class', 'p-0 m-0');
            for (let j = 0; j < 10; j++) {
                cell = row.insertCell(j);
                cell.setAttribute('class', 'p-0 m-0');
                let img = document.createElement('img');
                cell.appendChild(img);
                changeImage(cell, 11);
                cell.onclick = function () {
                    if (this.firstChild.getAttribute('name') == 'flag' || this.firstChild.getAttribute('name') == 'question') return false;
                    clickCell(this);
                };
                cell.oncontextmenu = function () {
                    if (this.firstChild.getAttribute('name') == 'blank') {
                        changeImage(this, 12);
                    } else if (this.firstChild.getAttribute('name') == 'flag') {
                        changeImage(this, 13);
                    } else if (this.firstChild.getAttribute('name') == 'question') {
                        changeImage(this, 11);
                    } else {
                        return false;
                    }
                };
                let mine = document.createAttribute("data-mine");
                mine.value = "false";
                cell.setAttributeNode(mine);
            }
        }
        addMines();
    }

    function changeImage(cell, numberAray) {
        let image = cell.firstChild;
        //console.log(image);
        cell.setAttribute('class', 'p-0 m-0');
        image.setAttribute('src', cardArray[numberAray].img);
        image.setAttribute('name', cardArray[numberAray].name);
        image.setAttribute('height', '60');
        image.setAttribute('width', '60');
    }

    function addMines() {
        //Add mines randomly
        for (let i = 0; i < 20; i++) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let cell = grid.rows[row].cells[col];
            if (cell.getAttribute('data-mine') == 'true') i--;
            cell.setAttribute("data-mine", "true");
        }
    }

    function revealMines() {
        //Highlight all mines in red
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let cell = grid.rows[i].cells[j];
                if (cell.getAttribute("data-mine") == "true") {
                    cell.className = "mine";
                    changeImage(cell, 10);
                }
            }
        }
    }

    function checkLevelCompletion() {
        let levelComplete = true;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if ((grid.rows[i].cells[j].getAttribute("data-mine") == "false") && (grid.rows[i].cells[j].firstChild.getAttribute('name') == "blank")) levelComplete = false;
            }
        }
        if (levelComplete) {
            //alert("You Win!");
            revealMines();
        }
    }

    function clickCell(cell) {
        //Check if the end-user clicked on a mine
        if (cell.getAttribute("data-mine") == "true") {
            revealMines();
            //alert("Game Over");
        } else {
            //cell.className = "clicked";
            //Count and display the number of adjacent mines
            let mineCount = 0;
            let cellRow = cell.parentNode.rowIndex;
            let cellCol = cell.cellIndex;
            //alert(cellRow + " " + cellCol);
            for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
                }
            }

            if (cell.firstChild.getAttribute('name') != "blank") {
                flag = 0;
                for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                    for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                        if (grid.rows[i].cells[j].firstChild.getAttribute("name") == "flag") flag++;
                    }
                }
                if (flag == mineCount) {
                    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                            //Recursive Call
                            if (grid.rows[i].cells[j].firstChild.getAttribute('name') == "blank") clickCell(grid.rows[i].cells[j]);
                        }
                    }
                }
            } else {
                //cell.innerHTML = mineCount;
                changeImage(cell, mineCount);

                if (mineCount == 0) {
                    //Reveal all adjacent cells as they do not have a mine
                    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                            //Recursive Call
                            if (grid.rows[i].cells[j].firstChild.getAttribute('name') == "blank") clickCell(grid.rows[i].cells[j]);
                        }
                    }
                }
            }
            checkLevelCompletion();
        }
    }

})