// Selection rules per asset (page numbers from CasaAlmeria_miniMIV.pdf)
const BIG = 60000;
export default [
  // Logo: CASA (4 letters) + almeria script + i-dot. Items 5-7 are hidden light-blue artifacts.
  { name: "logo", keepClips: false, page: 2, include: { ids: [1, 2, 3, 4, 8, 9] }, layers: [
      { id: "casa", rule: { ids: [1, 2, 3, 4] } },
      { id: "almeria", rule: { ids: [9] } },
      { id: "dot", rule: { ids: [8] } },
    ] },
  // Selo (left half of p5): rotating ring + static script
  { name: "selo", keepClips: false, page: 5, include: { center: [0, 0, 480, 540] }, exclude: { ids: [0] }, layers: [
      { id: "script", rule: { ids: [4] } },
      { id: "ring", rule: { center: [0, 0, 480, 540] } },
    ] },
  // Bread-crust texture (p12): amarelo blobs only, selo excluded
  { name: "textura-crosta", page: 12, include: { colors: ["#f2ba72"], test: (it) => it.clips[0] === 1 } },
  // Typographic texture on navy (p10): letters + script, no background
  { name: "textura-tipografica", page: 10, include: { minArea: 1, maxArea: 200000 }, exclude: { ids: [0] }, pad: 0 },
  // Bike (p19): isolated bike with animatable layers
  { name: "bike", keepClips: false, page: 19, include: { range: [130, 237] }, exclude: { ids: [213, 214, 215, 216, 217, 218] }, layers: [
      { id: "wheel-rear", rule: { ids: [143, 144, 145, 152, 153, 154, 155, 156] } },
      { id: "wheel-front", rule: { ids: [130, 142, 146, 147, 148, 149, 150, 151, 225] } },
      { id: "breads", rule: [{ range: [131, 140] }, { range: [195, 212] }] },
      { id: "sprig", rule: { range: [219, 224] } },
      { id: "basket", rule: { range: [229, 237] } },
      { id: "frame", rule: { range: [157, 237] } },
    ] },
  // Full bike scene card (for mosaic)
  { name: "bike-cena", page: 19, include: { range: [1, 237] }, exclude: { ids: [0] }, viewBox: [86, 0, 874, 540] },
  // Hands of Creation holding bread (p23): no rays
  { name: "maos-pao", keepClips: false, page: 23, include: { range: [64, 9999] }, layers: [{ id: "bread", rule: { colors: ["#f2ba72", "#fbd09c", "#ffffff"], center: [330, 160, 570, 370] } }, { id: "hands", rule: { range: [0, 9999] } }] },
  // Diver in coffee cup (p22 middle card), no background sun
  { name: "mergulho", keepClips: false, page: 22, include: { range: [8, 34] }, exclude: { ids: [10] }, layers: [{ id: "steam", rule: { ids: [24, 25, 26, 27, 28, 29] } }, { id: "cup", rule: { range: [0, 9999] } }] },
  // Ballerina (p26 left card) without bands
  { name: "bailarina", keepClips: false, page: 26, include: { range: [32, 64], center: [30, 0, 480, 560] }, exclude: { minArea: BIG } },
  // Dog Chabli (p20): everything after the harlequin, right card
  { name: "cachorro", keepClips: false, page: 20, include: { range: [143, 276], test: (it) => it.clips.includes(3) }, exclude: { ids: [219] } },
  // Vase scene card (p26 right)
  { name: "vaso-cena", page: 26, include: { range: [65, 9999], center: [480, -60, 980, 600] }, viewBoxClip: true },
];
