//  import dragdrop from './dragDrop';


function imageNew(input) {
    var ok = true;
    if (ok === true) {

        for (var i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //child of container div
                    var resizable = document.createElement('div');
                    resizable.className = 'resizable';

                    //child of resizable
                    var resizers = document.createElement('div');
                    resizers.className = 'resizers';

                    //child if resizerts
                    //editable text
                    var div = document.createElement('div');
                    var src = e.target;
                    div.innerHTML = "<img class='thumbnail' draggable= 'event.preventDefault()' src='" + src.result + "'" +
                        "title='" + src.name + "'/>";
                    div.innerHTML.src = reader.result;
                    div.className = 'editable';
                    div.draggable = 'true';

                    //resizing elements
                    var div1 = document.createElement('div');
                    var div2 = document.createElement('div');
                    var div3 = document.createElement('div');
                    var div4 = document.createElement('div');
                    div1.className = 'resizer top-left';
                    div2.className = 'resizer top-right';
                    div3.className = 'resizer bottom-left';
                    div4.className = 'resizer bottom-right';

                    resizers.appendChild(div);
                    resizers.appendChild(div1);
                    resizers.appendChild(div2);
                    resizers.appendChild(div3);
                    resizers.appendChild(div4);
                    resizable.appendChild(resizers);
                    document.getElementById('container').appendChild(resizable);

                    makeResizableDiv(resizable);
                    dragElement(div1);
                };
                reader.readAsDataURL(input.files[i]);
            }
        }
    }
}

function dragElement(div) {
    let resizable = document.querySelector('.resizable');


    div.onmousedown = function (event) {

        let shiftX = event.clientX - div.getBoundingClientRect().left;
        let shiftY = event.clientY - div.getBoundingClientRect().top;

        // resizable.style.position = 'absolute';
        // resizable.style.zIndex = 1000;
        document.body.append(resizable);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            resizable.style.left = pageX - shiftX + 'px';
            resizable.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            // event.preventDefault;
        }

        document.addEventListener('mousemove', onMouseMove, false);

        div.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove, false);
            document.onmouseup = false;

            document.onmouseup = null;
            document.onmousemove = null;
            div.onmousemove = null;
            div.onMouseMove = null;
        };

    };

    div.ondragstart = function () {
        return false;
    };
}



function makeResizableDiv(div) {
    // var div = 
    //  const element = document.getElementsByClassName(div);
    const resizers = div.querySelectorAll('.resizable' + ' .resizer')
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];

        currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(div, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(div, null).getPropertyValue('height').replace('px', ''));
            original_x = div.getBoundingClientRect().left;
            original_y = div.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        })

        function resize(e) {
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    div.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    div.style.height = height + 'px'
                }
            }
            else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.pageY - original_mouse_y)
                const width = original_width - (e.pageX - original_mouse_x)
                if (height > minimum_size) {
                    div.style.height = height + 'px'
                }
                if (width > minimum_size) {
                    div.style.width = width + 'px'
                    div.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
            }
            else if (currentResizer.classList.contains('top-right')) {
                const width = original_width + (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    div.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    div.style.height = height + 'px'
                    div.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                }
            }
            // else {
            //     const width = original_width - (e.pageX - original_mouse_x)
            //     const height = original_height - (e.pageY - original_mouse_y)
            //     if (width > minimum_size) {
            //         element.style.width = width + 'px'
            //         element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            //     }
            //     if (height > minimum_size) {
            //         element.style.height = height + 'px'
            //         element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            //     }
            // }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }
}