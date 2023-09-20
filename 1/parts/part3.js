function init() {
    canvas = document.getElementById('gl-canvas');
    var gl = WebGLUtils.setupWebGL(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    program = initShaders(gl, "vertex-shader", "fragment-shader")
    gl.useProgram(program)

    var vertices = [ vec2(0.0, 0.0), vec2(1.0, 0.0), vec2(1.0, 1.0) ];
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition")
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vPosition)

    var colors = [ vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0) ]
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW)

    var aColor = gl.getAttribLocation(program, "a_Color")
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aColor)

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length)
}

window.onload = init