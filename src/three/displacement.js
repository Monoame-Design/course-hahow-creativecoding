import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";

var vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vReflect;
  varying float ao;
  uniform float time;
  uniform vec2 resolution;

  uniform sampler2D displacementMap;
  uniform float displacementScale;
  uniform float displacementBias;

  uniform float normalsRatio;
  uniform float lookupRadius;
  uniform float mode;

  // vec3 transformDirection( in vec3 normal, in mat4 matrix ) {

  //   return normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );

  // }

  void main() {
    vec3 transformed = position;
    vec3 transformedNormal = normalMatrix * normal;
    vNormal = normalize( transformedNormal );
    // vNormal = normal;
    vUv = uv;

    float mean = ( texture2D( displacementMap, uv ).x + texture2D( displacementMap, uv ).y + texture2D( displacementMap, uv ).z ) / 3.0;

    transformed += normal * ( mean * displacementScale + displacementBias );

    //vec3 tut = texture2D( displacementMap, uv ).xyz;

    float aspect = resolution.x/resolution.y;
    float dx = lookupRadius / resolution.x;
    float dy = dx * aspect;

    vec4 dy1 = texture2D( displacementMap, uv + vec2( 0.0, dy ) );
    vec4 dy2 = texture2D( displacementMap, uv + vec2( 0.0, -dy ) );

    vec4 dx1 = texture2D( displacementMap, uv + vec2( dx, 0.0 ) );
    vec4 dx2 = texture2D( displacementMap, uv + vec2( -dx, 0.0 ) );

    float difX = 0.0;
    float difY = 0.0;

    if (mode > 0.5){

      vec4 d5 = texture2D( displacementMap, uv + vec2( dx, dy ) );
      vec4 d6 = texture2D( displacementMap, uv + vec2( -dx, -dy ) );
      vec4 d7 = texture2D( displacementMap, uv + vec2( dx, -dy ) );
      vec4 d8 = texture2D( displacementMap, uv + vec2( -dx, dy ) );

      difX = ( dx1.x - dx2.x + d5.x - d6.x + d7.x - d8.x ) / 3.0;
      difY = ( dy1.y - dy2.y + d5.y - d6.y + d7.y - d8.y ) / 3.0;
    }
    else{
      difX = dx1.x - dx2.x;
      difY = dy1.y - dy2.y;
    }
    vec3 modifiedNormal = normalize( normal + normalsRatio * vec3( difX, difY, 0.0 ) );
    vec3 worldNormal = normalize( -1.0 * mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * modifiedNormal );
    vec3 cameraToVertex = normalize( transformed.xyz - cameraPosition );
    //#ifdef ENVMAP_MODE_REFLECTION
      vReflect = reflect( cameraToVertex, worldNormal );
    //#else
      //vReflect = refract( cameraToVertex, worldNormal, 0.5 );
    //#endif
    gl_PointSize = 10.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
  }`;

var fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vReflect;
  varying float ao;
  uniform sampler2D envMap;
  uniform float time;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform vec2 mouse_pos;

  void main() {

    #ifdef DOUBLE_SIDED
      float flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );
    #else
      float flipNormal = 1.0;
    #endif

    vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( vReflect, 0.0 )).xyz + vec3(0.0,0.0,1.0));
    vec3 color = texture2D( envMap, reflectView.xy * 0.5 + 0.5 ).xyz;
    
    // vec3 reflectView = flipNormal * normalize((viewMatrix * vec4( vNormal, 0.0 )).xyz + vec3(0.0,0.0,1.0));
    // vec3 t = normalize(vec4( vNormal, 0.0 ).xyz + vec3(0.0,0.0,1.0));
    // vec3 color = texture2D( envMap, t.xy * 0.5 + 0.5 ).xyz;

    gl_FragColor = vec4(color, 1.0).rgba;
    // gl_FragColor = vec4(mouse_pos.x, color.y, 0.0, 1.0).rgba;
    // gl_FragColor = vec4(1.0, 0.0, sin(u_mouse.x * 0.001) + 0.5, 1.0).rgba;
    // gl_FragColor = vec4(1.0, 0.0, sin(p.x * 5.0) + 0.5, 1.0).rgba;  sin(time*0.001)
  }`;