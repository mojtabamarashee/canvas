<!DOCTYPE html>

<head>
  <meta charset="UTF-8">
  <title>Canvas example</title>
  <script src="https://unpkg.com/redux@latest/dist/redux.min.js"></script>
</head>
<body>
  <canvas></canvas>
  <script>
    // Get the canvas element
    var canvas = document.querySelector('canvas');
    // Get the drawing context
    var ctx = canvas.getContext('2d');
    // Define the initial state
    var initialState = {
      rectangles: [
        {
          x: 10,
          y: 10,
          width: 50,
          height: 50,
          color: 'red'
        }
      ]
    };
    // Define how state changes
    function reducer(state, action) {
      switch (action.type) {
      case 'TRANSLATE':
        return {
          rectangles: state.rectangles.map(function(rect) {
            return {
              x: rect.x + action.x,
              y: rect.y + action.y,
              width: rect.width,
              height: rect.height,
              color: rect.color
            };
          })
        };
      default:
        return state;
      }
    }
    // Define how state is viewed
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var state = store.getState();
      state.rectangles.forEach(function(rect) {
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      });
    }
    // Create the Redux store 
    // (to manage state changes)
    var store = Redux.createStore(reducer, initialState);
    store.subscribe(function() {
      render();
    });
    // Draw the initial view
    render();
    // "Move" the rectangle
    setTimeout(function() {
      store.dispatch({type: 'TRANSLATE', x: 20, y: 0});
    }, 1000);
</script>
</body>
</html>
