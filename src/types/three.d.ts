// src/types/three.d.ts
import '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    primitive: { object: any; [key: string]: any }
    ambientLight: any
    directionalLight: any
    pointLight: any
    spotLight: any
    hemisphereLight: any
    mesh: any
    group: any
    // tambahkan ini biar OrbitControls tidak error
    orbitControls: any
  }
}