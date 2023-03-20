// 將frame檔轉換至文字檔
const getPixels = require("get-pixels");
const fs = require("fs");

const { toFourDigits } = require("./utilities");

// 判斷檔案是否存在
const build = (index) => {
    if (fs.existsSync("data.txt")) {
        fs.writeFileSync("data.txt", "", { flag: "w" }, (err) => {});
    }

    doFrame();
};

function doFrame(index = 1) {
    let indexString = toFourDigits(index.toString());
    let path = `frames/frame${indexString}.png`;

    getPixels(path, (err, pixels) => {
        if (err) {
            console.error(err);
            return;
        }

        let string = "";

        const symbols = "⠀⠃⠇⠏⠟⠿";

        let widthCounter = 0;
        for (let i = 0; i < pixels.data.length; i += 4) {
            let value = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
            value = Math.max(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);

            const index = Math.floor(value / (256 / 6));
            string += symbols[index].repeat(2);

            widthCounter++;
            if (widthCounter === 120) {
                widthCounter = 0;
                string += "\n";
            }
        }
        string += "\n";
        const regexes = [/(⠀+)/g, /(⠃+)/g, /(⠇+)/g, /(⠏+)/g, /(⠟+)/g, /(⠿+)/g];
        for (let i = 0; i < regexes.length; i++) {
            const matches = string.match(regexes[i]) || []; //尋找符合的字串回傳
            for (let match of matches) {
                string = string.replace(match, symbols[i] + toFourDigits(match.length.toString()));
            }
        }

        fs.writeFileSync("data.txt", string, { flag: "a" }, (err) => {});

        console.log(index);

        doFrame(index + 1);
    });
}

build(1);

module.exports.build = build;