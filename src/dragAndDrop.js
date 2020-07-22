import { WSAEINVALIDPROCTABLE } from "constants";

function dragElement(div) {
    let resizable = document.querySelector('.resizable');
    let resizers = document.querySelector('.resizers');
    let editable = document.querySelector('.editable');


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

        function onmousemove(event) {
            moveAt(event.pageX, event.pageY);
            // event.preventDefault;
        }

        document.addEventListener('mousemove', onmousemove, false);

        div.onmouseup = function () {
            document.removeEventListener('mousemove', onmousemove, false);
            div.removeEventListener('mousemove', onmousemove, false);
            window.removeEventListener('mousemove', onmousemove, false);
            document.onmouseup = false;

            document.onmouseup = null;
            document.onmousemove = null;
            div.onmouseup = null;
            div.onmousemove = null;
            // document.onmousedown = null;
            // div.onmousedown = null;
            // window.onmousedown = null;
            window.onmousemove = null;
            

        };

        window.onmouseup = function(){
            document.removeEventListener('mousemove', onmousemove, false);
            div.removeEventListener('mousemove', onmousemove, false);
            window.removeEventListener('mousemove', onmousemove, false);
            document.onmouseup = false;

            document.onmouseup = null;
            document.onmousemove = null;
            div.onmouseup = null;
            div.onmousemove = null;
            // document.onmousedown = null;
            // div.onmousedown = null;
            // window.onmousedown = null;
            window.onmousemove = null;
        }

    };

    div.ondragstart = function () {
        return false;
    };
}

export {dragElement};
