function init() {
    canvas = document.getElementById('gl-canvas');
    var gl = WebGLUtils.setupWebGL(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

    var index = 0
    var maxVertices = 1000;
    var numPoints = 0

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, maxVertices*sizeof['vec2'], gl.STATIC_DRAW);

    canvas.addEventListener("click", function(event) {
        var boundingRect = event.target.getBoundingClientRect()
        var t = vec2(-1 + 2*(event.clientX-boundingRect.left)/canvas.width,
        -1 + 2*(canvas.height-(event.clientY-boundingRect.top))/canvas.height);
        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2']*index, flatten(t));
        numPoints = Math.max(numPoints, ++index); index %= max_verts;
    });

    program = initShaders(gl, "vertex-shader", "fragment-shader")
    gl.useProgram(program)

    var vPosition = gl.getAttribLocation(program, "vPosition")
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vPosition)

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.POINTS, 0, index);
        requestAnimFrame(render, canvas);
    }

    render()
}

window.onload = init
