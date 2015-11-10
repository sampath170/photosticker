var myapp = myapp || {};

function initStickerApp(){
    myapp.StickerApp = (function(){

            return function(){

                //create PhotoPanel
                var photoPanel = new myapp.PhotoPanel({
                        fileInputId: 'files',
                        outputImageId: 'result',
                        resetButtonId: 'startOver',
                        dropPanelId:'drop-here'
                    });

                //create StickerPanel
                var stickerPanel = new myapp.StickerPanel({
                    fileInputId: 'stickerFiles',
                    outputImageId: 'stickerResult',
                    stickerUploadId: 'uploadSticker',
                    stickerSubmitId: 'stickerSubmit',
                    panelContainerClass:'sticker-panel'
                });




            };

        })();

    var stickerApp = new myapp.StickerApp();
}

$(document).ready(initStickerApp);
