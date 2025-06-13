const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "../../../libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
	  imageTargetSrc: '../../../assets/targets/book.mind',
    });
    const {renderer, scene, camera} = mindarThree;
	
	const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
	scene.add(light);

    const anchor = mindarThree.addAnchor(0);
	
	const gltf = await loadGLTF("../../../assets/models/Model_4/scene.gltf");
	gltf.scene.scale.set(0.241, 0.241, 0.241);
	const clock = new THREE.Clock();
	
	
	//gltf.scene.scale.set(0.1, 0.1, 0.1);
	//gltf.scene.position.set(0, -0.4, 0);
	
	anchor.group.add(gltf.scene);

    await mindarThree.start();
	
    renderer.setAnimationLoop(() => {
	
	const delta = clock.getDelta();
	gltf.scene.rotation.set(0, gltf.scene.rotation.y += delta * 0.25, 0);
		
		
      renderer.render(scene, camera);
    });
  }
  start();
});
