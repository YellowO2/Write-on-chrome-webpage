
const body = document.body
const html = document.documentElement;

//set up html and body
html.style.position = 'relative'
html.style.minHeight = '100%'
body.style.height = '100%'

// ______________________________Declare Functions ________________________________________
const initCanvas = function(html, body){
    //get height of entire page
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );

    //create canvas element
    const canvas = document.createElement('canvas');

    //set canvas to size of page
    canvas.width = document.body.clientWidth;
    canvas.height = height;

    //set up canvas element
    body.append(canvas)
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.zIndex = '2221111111'
    canvas.style.pointerEvents = 'none'
    return canvas
}


//initialise canvas
const canvas = initCanvas(html, body)
const context = canvas.getContext('2d');

var marker = "rgb(0,0,0)";
var markerWidth = 1;

var lastEvent;
var mouseDown = false;
var active = false

//send message between popperjs and scribblejs
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    context.strokeStyle = request.color
    sendResponse({ status: "done" });
  });


document.addEventListener('keypress',function (e) {
    e = e || window.event
    if (e.key == 'd'){
        active = true
    }
});

document.addEventListener('keyup',function (e) {
    e = e || window.event
    if (e.key == 'd'){
        active = false
    }
});

body.addEventListener('mousedown',function(e){
    lastEvent = e;
    if (active){
        mouseDown = true
    }
    else{
        mouseDown = false
    }
    })

body.addEventListener('mousemove',function(e){
    if(mouseDown){
        //when drawing, block mouse events
        canvas.style.pointerEvents = 'auto'
        if (context){
            context.beginPath();
            context.moveTo(lastEvent.pageX,lastEvent.pageY);
            context.lineTo(e.pageX,e.pageY);
            context.lineWidth=markerWidth;
            context.lineCap='round';
            context.stroke();
        }

        lastEvent = e;
    }
  })

body.addEventListener('mouseup',function(){
    mouseDown = false; 
    canvas.style.pointerEvents = 'none'
  })

var clear = function(){
//   context.clearRect(0,0,575,300);
};
