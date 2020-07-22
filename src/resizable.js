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
            window.removeEventListener('mousemove', resize);
        }
    }
}

export {makeResizableDiv};