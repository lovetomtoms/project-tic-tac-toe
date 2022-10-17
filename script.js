const cacheDOM =(() => {
    const _container = document.querySelector('.container');
    const _cells = _container.querySelectorAll('.cell');
    const getContainer = () => _container;
    const getCells = () => _cells;
    return {
        getCells,
        getContainer
    };
})();

const gameBoard = (() => {
    let _array = new Array(9);
    const getArray = () => _array;
    const setArray = (index, mark) => {
        _array[index] = mark;
    };
    return {
        getArray,
        setArray
    };
})();

const gameController = (() => {
    const _winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let _turnX = true;
    let _mark;
    const getWinner = () => {
        for (let i = 0; i < _winningCombinations.length; i++) {
            let values = new Array(3);
            for (let j = 0; j < _winningCombinations[i].length; j++) {
                values[j] = gameBoard.getArray()[_winningCombinations[i][j]];
            };
            if (!values.includes(undefined)) {
                if (values[0] === values[1] && values[1] === values[2]) {
                    bindEvents.unbindall();
                }
            }
        };
    };
    const setMark = (e) => {
        let index = e.target.dataset.cell;
        if (_turnX) {
            _mark = "X";
            _turnX = !_turnX;
        } else {
            _mark = "O";
            _turnX = !_turnX;
        }
        gameBoard.setArray(index, _mark);
        render.renderGame();
        bindEvents.unbindMark(index);
        getWinner();
    };
    return {
        setMark,
        getWinner
    }
})();

const bindEvents = (() => {
    function bindMark() {
        cacheDOM.getCells().forEach((cell) => {
            cell.addEventListener('click', gameController.setMark);
        });
    };
    function unbindMark(i) {
        cacheDOM.getCells()[i].removeEventListener('click', gameController.setMark);
    };
    function unbindall() {
        cacheDOM.getCells().forEach((cell) => {
            cell.removeEventListener('click', gameController.setMark);
        });
    };
    return {
        bindMark,
        unbindMark,
        unbindall
    };
})();

bindEvents.bindMark();

const render =(() => {
    function renderGame() {
        gameBoard.getArray().forEach((item, index) =>{
            cacheDOM.getCells()[index].innerText = item;
        });
    };
    return {
        renderGame
    };
})();