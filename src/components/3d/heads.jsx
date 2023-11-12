/** @jsxImportSource react */

import { useRef } from 'react'
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import {
    useGLTF,
    Html,
    CameraControls,
    MeshRefractionMaterial
} from '@react-three/drei'
import { easing, geometry } from 'maath'
import { RGBELoader } from 'three-stdlib'
import { Vector3 } from 'three'

extend(geometry)

// one function to import 
import { qwikify$ } from '@builder.io/qwik-react';

const Heads = () => {
    const cameraControlsRef = useRef()
    useFrame((state) => {
        vec3.set(state.pointer.x * 2, state.pointer.y * 2, state.camera.position.z)
        state.camera.position.lerp(vec3, 0.025)
        // easing.dampE(group.current.rotation, [0, -state.pointer.x * (Math.PI / 10), 0], 1.5, delta)
        // easing.damp3(group.current.position, [0, 0, 1 - Math.abs(state.pointer.x)], 1, delta)
    })
    return (
        <Canvas shadows="basic" camera={{ position: [0, 1.5, 14], fov: 45 }}>
            <color attach="background" args={['#15151a']} />
            <pointLight position={[-8, 0, -16]} intensity={100} />
            <pointLight position={[-8, 0, -16]} intensity={100} />
            <Model position={[0, 0, 0]} rotation={[0, 0, 0]} />
            <CameraControls 
                ref={cameraControlsRef} 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2} 
                minAzimuthAngle={-Math.PI / 2} 
                maxAzimuthAngle={Math.PI / 2} />            
        </Canvas>
    )
}

const vec3 = new Vector3()

function Model(props) {
    const group = useRef()
    const light = useRef()
    const { nodes } = useGLTF('/head-single.glb')
    const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloppenheim_02_puresky_1k.hdr')
    useFrame((state, delta) => {
        vec3.set(state.pointer.x * 2, state.pointer.y * 2, state.camera.position.z)
        state.camera.position.lerp(vec3, 0.025)
        // easing.dampE(group.current.rotation, [0, -state.pointer.x * (Math.PI / 10), 0], 1.5, delta)
        // easing.damp3(group.current.position, [0, 0, 1 - Math.abs(state.pointer.x)], 1, delta)
        easing.damp3(light.current.position, [state.pointer.x * 12, 1, 2 - state.pointer.y * 4], 0.2, delta)
    })
    return (
        <group ref={group} {...props}>
            <mesh geometry={nodes.GlassHeadSingle.geometry} rotation={[Math.PI / 2, 0, 0]} scale={2} dispose={null}>
                <MeshRefractionMaterial
                    envMap={texture}
                    color="#EAB9D1"                
                    fresnel={3}
                    ior={2.0}
                />
            </mesh>           
            <Annotation position={[1.75, 3, 2.5]}>
                Thalia <span style={{ fontSize: '1.5em' }}>🌗</span>
            </Annotation>
            <Annotation position={[-4.5, 3.6, -3]}>
                Euphrosyne <span style={{ fontSize: '1.5em' }}>🌖</span>
            </Annotation>
            <Annotation position={[1.5, 1, -3]}>
                <span style={{ fontSize: '1.5em' }}>🌕</span> Aglaia
            </Annotation>
            <pointLight ref={light} castShadow intensity={10}>
                {/* <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />                 */}
            </pointLight>
        </group>
    )
}

function Annotation({ children, ...props }) {
    return (
        <Html
            {...props}
            transform
            geometry={
                /** The geometry is optional, it allows you to use any shape.
                 *  By default it would be a plane. We need round edges here ...
                 */
                <roundedPlaneGeometry args={[1.66, 0.47, 0.24]} />
            }>
            <div className="annotation" onClick={() => console.log('.')}>
                {children}
            </div>
        </Html>
    )
}

// All you need is to export:
export const QwikHeads = qwikify$(Heads);
