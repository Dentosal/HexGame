function frombin(x) {
    return parseInt(x, 2);
}
function fromhex(x) {
    return parseInt(x, 16);
}
function fromascii(x) {
    return x.charCodeAt(0);
}

function tobin(x) {
    return x.toString(2);
}
function tohex(x) {
    return x.toString(16);
}
function toascii(x) {
    return String.fromCharCode(x);
}
