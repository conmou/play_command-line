//產生frame檔
const ffmpeg = require("ffmpeg");
const fs = require("fs");

// 判斷資料夾是否存在
if (!fs.existsSync("./frames")) {
    fs.mkdirSync("./frames");
}

try {
    ffmpeg("res/Disney.mp4").then(
        (video) => {
            console.log("Processing Video...");
            video.setVideoSize("120x90");
            // %05d 輸出文件格式 五位數檔名
            video.save("frames/frame%04d.png", (error, file) => { 
                if (error) console.log(error);
                else console.log("Video has been processed!");
            });
        },
        (err) => {
            console.log(`Error: ${err}`);
        }
    );
} catch (e) {
    console.log(e.code);
    console.log(e.message);
}
