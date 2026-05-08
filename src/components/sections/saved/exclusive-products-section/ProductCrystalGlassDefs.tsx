/**
 * Filtro SVG “liquid / crystal glass” inspirado em
 * https://codepen.io/Esther-k/pen/XJbxKQq
 * Textura de displacement local (mesma ideia do pen que carrega map.png via JS).
 */
export function ProductCrystalGlassDefs() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
      className="pointer-events-none fixed left-0 top-0 -z-10 m-0 block h-0 w-0 overflow-hidden border-0 p-0"
    >
      <defs>
        <filter
          id="ybera-product-crystal-glass"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          primitiveUnits="objectBoundingBox"
        >
          <feImage
            href="/images/product-glass-displacement.png"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            preserveAspectRatio="none"
            result="map"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
          <feDisplacementMap
            in="blur"
            in2="map"
            scale="0.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
