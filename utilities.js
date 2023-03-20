//
module.exports.toFourDigits = (string) => {
    while (string.length <= 3 ) {
        string = "0" + string;
    }
    return string;
};
