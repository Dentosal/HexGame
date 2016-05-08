function set_game(x) {
    set_hash(x, get_difficulty());
}
function set_difficulty(x) {
    set_hash(get_game(), x);
}

function get_game() {
    var hash = window.location.hash || "#home";
    if (hash == "#home") {
        return "home";
    }
    var parts = hash.split("-");
    if (parts[0][0] !== "#") {
        return "home";
    }
    parts[0] = parts[0].slice(1);
    if (["hextobin", "bintohex", "hextoascii", "asciitohex", "random"].indexOf(parts[0]) === -1) {
        return "home";
    }
    return parts[0];
}
function get_difficulty() {
    if (window.location.hash.indexOf("-") === -1) {
        return "easy";
    }
    var parts = window.location.hash.split("-");
    var difficulty = parts[parts.length-1];
    if (["easy", "moderate", "hard"].indexOf(difficulty) === -1) {
        return "easy";
    }
    return difficulty;
}
function set_hash(g, d) {
    if (!!g || !!d) {
        if (!g) {
            g = "home";
        }
        if (!d) {
            d = "easy";
        }
        if (g === "home") {
            window.location.hash = "#home";
        }
        else {
            window.location.hash = "#" + g + "-" + d;
        }
    }
    else {
        window.onhashchange = undefined;
        g = get_game();
        d = get_difficulty();
        if (g === "home") {
            window.location.hash = "#home";
        }
        else {
            window.location.hash = "#" + g + "-" + d;
        }
        window.onhashchange = init;
    }
    $("#navbar a").removeAttr("selected");
    $("#navbar a[game=\""+g+"\"]").attr("selected", "true");
    $("#navbar a[difficulty=\""+d+"\"]").attr("selected", "true");
}
