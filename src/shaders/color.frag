uniform vec3 color;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;

void main() {

    vec4 pc = texture2D(uSampler,vTextureCoord);

    vec3 c = vec3(color);

    if (pc.a > 0.0) {
        gl_FragColor = vec4(color.r, color.g, color.b, pc.a);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }


}