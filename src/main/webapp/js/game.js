var board = "8x8";

var backup = {
    width: 8,
    height: 8,
    countMines: 10
};

var width = 8;
var height = 8;
var countMines = 10;
var countEmptys = (width * height) - countMines;
var play = true;

var field = [];
var first = true;

var counterMin;
var timer;
var time = 0;
var thread;

$("#board").on("change", function () {
    if (this.value === "custom") {
        $("#custom").removeClass("grey");
        $("#width").prop("disabled", false);
        $("#height").prop("disabled", false);
        $("#mines").prop("disabled", false);
    } else {
        $("#custom").addClass("grey");
        $("#width").prop("disabled", true);
        $("#height").prop("disabled", true);
        $("#mines").prop("disabled", true);
    }
});

function win() {
    clearInterval(thread);
    play = false;

    $("#new-game").attr("src", "res/smiley.ico");
    setTimeout(function () {
        alert("Won");

        $.ajax({
            type: "POST",
            url: "api/add_record",
            dataType: "json",
            data: {
                time: time,
                board: board
            },
            success: function (data) {
                if (data === "end") {
                    alert("Error saving result: The session has expired.");
                } else if (data !== true) {
                    alert("Error saving the result.");
                }
            },
            error: function () {
                alert("Connection error.");
            }
        });

    }, 100);
}

function lose(x, y) {
    clearInterval(thread);
    $(field[y][x].td).addClass("mine-red");

    play = false;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {

            if (field[i][j].val === -1 && !field[i][j].td.hasClass("mine-red")) {
                field[i][j].td.addClass("mine");
            }
        }
    }

    $("#new-game").attr("src", "res/smiley3.ico");
    setTimeout(function () {
        alert("Lost");
    }, 100);
}

function countDown() {
    timer.html(++time);
}

function startTime() {
    thread = setInterval(countDown, 1000);
}

function shoot(x, y, action) {
    var count = 0;
    var flags = 0;
    for (var i = y - 1; i <= y + 1; i++) {
        for (var j = x - 1; j <= x + 1; j++) {
            if (!(i === y && j === x)
                && i >= 0 && i < height
                && j >= 0 && j < width
                && field[i][j].zakryte === true) {
                switch (action) {
                    case "dis":
                        discovery(j, i);
                        break;
                    case "dis2":
                        if (!(i === y && j === x) && field[i][j].flag === false) {
                            discovery(j, i);
                        }
                        break;
                    case "count":
                        if (field[i][j].val === -1) {
                            count++;
                        }
                        if (field[i][j].flag === true) {
                            flags++;
                        }
                        break;
                }
            }
        }
    }
    return count === flags;
}

function discovery(x, y) {
    if (!play || field[y][x].flag) {
        return;
    }
    if (field[y][x].zakryte === false) {
        //odkrywanie wokół liczby
        if (field[y][x].val > 0) {
            if (shoot(x, y, "count")) {
                shoot(x, y, "dis2");
            }
        }
        return;
    }

    field[y][x].zakryte = false;
    $(field[y][x].td).addClass("blank");

    // przegrana
    if (field[y][x].val === -1) {
        lose(x, y);
    } else {
        countEmptys--;
    }

    if (field[y][x].val > 0) {
        $(field[y][x].td).addClass("field" + field[y][x].val);
    }

    if (field[y][x].val === 0) {
        shoot(x, y, "dis");
    }

    // wygrana
    if (countEmptys === 0) {
        win();
    }
}

function generateNumbers() {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {

            if (field[i][j].val !== -1) {
                var count = 0;
                for (var i2 = i - 1; i2 <= i + 1; i2++) {
                    for (var j2 = j - 1; j2 <= j + 1; j2++) {

                        if (i2 >= 0 && i2 < height
                            && j2 >= 0 && j2 < width) {
                            if (field[i2][j2].val === -1) {
                                count++;
                            }
                        }
                    }
                }
                field[i][j].val = count;
            }
        }
    }
    startTime();
}

function generateMines(x, y) {
    for (var i = 0; i < countMines; i++) {
        do {
            var randX = Math.floor(Math.random() * (width));
            var randY = Math.floor(Math.random() * (height));

        } while (field[randY][randX].val === -1
        || (randX === x - 1 && randY === y - 1)
        || (randX === x && randY === y - 1)
        || (randX === x + 1 && randY === y - 1)
        || (randX === x - 1 && randY === y)
        || (randX === x && randY === y)
        || (randX === x + 1 && randY === y)
        || (randX === x - 1 && randY === y + 1)
        || (randX === x && randY === y + 1)
        || (randX === x + 1 && randY === y + 1)
            );

        field[randY][randX].val = -1;
    }
    generateNumbers();
}

function Pole(td, x, y, val) {
    this.td = td;
    this.x = x;
    this.y = y;
    this.val = val;
    this.zakryte = true;
    this.flag = false;
    this.td.x = this.x;
    this.td.y = this.y;

    this.td.on("click", function () {
        if (first) {
            generateMines(x, y);
            first = false;
        }
        discovery(x, y);
    }).on("contextmenu", function (e) {
        if (field[y][x].zakryte === false) {
            return false;
        }

        if (field[y][x].flag) {
            countMines++;
        } else {
            countMines--;
        }
        counterMin.html(countMines);
        field[y][x].flag = !field[y][x].flag;

        if ($(e.target).is("div")) {
            $(e.target).closest("td").toggleClass("flag");
        } else {
            $(e.target).toggleClass("flag");
        }
        return false;
    });
}

function createBoard() {
    var table = $("#table").find("tbody");

    for (var i = 0; i < height; i++) {
        var tr = $("<tr>");
        table.append(tr);
        field[i] = [];

        for (var j = 0; j < width; j++) {
            field[i][j] = new Pole($("<td>").append($("<div>")), j, i, 0);
            tr.append(field[i][j].td);
        }
    }
}

function setVariables() {
    board = $("#board").val();
    if (board === "custom") {
        width = $("#width").val();
        height = $("#height").val();
        countMines = $("#mines").val();

        if (width.trim() === "" || height.trim() === "" || countMines.trim() === "" ||
            parseInt(width) <= 3 || parseInt(height) <= 3 || parseInt(countMines) <= 3
        ) {
            alert("Bad values");
            return false;
        }

        board = width + "x" + height;

    } else {
        var tmp = board.split("x");
        width = parseInt(tmp[0]);
        height = parseInt(tmp[1]);
        if (board === "8x8") {
            countMines = 10;
        } else if (board === "16x16") {
            countMines = 40;
        } else if (board === "16x30" || board === "30x16") {
            countMines = 99;
        }
    }
    backup.width = width;
    backup.height = height;
    backup.countMines = countMines;
    countEmptys = (width * height) - countMines;
    start();
    return false;
}

function restore() {
    width = backup.width;
    height = backup.height;
    countMines = backup.countMines;
    countEmptys = (width * height) - countMines;

    clearInterval(thread);
    start();
}

function start() {
    time = 0;
    play = true;
    first = true;
    $.get(
        "board.jsp",
        {},
        function (data) {
            $("#container").html(data);
            counterMin = $("#countMines");
            counterMin.html(countMines);
            timer = $("#timer");
            first = true;

            $("#new-game").closest("button").on("click", restore);
            createBoard();

            var height = $(window).height()
                - $(".row").eq(0).height()
                - $(".navbar").eq(0).height()
                - $("footer").eq(0).height();

            $(".board-container").eq(0).css("max-height", height + "px");
        }
    );
}

function back() {
    clearInterval(thread);
    $.get(
        "form.jsp",
        {},
        function (data) {
            $("#container").html(data);
            $("#board").on("change", function () {
                if (this.value === "custom") {
                    $("#custom").removeClass("grey");
                    $("#width").prop("disabled", false);
                    $("#height").prop("disabled", false);
                    $("#mines").prop("disabled", false);
                } else {
                    $("#custom").addClass("grey");
                    $("#width").prop("disabled", true);
                    $("#height").prop("disabled", true);
                    $("#mines").prop("disabled", true);
                }
            });
        }
    );
}
