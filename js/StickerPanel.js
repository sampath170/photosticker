var myapp = myapp || {};

myapp.StickerPanel = (function (){

    return function(config) {
        var config = {fileInputId:'stickerFiles',outputImageId:'stickerResult',stickerUploadId:'uploadSticker',stickerSubmitId:'stickerSubmit',panelContainerClass:'sticker-panel'};
        var picReader = new FileReader();
        var stickerSrc = '';
        var _ = this;

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
            stickerSrc = event.target;
        };

        this.setUpDragNDrop = function() {
            var draggableElements = $('.thumbnailx');

            for(var i=0; i<draggableElements.length; i++){

                draggableElements[i].ondragstart = function(evt) {
                    if($('#dragged-id') != null) //reset ID of all existing elements
                        $($('#dragged-id')[0]).attr('id','');
                    for(var i=0; i<draggableElements.length; i++){
                      draggableElements[i].setAttribute('id','')
                    }
                    $(evt.target).attr('id','dragged-elem');
                    evt.dataTransfer.setData("dragged-id", evt.target.id);
                };

                draggableElements[i].ondblclick = function(evt) {
                  evt.preventDefault();
                  draggableElements[i].draggable = "true";
                };
            }
            var drop1 = document.getElementById('drop-here');

            drop1.ondragover = function(evt) {
              evt.preventDefault();
            };

            drop1.ondrop = function(evt) {
              evt.preventDefault();
              var data = evt.dataTransfer.getData("dragged-id");
              $('.panelContainerClass').append(document.getElementById(data));
              //document.getElementById('drop-here').appendChild(document.getElementById(data));
              //document.getElementById(data).draggable = "";
              //document.getElementById(data).style.position = 'absolute';
              //document.getElementById(data).style.left = evt.x+'px';
              //document.getElementById(data).style.top = evt.y+'px';

              var dropElem = document.createElement('img');
              dropElem.setAttribute('src',$('#'+data).attr('src'));
              dropElem.style.position = 'absolute';
              dropElem.style.left = evt.x+'px';
              dropElem.style.top = evt.y+'px';
              document.getElementById('drop-here').appendChild(dropElem);

              //$('.'+config.panelContainerClass).append($(document.getElementById(data)));
            };
        };

        this.addSticker = function(){
            var div = document.createElement("div");
            div.style.id = 'drag1';
            div.innerHTML = "<img style='width:130px;height:130px' draggable='true' id='drag1' class='thumbnailx' src='" + stickerSrc.result + "'" +
                    "/>";
            var output = document.createElement('output');
            output.className = 'output-thumbnail';

            output.insertBefore(div,null);
            $('.'+config.panelContainerClass).append(div);

            _.setUpDragNDrop();
        };

        this.initEventHandlers = function(){

            if(window.File && window.FileList && window.FileReader) {
                    var filesInput = document.getElementById(config.fileInputId);
                    filesInput.addEventListener("change", this.uploadStickerPhoto);
                    picReader.addEventListener("load",this.loadStickerPhoto);

            } else {
                alert("Your browser does not support File API");
            }

            if(document.getElementById(config.stickerSubmitId)!=null){
                document.getElementById(config.stickerSubmitId).addEventListener("click", this.addSticker);
            }

        };

        window.onload = this.initEventHandlers();

    }

})();