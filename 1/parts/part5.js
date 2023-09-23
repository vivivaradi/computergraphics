function init() {
    canvas = document.getElementById('gl-canvas');
    var gl = WebGLUtils.setupWebGL(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    program = initShaders(gl, "vertex-shader", "fragment-shader")
    gl.useProgram(program)

    var position = [vec2(0.0, 0.0)];
    var radius = 0.4
    var numVertices = 40;

    for (let i = 0; i <= numVertices; i++) {
        const angle = (i / numVertices) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        position.push(vec2(x, y));
    }

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(position), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition")
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vPosition)

    var theta = 0.0
    var thetaLoc = gl.getUniformLocation(program, "theta")

    function render()
    {
        setTimeout(function() {
            requestAnimFrame(render);
            gl.clear(gl.COLOR_BUFFER_BIT);
            theta += 0.1;
            gl.uniform1f(thetaLoc, theta);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, numVertices + 2);
        }, 100);
    }

    render()
}

window.onload = init
