import Vue from 'vue';

// v-dialogDrag: Make Dialog dragable
Vue.directive('dialogDragAble', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        
        dialogHeaderEl.onmousedown = (e) => {
            const {onTopEdge, onLeftEdge, onRightEdge, onBottomEdge, rightScreenEdge, bottomScreenEdge} = calc(e, dragDom);
            if(!(onTopEdge || onLeftEdge || onRightEdge || onBottomEdge)){
                // get distnace to window
                const disX = e.clientX - dialogHeaderEl.offsetLeft;
                const disY = e.clientY - dialogHeaderEl.offsetTop;
                
                let styL, styT;
                
                // 把值替換成px
                if(sty.left.includes('%')) {
                    styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                    styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
                }else {
                    styL = +sty.left.replace(/\px/g, '');
                    styT = +sty.top.replace(/\px/g, '');
                };
                
                document.onmousemove = function (e) {
                    // 計算移動距離 
                    const l = e.clientX - disX;
                    const t = e.clientY - disY;

                    // 移動元素  
                    dragDom.style.left = `${l + styL}px`;
                    dragDom.style.top = `${t + styT}px`;

                    //把此時的位置傳出去
                    //binding.value({x:e.pageX,y:e.pageY})
                };

                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }  
    }
})


function calc(e, element) {
    const MARGINS = 5;
    const b = element.getBoundingClientRect();
    console.log("b left", b.left);
    const x = e.clientX - b.left;
    const y = e.clientY - b.top;
  
    const onTopEdge = y < MARGINS;
    const onLeftEdge = x < MARGINS;
    const onRightEdge = x >= b.width - MARGINS;
    const onBottomEdge = y >= b.height - MARGINS;
  
    const rightScreenEdge = window.innerWidth - MARGINS;
    const bottomScreenEdge = window.innerHeight - MARGINS;
    return {
        onTopEdge, onLeftEdge, onRightEdge, onBottomEdge,
        rightScreenEdge, bottomScreenEdge, b
    };
}
// v-dialogDragWidth: dialog box extend or shrink
Vue.directive('dialogDragWidth', {
    bind(el, binding, vnode, oldVnode) {
        let dragDom = el.querySelector('.el-dialog');
        let dialogHeaderEl = el.querySelector('.el-dialog__header');
     
        el.onmousemove = (e) => {
            const {onTopEdge, onLeftEdge, onRightEdge, onBottomEdge, rightScreenEdge, bottomScreenEdge, b} = calc(e, dragDom);
            if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
                // dragDom.style.cursor = 'nwse-resize';
                // dialogHeaderEl.style.cursor = 'nwse-resize';
            } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
                // dragDom.style.cursor = 'nesw-resize';
                // dialogHeaderEl.style.cursor = 'nesw-resize';
            } else if (onRightEdge || onLeftEdge) {
                dragDom.style.cursor = 'ew-resize';
                dialogHeaderEl.style.cursor = 'ew-resize';
            } else if (onBottomEdge || onTopEdge) {
                // dragDom.style.cursor = 'ns-resize';
                // dialogHeaderEl.style.cursor = 'ns-resize';
            } else {
                dragDom.style.cursor = 'default';
                dialogHeaderEl.style.cursor = 'move';
            }
            var isResizing = onRightEdge || onLeftEdge;
            if(isResizing){
                el.onmousedown = e => {
                    e.preventDefault();
                    const disX = e.clientX;
                    const disY = e.clientY;
                    el.onmousemove = (e) => {
                        let moveX = disX - e.clientX;
                        let moveY = disY - e.clientY;
                        if(onLeftEdge) {
                            dragDom.style.width = (b.width + moveX * 2) + "px";
                            // dragDom.style.left = (b.left + moveX * 1) + "px";
                        } 
                        if(onRightEdge) {
                            dragDom.style.width = (b.width + moveX * -2) + "px";
                            // dragDom.style.left = (b.left + moveX * -1) + "px";
                        } 
                        // if(onTopEdge) {
                        //     dragDom.style.height = (b.height + moveY * 1) + "px";
                        // } 
                        // if(onBottomEdge) {
                        //     dragDom.style.height = (b.height + moveY * -1) + "px";
                        // } 
                    }
                }
                document.onmouseup = function (e) {
                    el.onmousemove = null;
                    el.onmouseup = null;
                    dragDom = el.querySelector('.el-dialog');
                    dialogHeaderEl = el.querySelector('.el-dialog__header');
                };
            }
            

        }
        // //w-resize
        // el.onmousedown = (e) => {
            
        //     const disX = e.clientX;
            
        //     document.onmousemove = function (e) {
        //         e.preventDefault(); // 移动时禁用默认事件

        //         // Calculate mouse move distance 
        //         const l = e.clientX - disX;
        //         dragDom.style.width = `${l}px`;
        //     };

        //     document.onmouseup = function (e) {
        //         document.onmousemove = null;
        //         document.onmouseup = null;
        //     };
        // }  
    }
})


/*
 * @author https://twitter.com/blurspline / https://github.com/zz85
 * See post @ http://www.lab4games.net/zz85/blog/2014/11/15/resizing-moving-snapping-windows-with-js-css/
 */

// "use strict";

// // Minimum resizable area
// var minWidth = 60;
// var minHeight = 40;

// // Thresholds
// var FULLSCREEN_MARGINS = -10;
// var MARGINS = 4;

// // End of what's configurable.
// var clicked = null;
// var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;

// var rightScreenEdge, bottomScreenEdge;

// var preSnapped;

// var b, x, y;

// var redraw = false;

// var pane = document.getElementById('pane');
// var ghostpane = document.getElementById('ghostpane');

// function setBounds(element, x, y, w, h) {
// 	element.style.left = x + 'px';
// 	element.style.top = y + 'px';
// 	element.style.width = w + 'px';
// 	element.style.height = h + 'px';
// }

// function hintHide() {
//   setBounds(ghostpane, b.left, b.top, b.width, b.height);
//   ghostpane.style.opacity = 0;

//   // var b = ghostpane.getBoundingClientRect();
//   // ghostpane.style.top = b.top + b.height / 2;
//   // ghostpane.style.left = b.left + b.width / 2;
//   // ghostpane.style.width = 0;
//   // ghostpane.style.height = 0;
// }


// // Mouse events
// pane.addEventListener('mousedown', onMouseDown);
// document.addEventListener('mousemove', onMove);
// document.addEventListener('mouseup', onUp);

// // Touch events	
// pane.addEventListener('touchstart', onTouchDown);
// document.addEventListener('touchmove', onTouchMove);
// document.addEventListener('touchend', onTouchEnd);


// function onTouchDown(e) {
//   onDown(e.touches[0]);
//   e.preventDefault();
// }

// function onTouchMove(e) {
//   onMove(e.touches[0]);		
// }

// function onTouchEnd(e) {
//   if (e.touches.length ==0) onUp(e.changedTouches[0]);
// }

// function onMouseDown(e) {
//   onDown(e);
//   e.preventDefault();
// }

// function onDown(e) {
//   calc(e);

//   var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

//   clicked = {
//     x: x,
//     y: y,
//     cx: e.clientX,
//     cy: e.clientY,
//     w: b.width,
//     h: b.height,
//     isResizing: isResizing,
//     isMoving: !isResizing && canMove(),
//     onTopEdge: onTopEdge,
//     onLeftEdge: onLeftEdge,
//     onRightEdge: onRightEdge,
//     onBottomEdge: onBottomEdge
//   };
// }

// function canMove() {
//   return x > 0 && x < b.width && y > 0 && y < b.height
//   && y < 30;
// }

// function calc(e) {
//   b = pane.getBoundingClientRect();
//   x = e.clientX - b.left;
//   y = e.clientY - b.top;

//   onTopEdge = y < MARGINS;
//   onLeftEdge = x < MARGINS;
//   onRightEdge = x >= b.width - MARGINS;
//   onBottomEdge = y >= b.height - MARGINS;

//   rightScreenEdge = window.innerWidth - MARGINS;
//   bottomScreenEdge = window.innerHeight - MARGINS;
// }

// var e;

// function onMove(ee) {
//   calc(ee);

//   e = ee;

//   redraw = true;

// }

// function animate() {

//   requestAnimationFrame(animate);

//   if (!redraw) return;

//   redraw = false;

//   if (clicked && clicked.isResizing) {

//     if (clicked.onRightEdge) pane.style.width = Math.max(x, minWidth) + 'px';
//     if (clicked.onBottomEdge) pane.style.height = Math.max(y, minHeight) + 'px';

//     if (clicked.onLeftEdge) {
//       var currentWidth = Math.max(clicked.cx - e.clientX  + clicked.w, minWidth);
//       if (currentWidth > minWidth) {
//         pane.style.width = currentWidth + 'px';
//         pane.style.left = e.clientX + 'px';	
//       }
//     }

//     if (clicked.onTopEdge) {
//       var currentHeight = Math.max(clicked.cy - e.clientY  + clicked.h, minHeight);
//       if (currentHeight > minHeight) {
//         pane.style.height = currentHeight + 'px';
//         pane.style.top = e.clientY + 'px';	
//       }
//     }

//     hintHide();

//     return;
//   }

//   if (clicked && clicked.isMoving) {

//     if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.innerWidth - FULLSCREEN_MARGINS || b.bottom > window.innerHeight - FULLSCREEN_MARGINS) {
//       // hintFull();
//       setBounds(ghostpane, 0, 0, window.innerWidth, window.innerHeight);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.top < MARGINS) {
//       // hintTop();
//       setBounds(ghostpane, 0, 0, window.innerWidth, window.innerHeight / 2);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.left < MARGINS) {
//       // hintLeft();
//       setBounds(ghostpane, 0, 0, window.innerWidth / 2, window.innerHeight);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.right > rightScreenEdge) {
//       // hintRight();
//       setBounds(ghostpane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
//       ghostpane.style.opacity = 0.2;
//     } else if (b.bottom > bottomScreenEdge) {
//       // hintBottom();
//       setBounds(ghostpane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
//       ghostpane.style.opacity = 0.2;
//     } else {
//       hintHide();
//     }

//     if (preSnapped) {
//       setBounds(pane,
//       	e.clientX - preSnapped.width / 2,
//       	e.clientY - Math.min(clicked.y, preSnapped.height),
//       	preSnapped.width,
//       	preSnapped.height
//       );
//       return;
//     }

//     // moving
//     pane.style.top = (e.clientY - clicked.y) + 'px';
//     pane.style.left = (e.clientX - clicked.x) + 'px';

//     return;
//   }

//   // This code executes when mouse moves without clicking

//   // style cursor
//   if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
//     pane.style.cursor = 'nwse-resize';
//   } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
//     pane.style.cursor = 'nesw-resize';
//   } else if (onRightEdge || onLeftEdge) {
//     pane.style.cursor = 'ew-resize';
//   } else if (onBottomEdge || onTopEdge) {
//     pane.style.cursor = 'ns-resize';
//   } else if (canMove()) {
//     pane.style.cursor = 'move';
//   } else {
//     pane.style.cursor = 'default';
//   }
// }

// animate();

// function onUp(e) {
//   calc(e);

//   if (clicked && clicked.isMoving) {
//     // Snap
//     var snapped = {
//       width: b.width,
//       height: b.height
//     };

//     if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.innerWidth - FULLSCREEN_MARGINS || b.bottom > window.innerHeight - FULLSCREEN_MARGINS) {
//       // hintFull();
//       setBounds(pane, 0, 0, window.innerWidth, window.innerHeight);
//       preSnapped = snapped;
//     } else if (b.top < MARGINS) {
//       // hintTop();
//       setBounds(pane, 0, 0, window.innerWidth, window.innerHeight / 2);
//       preSnapped = snapped;
//     } else if (b.left < MARGINS) {
//       // hintLeft();
//       setBounds(pane, 0, 0, window.innerWidth / 2, window.innerHeight);
//       preSnapped = snapped;
//     } else if (b.right > rightScreenEdge) {
//       // hintRight();
//       setBounds(pane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
//       preSnapped = snapped;
//     } else if (b.bottom > bottomScreenEdge) {
//       // hintBottom();
//       setBounds(pane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
//       preSnapped = snapped;
//     } else {
//       preSnapped = null;
//     }

//     hintHide();

//   }

//   clicked = null;

// }
