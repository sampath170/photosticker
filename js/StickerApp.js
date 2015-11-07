var myapp = myapp || {};


$(document).ready(function(){

    var photoPanel = new myapp.PhotoPanel({
        fileInputId: 'files',
        outputImageId: 'result',
        resetButtonId: 'startOver'
    });

    var stickerPanel = new myapp.StickerPanel({
            fileInputId: 'stickerFiles',
            outputImageId: 'stickerResult',
            stickerUploadId: 'uploadSticker'
        });

});
