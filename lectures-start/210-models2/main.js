const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "../../libs/loader.js";


document.addEventListener('DOMContentLoaded', ()=> {
	const start = async() => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: '../../assets/targets/musicband.mind',
		});
		const {renderer, scene, camera} = mindarThree;
		
		const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
		scene.add(light)
		
		const raccoon = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
		raccoon.scene.scale.set(0.1, 0.1, 0.1);
		raccoon.scene.position.set(0, -0.4, 0);
		
		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(raccoon.scene);
		
		await mindarThree.start();
		renderer.setAnimationLoop(() => { 
		renderer.render(scene, camera);
		});
		} 
		start();
	});
		