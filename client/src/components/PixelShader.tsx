import React, { forwardRef, useMemo } from 'react';
import { Effect } from 'postprocessing';
import * as THREE from 'three';

// Custom pixel shader effect class
class PixelEffect extends Effect {
  constructor({ pixelSize = 4.0, resolution = [1920, 1080] } = {}) {
    const fragmentShader = `
      uniform float pixelSize;
      uniform vec2 resolution;
      
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        // Calculate the pixelated coordinates
        vec2 pixelatedUv = floor(uv * resolution / pixelSize) * pixelSize / resolution;
        
        // Sample the texture at the pixelated coordinates
        vec4 color = texture2D(inputBuffer, pixelatedUv);
        
        // Apply stronger color quantization for retro pixelated look
        color.rgb = floor(color.rgb * 8.0) / 8.0;
        
        // Enhance contrast and brightness
        color.rgb = pow(color.rgb, vec3(0.9));
        color.rgb *= 1.1;
        
        outputColor = color;
      }
    `;

    super('PixelEffect', fragmentShader, {
      uniforms: new Map<string, THREE.Uniform>([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['resolution', new THREE.Uniform(new THREE.Vector2(resolution[0], resolution[1]))]
      ])
    });
  }

  update(renderer: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget) {
    // Update resolution if screen size changes
    const size = renderer.getSize(new THREE.Vector2());
    const pixelRatio = renderer.getPixelRatio();
    
    this.uniforms.get('resolution')!.value.set(
      size.width * pixelRatio,
      size.height * pixelRatio
    );
  }
}

// React component wrapper for the pixel effect
interface PixelShaderProps {
  pixelSize?: number;
  resolution?: [number, number];
}

const PixelShader = forwardRef<PixelEffect, PixelShaderProps>(
  ({ pixelSize = 4.0, resolution = [1920, 1080] }, ref) => {
    const effect = useMemo(
      () => new PixelEffect({ pixelSize, resolution }),
      [pixelSize, resolution]
    );

    return <primitive ref={ref} object={effect} />;
  }
);

PixelShader.displayName = 'PixelShader';

export default PixelShader;
