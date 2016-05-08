var answer = "";
var state = "home"; // states: home, init, game, over
var results = [];

function show_stats() {
    $("#count").html(results.length);
    var s = 0;
    for (var i = 0; i < results.length; i++) {
        s += results[i];
    }
    $("#correct_p").html(results.length ? Math.round((s*100)/results.length) : 0);
}

function gen_puzzle() {
    var g = get_game();
    var d = {easy: 1, moderate: 2, hard: 4}[get_difficulty()];

    if (g === "random") {
        g = ["hextobin", "bintohex", "hextoascii", "asciitohex"][Math.floor(Math.random()*4)];
    }

    var q = "";
    var a = "";
    for (var i = 0; i < d; i++) {
        if (g === "hextobin") {
            var n = Math.floor(Math.random()*16);
            q += tohex(n);
            a += tobin(n);
        }
        else if (g === "bintohex") {
            var n = Math.floor(Math.random()*16);
            var b = tobin(n);
            q += "0000".slice(0, 4-b.length)+b;
            a += tohex(n);
        }
        else if (g === "hextoascii") {
            var n = Math.floor(0x21+Math.random()*94);
            q += tohex(n);
            a += toascii(n);
        }
        else if (g === "asciitohex") {
            var n = Math.floor(0x21+Math.random()*94);
            q += toascii(n);
            a += tohex(n);
        }
    }

    return [q, a, g.split("to")];
}

function next_puzzle() {
    $("#userinput").removeAttr("correct").val("");

    var p = gen_puzzle();
    $("#data").html(p[0]);
    answer = p[1];
    $("#in_f").html(p[2][0]);
    $("#out_f").html(p[2][1]);
}


function show_answer(correct) {
    $("#userinput").attr("correct", correct.toString());
}

function check_answer() {
    var v = $("#userinput").val();
    var a = "";
    for (var i = 0; i < v.length; i++) {
        if (v[i] !== " ") {
            a += v[i];
        }
    }

    results.push(a === answer);
    if (a !== answer) {
        $("#userinput").val(answer);
    }
    show_answer(a === answer);
    show_stats();
    setTimeout(next_puzzle, 500);
}

function esc() {
    $("#userinput").val("");
}

function init() {
    set_hash();
    if (window.location.hash.indexOf("#home") === 0) {
        $("#centerbox").attr("mode", "home");
    }
    else {
        results = [];
        state = "init";
        show_stats();
        $("#centerbox").attr("mode", "start");
        $("#userinput").focus();
    }
}

function enter() {
    if (state === "init") {
        $("#centerbox").attr("mode", "game");
        state = "game";
        next_puzzle();
    }
    else if (state === "game") {
        check_answer();
    }
}

$(document).ready(function () {
    window.onhashchange = init;
    $(document).keydown(function(event) {
        if ((event.keyCode || event.which) === 13) {
            enter();
            event.stopPropagation();
        }
        if ((event.keyCode || event.which) === 27) {
            esc();
            event.stopPropagation();
        }
    });
    init();
});
