import * as THREE from "three";

class fish_tank {
  tank_index: number;
  money: number;
  profit: number;
  name: string;
  model: any;
  tank_list: object[];
  constructor(name: string) {
    this.tank_index = 0;
    this.money = 0;
    this.profit = 1;
    this.name = name;

    this.tank_list = [{}];

    this.model = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshToonMaterial({ color: 0x7bbc88 }),
    );
  }
  time_passed() {
    this.money += this.profit;
    return this.money;
  }
  upgrade_tank() {}
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);

const canvas = document.getElementById("threejs")!;

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(-1, 2, 4);
scene.add(light);

function animate(time: number) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

renderer.setAnimationLoop(animate);
