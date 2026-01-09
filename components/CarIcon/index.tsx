import Svg, { Path, Defs, LinearGradient, Stop, Ellipse } from "react-native-svg";

export const CarIcon = ({ width = 128, height = 128, color = "#1a1a2e" }) => (
  <Svg width={width} height={height} viewBox="0 0 100 100">
    <Defs>
      {/* Gradiente do corpo do carro */}
      <LinearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={color} stopOpacity="1" />
        <Stop offset="50%" stopColor={color} stopOpacity="1" />
        <Stop offset="100%" stopColor={color} stopOpacity="1" />
      </LinearGradient>
      {/* Gradiente do teto/vidro */}
      <LinearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#e2e2e2ff" stopOpacity="0.9" />
        <Stop offset="20%" stopColor="#a1a1a1ff" stopOpacity="0.9" />
        <Stop offset="80%" stopColor="#a1a1a1ff" stopOpacity="0.9" />
        <Stop offset="100%" stopColor="#e2e2e2ff" stopOpacity="0.8" />
      </LinearGradient>
      {/* Gradiente de reflexo */}
      <LinearGradient id="highlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </LinearGradient>
    </Defs>

    {/* Sombra do carro */}
    <Ellipse cx="50" cy="85" rx="28" ry="8" fill="#000" opacity="0.15" />

    {/* Corpo principal do carro - base */}
    <Path
      d="M20 55 
         Q20 45 30 42 
         L38 40 
         Q50 38 62 40 
         L70 42 
         Q80 45 80 55 
         L80 70 
         Q80 78 70 80 
         L30 80 
         Q20 78 20 70 
         Z"
      fill="url(#bodyGradient)"
    />

    {/* Capô frontal */}
    <Path
      d="M28 42 
         Q50 36 72 42 
         L70 50 
         Q50 46 30 50 
         Z"
      fill="url(#bodyGradient)"
    />

    {/* Teto/Cabine com vidros */}
    <Path
      d="M32 50 
         Q32 44 40 42 
         L60 42 
         Q68 44 68 50 
         L68 62 
         Q68 68 60 70 
         L40 70 
         Q32 68 32 62 
         Z"
      fill="url(#glassGradient)"
    />

    {/* Reflexo no vidro */}
    <Path
      d="M34 48 
         Q50 44 66 48 
         L64 52 
         Q50 49 36 52 
         Z"
      fill="url(#highlightGradient)"
    />

    {/* Faróis traseiros */}
    <Ellipse cx="26" cy="72" rx="3" ry="4" fill="#ff0000ff" opacity="0.9" />
    <Ellipse cx="74" cy="72" rx="3" ry="4" fill="#ffffaa" opacity="0.9" />

    {/* Faróis dianteiros */}
    <Ellipse cx="30" cy="44" rx="3" ry="2" fill="#ff0000ff" opacity="0.9" />
    <Ellipse cx="70" cy="44" rx="3" ry="2" fill="#ffffaa" opacity="0.9" />

    {/* Reflexo lateral - dá efeito 3D */}
    <Path
      d="M22 50 
         Q22 48 24 47 
         L24 65 
         Q22 64 22 62 
         Z"
      fill="#ffffff"
      opacity="0.2"
    />

    {/* Rodas */}
    <Ellipse cx="32" cy="78" rx="6" ry="3" fill="#333" />
    <Ellipse cx="68" cy="78" rx="6" ry="3" fill="#333" />
    <Ellipse cx="32" cy="78" rx="3" ry="1.5" fill="#666" />
    <Ellipse cx="68" cy="78" rx="3" ry="1.5" fill="#666" />
  </Svg>
);