var myapp = myapp || {};

myapp.PhotoPanel = (function (){

    return function(config) {
        var photo = localStorage.getItem('main-photo') || '';
        var config = {fileInputId:'files',outputImageId:'result',resetButtonId:'startOver',dropPanelId:'drop-here'};
        var picReader = new FileReader();

        this.uploadMainPhoto = function(event){
            var files = event.target.files; //FileList object
            var i = 0; var file = files[i];
            //Only image files
            if(!file.type.match('image')){
              alert('Invalid image file.');
              return;
            }
            picReader.readAsDataURL(file);
        };

        this.loadPhoto = function(event){
            var picFile = event.target;
            var div = document.createElement("div");
            div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                    "title='" + picFile.name + "'/>";
            var output = document.getElementById(config.outputImageId);
            output.insertBefore(div,null);
            $('#'+config.fileInputId).hide();
            if($('#'+config.resetButtonId)!=null){
                $('#'+config.resetButtonId).show();
            }
        };

        this.resetPhoto = function(){
            $('#'+config.outputImageId).html('');
            $('#'+config.outputImageId).html('');
            $('#'+config.dropPanelId).html('');
        };

        this.initEventHandlers = function(){

            if(window.File && window.FileList && window.FileReader) {
                    var filesInput = document.getElementById(config.fileInputId);
                    filesInput.addEventListener("change", this.uploadMainPhoto);
                    picReader.addEventListener("load",this.loadPhoto);

            } else {
                alert("Your browser does not support File API");
            }

            if(document.getElementById(config.resetButtonId)!=null){
                document.getElementById(config.resetButtonId).addEventListener("click", this.resetPhoto);
            }
        };

        window.onload = this.initEventHandlers();

    }

})();