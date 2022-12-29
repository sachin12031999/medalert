
var _containerHeight = 4000;
var _width, _height, _scrollHeight;

var _movingElements = [];
var _scrollPercent = 0;
var pre = prefix();
var _jsPrefix  = pre.lowercase;
if(_jsPrefix == 'moz') _jsPrefix = 'Moz'
var _cssPrefix = pre.css;
var _positions = [
  
  {
    name: 'hdotted', 
   	start: {
    	percent: 0.09, x: 0, y: 0.16
  	},
    end: {
      percent: 0.2, x: 0, y: 0.195
    }
  },
  
  {
    name: 'hgreen', 
   	start: {
    	percent: 0.09, x: 0.001, y: 0.17
  	},
    end: {
      percent: 0.3, x: 0.003, y: 0.21
    }
  },

  {
    name: 'hgreenright', 
    start: {
    	percent: 0.09, x: 0.046, y: 0.18
  	},
    end: {
      percent: 0.2, x: 0.044, y: 0.175
    }
  },

  {
    name: 'hgreenbottom', 
   	start: {
    	percent: 0.4, x: 0.0025, y: 0.545
  	},
    end: {
      percent: 0.6, x: 0.004, y: 0.55
    }
  }
]

resize();
initMovingElements();

function initMovingElements() {
  for (var i = 0; i < _positions.length; i++) {
    _positions[i].diff = {
      percent: _positions[i].end.percent - _positions[i].start.percent,
      x: _positions[i].end.x - _positions[i].start.x,
      y: _positions[i].end.y - _positions[i].start.y,
    }
    var el = document.getElementsByClassName('square '+_positions[i].name)[0];
    _movingElements.push(el);
  }
}

function resize() {
	_width = 1450;
  _height = window.innerHeight;
  _scrollHeight = _containerHeight-_height;
}


function updateElements() {
  for (var i = 0; i < _movingElements.length; i++) {
    var p = _positions[i];
    if(_scrollPercent <= p.start.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width)+'vw, '+(p.start.y*_containerHeight)/20+'vw, 0vw)';
    } else if(_scrollPercent >= p.end.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.end.x*_width)+'vw, '+(p.end.y*_containerHeight)/20+'vw, 0vw)';
    } else {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width + (p.diff.x*(_scrollPercent-p.start.percent)/p.diff.percent*_width))+'vw, '+
        (p.start.y*_containerHeight + (p.diff.y*(_scrollPercent-p.start.percent)/p.diff.percent*_containerHeight))/20+'vw, 0vw)';
    }
  }
}



function loop() {
  _scrollOffset = window.pageYOffset || window.scrollTop;
  _scrollPercent = _scrollOffset/_scrollHeight || 0;
  updateElements();
  
  requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', resize);

function prefix() {
  var stylese = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(stylese)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (stylese.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
}

