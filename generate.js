const fse = require('fs-extra');
const jimp = require('jimp');
const glob = require('glob');
const path = require('path');

function ensureTrailingSlash(path) {
    console.log(path)
    return (path.endsWith('/') === false) ? path + "/" : path;
}

function resizeAndSave(factor, source, target) {
    jimp.read(source, function (err, image) {
        image.resize(image.bitmap.width * factor, jimp.AUTO);
        image.write(target, err => {
            if (err) {
                console.error(target + " ERROR: " + error);
            } else {
                console.log(target + " generated");
            }
        });
    });
}

function generate(files, target) {
    for (let file of files) {
        let filename = path.basename(file);
        let filetype = filename.substr(filename.lastIndexOf('.'), filename.length);

        filename = filename.substr(0, filename.lastIndexOf('.'));
        if (filename.indexOf("@3x")!==-1) {
            filename = filename.substr(0, filename.lastIndexOf('@'));
        }

        console.info("process " + filename + filetype);

        resizeAndSave(1/4, file, target + filename + filetype);
        resizeAndSave(1.5/4, file, target + filename + '@1.5x' + filetype);
        resizeAndSave(1/2, file, target + filename + '@2x' + filetype);
        resizeAndSave(3/4, file, target + filename + '@3x' + filetype);
        resizeAndSave(1, file, target + filename + '@4x' + filetype);
    }
}

module.exports = (q, target) => {
    if (typeof target !== "undefined") {
        target = ensureTrailingSlash(target);
        fse.ensureDirSync(target);
    }

    if (q.length == 1 && q[0].indexOf("*") !== -1) {
        glob(q[0], {}, (er, files) => generate(files, target));
    } else {
        generate(q, target);
    }
}