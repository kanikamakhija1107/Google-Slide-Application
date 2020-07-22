import { makeResizableDiv } from './resizable.js';
import { dragElement } from './dragAndDrop';

document.getElementById('text').addEventListener('click', text);

function text() {
    var ok = true;

    if (ok === true) {

        let resizable = document.createElement('div');
        resizable.className = 'resizable';
        resizable.draggable = 'true';
        // resizable.ondragstart = 'dragStart(event)';
        // resizable.id = "dragtarget"

        let resizers = document.createElement('div');
        resizers.className = 'resizers';

        let div = document.createElement('div');
        div.className = 'editable';
        div.contentEditable = 'true';


        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 = document.createElement('div');
        let div4 = document.createElement('div');
        div1.className = 'resizer top-left';
        div2.className = 'resizer top-right';
        div3.className = 'resizer bottom-left';
        div4.className = 'resizer bottom-right';

        //append divs to resizer
        resizers.appendChild(div);
        resizers.appendChild(div1);
        resizers.appendChild(div2);
        resizers.appendChild(div3);
        resizers.appendChild(div4);
        resizable.appendChild(resizers);
        document.getElementById('container').appendChild(resizable);


        var editor = new MediumEditor('.editable');

        makeResizableDiv(resizable);
        dragElement(div1);


    }
}

var filesInput = document.getElementById("files");
filesInput.addEventListener("change", function (event) {
    var files = event.target.files;
    for (var i = 0; i < files.length; i++) {
        if (files[i]) {
            // var reader = new FileReader();

            // reader.onload = function (e) {
                //child of container div
                var resizable = document.createElement('div');
                resizable.className = 'resizable';

                //child of resizable
                var resizers = document.createElement('div');
                resizers.className = 'resizers';

                var divImage = document.createElement('div');
                divImage.className = 'editable';
                let image = document.createElement('img');
                image.src = window.URL.createObjectURL(files[i]);
                image.setAttribute('class', 'image');
            
                divImage.appendChild(image);

                //resizing elements
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                var div3 = document.createElement('div');
                var div4 = document.createElement('div');
                div1.className = 'resizer top-left';
                div2.className = 'resizer top-right';
                div3.className = 'resizer bottom-left';
                div4.className = 'resizer bottom-right';

                resizers.appendChild(divImage);
                resizers.appendChild(div1);
                resizers.appendChild(div2);
                resizers.appendChild(div3);
                resizers.appendChild(div4);
                resizable.appendChild(resizers);
                document.getElementById('container').appendChild(resizable);

                makeResizableDiv(resizable);
                dragElement(div1);
            // };
            // reader.readAsDataURL(files[i]);
        }
    }
});
function imageNew() {
    var ok = true;
    if (ok === true) {
        var files = input.files;
        for (var i = 0; i < files.length; i++) {
            if (files[i]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //child of container div
                    var resizable = document.createElement('div');
                    resizable.className = 'resizable';

                    //child of resizable
                    var resizers = document.createElement('div');
                    resizers.className = 'resizers';

                    //child if resizers
                    //editable text
                    var divImage = document.createElement('div');
                    var src = e.target;
                    console.log(src.result);
                    divImage.innerHTML = "<img class='thumbnail' src='" + src.result + "'" +
                        "title='" + src.name + "'/>";
                    divImage.innerHTML.src = reader.result;
                    divImage.className = 'editable';
                    divImage.draggable = 'true';

                    //resizing elements
                    var div1 = document.createElement('div');
                    var div2 = document.createElement('div');
                    var div3 = document.createElement('div');
                    var div4 = document.createElement('div');
                    div1.className = 'resizer top-left';
                    div2.className = 'resizer top-right';
                    div3.className = 'resizer bottom-left';
                    div4.className = 'resizer bottom-right';

                    resizers.appendChild(divImage);
                    resizers.appendChild(div1);
                    resizers.appendChild(div2);
                    resizers.appendChild(div3);
                    resizers.appendChild(div4);
                    resizable.appendChild(resizers);
                    document.getElementById('container').appendChild(resizable);

                    makeResizableDiv(resizable);
                    dragElement(div1);
                };
                reader.readAsDataURL(files[i]);
            }
        }
    }
}

document.getElementById('remove').addEventListener('click', remove);
function remove() {
    var elem = document.getElementsByClassName('resizable')[0];

    elem.parentNode.removeChild(elem);
}

