// const shortcode = Math.random().toString(64).substring(2,8)
// console.log(shortcode)


const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function encode62(num){
    let result = "";
    while( num > 0) {
        result = chars[num%62] + result;
        num = Math.floor(num/62)
    }

    return result;
}

console.log(encode62(125));
