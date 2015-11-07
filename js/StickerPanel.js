var myapp = myapp || {};

myapp.StickerPanel = (function (){

    return function(config) {
        var config = {fileInputId:'stickerFiles',outputImageId:'stickerResult',stickerUploadId:'uploadSticker'};
        var picReader = new FileReader();

        this.uploadStickerPhoto = function(event){
            var files = event.target.files; //FileList object
            var i = 0; var file = files[i];
            //Only image files
            if(!file.type.match('image')){
              alert('Invalid image file.');
              return;
            }
            picReader.readAsDataURL(file);
        };

        this.loadStickerPhoto = function(event){
            var picFile = event.target;
            var div = document.createElement("div");
            div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                    "title='" + picFile.name + "'/>";
            var output = document.getElementById(config.outputImageId);
            output.insertBefore(div,null);
            $('#'+config.fileInputId).hide();

        };

        this.showUploadPopup = function(){

        };

        this.initEventHandlers = function(){

            if(window.File && window.FileList && window.FileReader) {
                    var filesInput = document.getElementById(config.fileInputId);
                    filesInput.addEventListener("change", this.uploadStickerPhoto);
                    picReader.addEventListener("load",this.loadStickerPhoto);

            } else {
                alert("Your browser does not support File API");
            }

            if(document.getElementById(config.stickerUploadId)!=null){
                document.getElementById(config.stickerUploadId).addEventListener("click", this.showUploadPopup);
            }

        };

        window.onload = this.initEventHandlers();

    }

})();