<template>
  <div class="test">
    <div id="info">
      Video texture displacement/height map + vertex normals estimation from
      displacement texture
    </div>
    <div id="container"></div>

    <div id="video_buttons">
      <div style="font-weight: normal;">Click to play/pause</div>
      <div id="buttons">
        <video autoplay accesskey="0">
          <source
            src="@/assets/image/waves3.ogg"
            type='video/ogg; codecs="theora, vorbis"'
          />
        </video>
        <video accesskey="1">
          <source
            src="@/assets/image/waves4.ogg"
            type='video/ogg; codecs="theora, vorbis"'
          />
        </video>
        <video accesskey="2">
          <source
            src="@/assets/image/waves2.ogg"
            type='video/ogg; codecs="theora, vorbis"'
          />
        </video>
        <video accesskey="3">
          <source
            src="@/assets/image/waves5.ogg"
            type='video/ogg; codecs="theora, vorbis"'
          />
        </video>
        <video accesskey="4">
          <source
            src="@/assets/image/waves6.ogg"
            type='video/ogg; codecs="theora, vorbis"'
          />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
console.clear();
// @ is an alias to /src
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

export default {
  name: "Test",
  components: {},
  data() {
    return {
      controls: null,
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      object: null,
      edges: null,
      material: null,
      video: [],
      video_texture: null,
      textureSphere: null,
      mouse_pos: new THREE.Vector2(0, 0),
      params: {
        displacementScale: 45,
        normalsRatio: 4,
        lookupRadius: 1,
        mode: 0
      }
    };
  },
  methods: {
    init() {
      this.container = document.getElementById("container");

      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.z = 5;
      // this.camera.position.z = 800;

      this.scene = new THREE.Scene();

      this.addLights();

      this.setupChangeScene();

      this.video_texture = new THREE.VideoTexture(this.video[0]);
      this.video_texture.minFilter = THREE.LinearFilter;
      this.video_texture.magFilter = THREE.LinearFilter;
      this.video_texture.format = THREE.RGBFormat;
      this.textureSphere = new THREE.TextureLoader().load(
        require("@/assets/image/planet.jpg")
      );
      // this.textureSphere.mapping = THREE.SphericalReflectionMapping;
      // this.textureSphere.mapping = THREE.EquirectangularRefractionMapping;

      this.object = this.createThing(60);
      // this.object = this.createDisplacementObj(60);
      // this.camera.position.z = 5;
      this.camera.position.z = 800;

      this.object.rotation.y = Math.PI / 2;

      this.scene.add(this.object);

      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });

      this.renderer.setClearColor(0x101010);
      // this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(this.renderer.domElement);

      // let orbit = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      // let orbit = OrbitControls(this.camera, this.renderer.domElement);

      // this.stats = new Stats();
      // stats.domElement.style.position = "absolute";
      // stats.domElement.style.top = "0px";
      // container.appendChild(stats.domElement);

      window.addEventListener("resize", this.onWindowResize, false);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    createDisplacementObj(radius) {
      //ref: https://sbcode.net/threejs/displacmentmap/
      let texture = new THREE.TextureLoader().load(
        require("@/assets/image/worldColour.2700x1350.jpg")
      );
      let displacementMap = new THREE.TextureLoader().load(
        require("@/assets/image/gebco_bathy.2700x1350_8bit.jpg")
      );
      this.plane = new THREE.PlaneGeometry(10, 5, 200, 100);
      // this.material = new THREE.MeshPhongMaterial({
      //   wireframe: true,
      //   color: 0xffffff,
      //   side: THREE.DoubleSide,
      //   displacementScale: -1,
      //   displacementBias: 1.0,
      //   map: texture,
      //   displacementMap: displacementMap
      // });
      this.material = new THREE.ShaderMaterial({
        // 要傳進 shader 裡面的參數
        uniforms: {
          displacementMap: { type: "t", value: displacementMap },
          displacementScale: { type: "f", value: 2 },
          displacementBias: { type: "f", value: 0 },

          // "normalMap" : { type: "t", value: video_texture },
          // "normalScale" : { type: "v2", value: new THREE.Vector2( 1, 1 ) },

          resolution: { type: "v2", value: new THREE.Vector2(300, 300) },
          normalsRatio: { type: "f", value: 10.0 },
          lookupRadius: { type: "f", value: 1.0 },
          mode: { type: "f", value: 0.0 },

          envMap: { type: "t", value: texture },
          time: { type: "f", value: 0 },
          mouse_pos: { type: "v2", value: this.mouse_pos }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,

        side: THREE.DoubleSide
        //shading: THREE.FlatShading
      });

      let mesh = new THREE.Mesh(this.plane, this.material);
      this.scene.add(mesh);
      return mesh;
    },
    createThing(radius) {
      // 創建ㄧ個 20 面體
      this.geometry = new THREE.IcosahedronGeometry(radius, 5);

      this.material = new THREE.ShaderMaterial({
        // 要傳進 shader 裡面的參數
        uniforms: {
          displacementMap: { type: "t", value: this.video_texture },
          displacementScale: { type: "f", value: 60 },
          displacementBias: { type: "f", value: 0 },

          // "normalMap" : { type: "t", value: video_texture },
          // "normalScale" : { type: "v2", value: new THREE.Vector2( 1, 1 ) },

          resolution: { type: "v2", value: new THREE.Vector2(300, 300) },
          normalsRatio: { type: "f", value: 10.0 },
          lookupRadius: { type: "f", value: 1.0 },
          mode: { type: "f", value: 0.0 },

          envMap: { type: "t", value: this.textureSphere },
          time: { type: "f", value: 0 },
          mouse_pos: { type: "v2", value: this.mouse_pos }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader

        //side: THREE.DoubleSide,
        //shading: THREE.FlatShading
      });

      let mesh = new THREE.Mesh(this.geometry, this.material);
      return mesh;
    },
    addLights() {
      let ambientLight = new THREE.AmbientLight(0x666666);
      this.scene.add(ambientLight);

      let lights = [];
      lights[0] = new THREE.PointLight(0xffffff, 1, 0);
      lights[1] = new THREE.PointLight(0xffffff, 1, 0);
      lights[2] = new THREE.PointLight(0xffffff, 1, 0);

      lights[0].position.set(-300, 600, 200);
      lights[1].position.set(100, 600, 100);
      lights[2].position.set(-100, -600, -400);

      this.scene.add(lights[0]);
      this.scene.add(lights[1]);
      this.scene.add(lights[2]);
    },
    setupChangeScene() {
      let btns = document.getElementById("buttons").children;

      for (let i = 0; i < btns.length; i++) {
        this.video[i] = btns[i];
        this.video[i].playbackRate = 1.0;

        this.video[i].addEventListener("ended", args => {
          let ix = args.target.accessKey;
          //this.video[ix].currentTime = 0;
          this.video[ix].play();
          // this.video[ix].load()
        });

        this.video[i].addEventListener("click", args => {
          // var other_btns = args.target.parentElement.children
          let other_btns = document.getElementsByTagName("this.video");
          let ix = args.target.accessKey;
          // this.video[ix].pause()
          for (let i = 0; i < other_btns.length; i++) {
            if (i != ix) this.video[i].pause();
          }
          this.video[ix].paused
            ? this.video[ix].play()
            : this.video[ix].pause();

          this.video_texture = new THREE.VideoTexture(this.video[ix]);
          this.video_texture.minFilter = THREE.LinearFilter;
          this.video_texture.magFilter = THREE.LinearFilter;
          this.video_texture.format = THREE.RGBFormat;

          this.material.uniforms["displacementMap"].value = this.video_texture;
        });
      }
    },
    render() {
      let time = performance.now();
      // this.material.uniforms["time"].value = time;
      this.object.rotation.y += 0.00009;
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize(event) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  },
  created() {},
  mounted() {
    this.init();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.screenSpacePanning = true;
    window.addEventListener("mousemove", e => {
      // console.log()
      this.mouse_pos.x = e.x / window.innerWidth;
      this.mouse_pos.y = e.y / window.innerHeight;
      // this.material.uniforms["mouse_pos"].value = this.mouse_pos;
    });
    this.animate();
  }
};
</script>

<style lang="scss" scoped>
.test {
  color: #fff;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
body {
  color: #ffffff;
  font-family: Monospace;
  font-size: 13px;
  text-align: center;
  font-weight: normal;

  background-color: #000000;
  margin: 0px;
  overflow: hidden;
}
#info {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 5px;
}
#gui {
  right: 0;
  position: absolute;
  top: 0;
  z-index: 100;
}
#video_buttons {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
  width: 170px;
  z-index: 100;
}
video {
  width: 100%;
  display: block;
  padding: 4px;
}
</style>
