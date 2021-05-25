function dragElement(elmnt: HTMLElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.position = 'absolute';
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;

        let parent = elmnt.parentNode;
        let newCell = document.elementFromPoint(pos3, pos4) as HTMLElement;

        if (newCell.tagName == 'IMG') newCell = newCell.parentNode as HTMLElement;

        console.log(newCell.tagName)

        if (newCell.tagName == 'TD') {
            for (let child of newCell.children) {
                newCell.removeChild(child);
            }

            if (parent != null) parent.removeChild(elmnt);

            newCell.append(elmnt);
        }

        elmnt.style.position = 'static';
        elmnt.style.top = '';
        elmnt.style.left = '';
    }
}