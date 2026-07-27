/* ============================================================
   环球手札 — Country Index (~195 entries, ~7KB)
   Loaded at startup for region matching. Full data lazy-loaded.
   ============================================================ */

const COUNTRY_INDEX = [
  // ===== ASIA (50 countries) =====
  {id:"cn",cn:"中国",en:"China",iso:"cn",ctr:[35.86,104.19],bnd:[[18,73],[54,135]],cont:"asia"},
  {id:"jp",cn:"日本",en:"Japan",iso:"jp",ctr:[36.20,138.25],bnd:[[30,129],[46,146]],cont:"asia"},
  {id:"kr",cn:"韩国",en:"South Korea",iso:"kr",ctr:[35.90,127.76],bnd:[[33,124],[39,132]],cont:"asia"},
  {id:"kp",cn:"朝鲜",en:"North Korea",iso:"kp",ctr:[40.33,127.51],bnd:[[37,124],[43,131]],cont:"asia"},
  {id:"mn",cn:"蒙古",en:"Mongolia",iso:"mn",ctr:[46.86,103.84],bnd:[[41,87],[52,120]],cont:"asia"},
  {id:"in",cn:"印度",en:"India",iso:"in",ctr:[20.59,78.96],bnd:[[6,68],[36,97]],cont:"asia"},
  {id:"pk",cn:"巴基斯坦",en:"Pakistan",iso:"pk",ctr:[30.37,69.34],bnd:[[24,61],[37,77]],cont:"asia"},
  {id:"bd",cn:"孟加拉国",en:"Bangladesh",iso:"bd",ctr:[23.68,90.35],bnd:[[21,88],[27,93]],cont:"asia"},
  {id:"lk",cn:"斯里兰卡",en:"Sri Lanka",iso:"lk",ctr:[7.87,80.77],bnd:[[6,79],[10,82]],cont:"asia"},
  {id:"np",cn:"尼泊尔",en:"Nepal",iso:"np",ctr:[28.39,84.12],bnd:[[26,80],[30,88]],cont:"asia"},
  {id:"bt",cn:"不丹",en:"Bhutan",iso:"bt",ctr:[27.51,90.43],bnd:[[26,88],[29,93]],cont:"asia"},
  {id:"mm",cn:"缅甸",en:"Myanmar",iso:"mm",ctr:[21.91,95.95],bnd:[[10,92],[28,102]],cont:"asia"},
  {id:"th",cn:"泰国",en:"Thailand",iso:"th",ctr:[15.87,100.99],bnd:[[6,97],[21,106]],cont:"asia"},
  {id:"la",cn:"老挝",en:"Laos",iso:"la",ctr:[19.85,102.49],bnd:[[14,100],[23,108]],cont:"asia"},
  {id:"kh",cn:"柬埔寨",en:"Cambodia",iso:"kh",ctr:[12.56,104.99],bnd:[[10,102],[15,108]],cont:"asia"},
  {id:"vn",cn:"越南",en:"Vietnam",iso:"vn",ctr:[14.05,108.27],bnd:[[8,102],[23,110]],cont:"asia"},
  {id:"my",cn:"马来西亚",en:"Malaysia",iso:"my",ctr:[4.21,101.97],bnd:[[1,99],[7,119]],cont:"asia"},
  {id:"sg",cn:"新加坡",en:"Singapore",iso:"sg",ctr:[1.35,103.82],bnd:[[1.2,103.6],[1.5,104.1]],cont:"asia"},
  {id:"id",cn:"印度尼西亚",en:"Indonesia",iso:"id",ctr:[-0.78,113.92],bnd:[[-11,95],[6,141]],cont:"asia"},
  {id:"bn",cn:"文莱",en:"Brunei",iso:"bn",ctr:[4.53,114.72],bnd:[[4,114],[5,115.5]],cont:"asia"},
  {id:"ph",cn:"菲律宾",en:"Philippines",iso:"ph",ctr:[12.87,121.77],bnd:[[5,116],[19,127]],cont:"asia"},
  {id:"tl",cn:"东帝汶",en:"Timor-Leste",iso:"tl",ctr:[-8.87,125.72],bnd:[[-10,124],[-8,127.5]],cont:"asia"},
  {id:"kz",cn:"哈萨克斯坦",en:"Kazakhstan",iso:"kz",ctr:[48.01,66.92],bnd:[[40,46],[56,87]],cont:"asia"},
  {id:"uz",cn:"乌兹别克斯坦",en:"Uzbekistan",iso:"uz",ctr:[41.37,64.58],bnd:[[37,56],[46,71]],cont:"asia"},
  {id:"tm",cn:"土库曼斯坦",en:"Turkmenistan",iso:"tm",ctr:[38.96,59.55],bnd:[[35,52],[43,67]],cont:"asia"},
  {id:"kg",cn:"吉尔吉斯斯坦",en:"Kyrgyzstan",iso:"kg",ctr:[41.20,74.76],bnd:[[39,69],[44,81]],cont:"asia"},
  {id:"tj",cn:"塔吉克斯坦",en:"Tajikistan",iso:"tj",ctr:[38.86,71.27],bnd:[[36,67],[42,76]],cont:"asia"},
  {id:"af",cn:"阿富汗",en:"Afghanistan",iso:"af",ctr:[33.93,67.70],bnd:[[29,60],[39,75]],cont:"asia"},
  {id:"ir",cn:"伊朗",en:"Iran",iso:"ir",ctr:[32.42,53.68],bnd:[[25,44],[40,63]],cont:"asia"},
  {id:"iq",cn:"伊拉克",en:"Iraq",iso:"iq",ctr:[33.22,43.67],bnd:[[29,38],[38,49]],cont:"asia"},
  {id:"sa",cn:"沙特阿拉伯",en:"Saudi Arabia",iso:"sa",ctr:[23.88,45.07],bnd:[[16,34],[32,56]],cont:"asia"},
  {id:"ye",cn:"也门",en:"Yemen",iso:"ye",ctr:[15.55,48.51],bnd:[[12,42],[19,54]],cont:"asia"},
  {id:"om",cn:"阿曼",en:"Oman",iso:"om",ctr:[21.51,55.92],bnd:[[16,52],[27,60]],cont:"asia"},
  {id:"ae",cn:"阿联酋",en:"UAE",iso:"ae",ctr:[23.42,53.84],bnd:[[22,51],[26,57]],cont:"asia"},
  {id:"qa",cn:"卡塔尔",en:"Qatar",iso:"qa",ctr:[25.35,51.18],bnd:[[24,50],[26,52]],cont:"asia"},
  {id:"kw",cn:"科威特",en:"Kuwait",iso:"kw",ctr:[29.31,47.48],bnd:[[28,46],[31,49]],cont:"asia"},
  {id:"bh",cn:"巴林",en:"Bahrain",iso:"bh",ctr:[26.06,50.55],bnd:[[25,50],[27,51]],cont:"asia"},
  {id:"jo",cn:"约旦",en:"Jordan",iso:"jo",ctr:[30.58,36.23],bnd:[[29,34],[33,39]],cont:"asia"},
  {id:"lb",cn:"黎巴嫩",en:"Lebanon",iso:"lb",ctr:[33.85,35.86],bnd:[[33,35],[35,37]],cont:"asia"},
  {id:"sy",cn:"叙利亚",en:"Syria",iso:"sy",ctr:[34.80,38.99],bnd:[[32,35],[38,43]],cont:"asia"},
  {id:"il",cn:"以色列",en:"Israel",iso:"il",ctr:[31.04,34.85],bnd:[[29,34],[34,36]],cont:"asia"},
  {id:"ps",cn:"巴勒斯坦",en:"Palestine",iso:"ps",ctr:[31.95,35.23],bnd:[[31,34],[33,36]],cont:"asia"},
  {id:"tr",cn:"土耳其",en:"Turkey",iso:"tr",ctr:[38.96,35.24],bnd:[[36,26],[42,45]],cont:"asia"},
  {id:"cy",cn:"塞浦路斯",en:"Cyprus",iso:"cy",ctr:[35.12,33.42],bnd:[[34,32],[36,35]],cont:"asia"},
  {id:"ge",cn:"格鲁吉亚",en:"Georgia",iso:"ge",ctr:[42.31,43.35],bnd:[[41,40],[44,47]],cont:"asia"},
  {id:"am",cn:"亚美尼亚",en:"Armenia",iso:"am",ctr:[40.06,45.03],bnd:[[38,43],[42,47]],cont:"asia"},
  {id:"az",cn:"阿塞拜疆",en:"Azerbaijan",iso:"az",ctr:[40.14,47.57],bnd:[[38,44],[42,51]],cont:"asia"},
  {id:"mv",cn:"马尔代夫",en:"Maldives",iso:"mv",ctr:[3.20,73.22],bnd:[[-1,72],[8,74]],cont:"asia"},
  {id:"tw",cn:"台湾",en:"Taiwan",iso:"tw",ctr:[23.69,120.96],bnd:[[21,120],[26,122]],cont:"asia"},
  {id:"hk",cn:"香港",en:"Hong Kong",iso:"hk",ctr:[22.31,114.16],bnd:[[22,113],[23,115]],cont:"asia"},
  {id:"mo",cn:"澳门",en:"Macau",iso:"mo",ctr:[22.19,113.54],bnd:[[22,113],[23,114]],cont:"asia"},

  // ===== EUROPE (48 countries) =====
  {id:"gb",cn:"英国",en:"United Kingdom",iso:"gb",ctr:[55.37,-3.43],bnd:[[49,-8],[60,2]],cont:"europe"},
  {id:"fr",cn:"法国",en:"France",iso:"fr",ctr:[46.60,2.21],bnd:[[42,-5],[52,8]],cont:"europe"},
  {id:"de",cn:"德国",en:"Germany",iso:"de",ctr:[51.16,10.45],bnd:[[47,6],[55,15]],cont:"europe"},
  {id:"it",cn:"意大利",en:"Italy",iso:"it",ctr:[41.87,12.56],bnd:[[36,6],[47,19]],cont:"europe"},
  {id:"es",cn:"西班牙",en:"Spain",iso:"es",ctr:[40.46,-3.74],bnd:[[36,-9],[44,4]],cont:"europe"},
  {id:"pt",cn:"葡萄牙",en:"Portugal",iso:"pt",ctr:[39.39,-8.22],bnd:[[36,-10],[42,-6]],cont:"europe"},
  {id:"nl",cn:"荷兰",en:"Netherlands",iso:"nl",ctr:[52.13,5.29],bnd:[[50,3],[54,8]],cont:"europe"},
  {id:"be",cn:"比利时",en:"Belgium",iso:"be",ctr:[50.50,4.46],bnd:[[49,2],[52,7]],cont:"europe"},
  {id:"lu",cn:"卢森堡",en:"Luxembourg",iso:"lu",ctr:[49.81,6.12],bnd:[[49,5],[51,7]],cont:"europe"},
  {id:"ch",cn:"瑞士",en:"Switzerland",iso:"ch",ctr:[46.81,8.22],bnd:[[45,6],[48,11]],cont:"europe"},
  {id:"at",cn:"奥地利",en:"Austria",iso:"at",ctr:[47.51,14.55],bnd:[[46,9],[49,18]],cont:"europe"},
  {id:"pl",cn:"波兰",en:"Poland",iso:"pl",ctr:[51.91,19.14],bnd:[[49,14],[55,24]],cont:"europe"},
  {id:"cz",cn:"捷克",en:"Czech Republic",iso:"cz",ctr:[49.81,15.47],bnd:[[48,12],[51,19]],cont:"europe"},
  {id:"sk",cn:"斯洛伐克",en:"Slovakia",iso:"sk",ctr:[48.66,19.69],bnd:[[47,16],[50,23]],cont:"europe"},
  {id:"hu",cn:"匈牙利",en:"Hungary",iso:"hu",ctr:[47.16,19.50],bnd:[[45,16],[49,23]],cont:"europe"},
  {id:"ro",cn:"罗马尼亚",en:"Romania",iso:"ro",ctr:[45.94,24.96],bnd:[[43,20],[49,30]],cont:"europe"},
  {id:"bg",cn:"保加利亚",en:"Bulgaria",iso:"bg",ctr:[42.73,25.48],bnd:[[41,22],[44,29]],cont:"europe"},
  {id:"rs",cn:"塞尔维亚",en:"Serbia",iso:"rs",ctr:[44.01,21.00],bnd:[[42,18],[47,23]],cont:"europe"},
  {id:"hr",cn:"克罗地亚",en:"Croatia",iso:"hr",ctr:[45.10,15.20],bnd:[[42,13],[47,20]],cont:"europe"},
  {id:"si",cn:"斯洛文尼亚",en:"Slovenia",iso:"si",ctr:[46.15,14.99],bnd:[[45,13],[47,17]],cont:"europe"},
  {id:"ba",cn:"波黑",en:"Bosnia",iso:"ba",ctr:[43.91,17.67],bnd:[[42,15],[46,20]],cont:"europe"},
  {id:"me",cn:"黑山",en:"Montenegro",iso:"me",ctr:[42.70,19.37],bnd:[[41,18],[44,21]],cont:"europe"},
  {id:"mk",cn:"北马其顿",en:"North Macedonia",iso:"mk",ctr:[41.60,21.74],bnd:[[40,20],[43,23]],cont:"europe"},
  {id:"al",cn:"阿尔巴尼亚",en:"Albania",iso:"al",ctr:[41.15,20.16],bnd:[[39,19],[43,21]],cont:"europe"},
  {id:"gr",cn:"希腊",en:"Greece",iso:"gr",ctr:[39.07,21.82],bnd:[[34,19],[42,30]],cont:"europe"},
  {id:"ua",cn:"乌克兰",en:"Ukraine",iso:"ua",ctr:[48.37,31.16],bnd:[[44,22],[53,41]],cont:"europe"},
  {id:"by",cn:"白俄罗斯",en:"Belarus",iso:"by",ctr:[53.70,27.95],bnd:[[51,23],[57,33]],cont:"europe"},
  {id:"md",cn:"摩尔多瓦",en:"Moldova",iso:"md",ctr:[47.41,28.36],bnd:[[45,26],[49,31]],cont:"europe"},
  {id:"lt",cn:"立陶宛",en:"Lithuania",iso:"lt",ctr:[55.16,23.88],bnd:[[53,20],[57,27]],cont:"europe"},
  {id:"lv",cn:"拉脱维亚",en:"Latvia",iso:"lv",ctr:[56.87,24.60],bnd:[[55,20],[58,29]],cont:"europe"},
  {id:"ee",cn:"爱沙尼亚",en:"Estonia",iso:"ee",ctr:[58.59,25.01],bnd:[[57,21],[60,29]],cont:"europe"},
  {id:"se",cn:"瑞典",en:"Sweden",iso:"se",ctr:[60.12,18.64],bnd:[[55,11],[69,24]],cont:"europe"},
  {id:"no",cn:"挪威",en:"Norway",iso:"no",ctr:[60.47,8.46],bnd:[[57,4],[72,32]],cont:"europe"},
  {id:"fi",cn:"芬兰",en:"Finland",iso:"fi",ctr:[61.92,25.74],bnd:[[59,19],[71,32]],cont:"europe"},
  {id:"dk",cn:"丹麦",en:"Denmark",iso:"dk",ctr:[56.26,9.50],bnd:[[54,8],[58,16]],cont:"europe"},
  {id:"is",cn:"冰岛",en:"Iceland",iso:"is",ctr:[64.96,-19.02],bnd:[[63,-25],[67,-13]],cont:"europe"},
  {id:"ie",cn:"爱尔兰",en:"Ireland",iso:"ie",ctr:[53.41,-8.24],bnd:[[51,-11],[56,-5]],cont:"europe"},
  {id:"ru",cn:"俄罗斯",en:"Russia",iso:"ru",ctr:[61.52,105.31],bnd:[[41,19],[82,169]],cont:"europe"},
  {id:"mc",cn:"摩纳哥",en:"Monaco",iso:"mc",ctr:[43.73,7.42],bnd:[[43.7,7.4],[43.8,7.5]],cont:"europe"},
  {id:"li",cn:"列支敦士登",en:"Liechtenstein",iso:"li",ctr:[47.16,9.55],bnd:[[47,9],[48,10]],cont:"europe"},
  {id:"ad",cn:"安道尔",en:"Andorra",iso:"ad",ctr:[42.50,1.52],bnd:[[42,1],[43,2]],cont:"europe"},
  {id:"mt",cn:"马耳他",en:"Malta",iso:"mt",ctr:[35.93,14.37],bnd:[[35,14],[36,15]],cont:"europe"},
  {id:"sm",cn:"圣马力诺",en:"San Marino",iso:"sm",ctr:[43.94,12.45],bnd:[[43,12],[44,13]],cont:"europe"},
  {id:"va",cn:"梵蒂冈",en:"Vatican City",iso:"va",ctr:[41.90,12.45],bnd:[[41.8,12.4],[42,12.5]],cont:"europe"},

  // ===== NORTH AMERICA (23) =====
  {id:"us",cn:"美国",en:"United States",iso:"us",ctr:[37.09,-95.71],bnd:[[24,-125],[50,-66]],cont:"north_america"},
  {id:"ca",cn:"加拿大",en:"Canada",iso:"ca",ctr:[56.13,-106.34],bnd:[[42,-141],[71,-52]],cont:"north_america"},
  {id:"mx",cn:"墨西哥",en:"Mexico",iso:"mx",ctr:[23.63,-102.55],bnd:[[15,-118],[33,-86]],cont:"north_america"},
  {id:"gt",cn:"危地马拉",en:"Guatemala",iso:"gt",ctr:[15.78,-90.23],bnd:[[13,-93],[18,-88]],cont:"north_america"},
  {id:"bz",cn:"伯利兹",en:"Belize",iso:"bz",ctr:[17.18,-88.49],bnd:[[15,-89],[19,-87]],cont:"north_america"},
  {id:"sv",cn:"萨尔瓦多",en:"El Salvador",iso:"sv",ctr:[13.79,-88.89],bnd:[[13,-91],[15,-87]],cont:"north_america"},
  {id:"hn",cn:"洪都拉斯",en:"Honduras",iso:"hn",ctr:[15.19,-86.24],bnd:[[12,-90],[17,-83]],cont:"north_america"},
  {id:"ni",cn:"尼加拉瓜",en:"Nicaragua",iso:"ni",ctr:[12.86,-85.20],bnd:[[10,-88],[15,-82]],cont:"north_america"},
  {id:"cr",cn:"哥斯达黎加",en:"Costa Rica",iso:"cr",ctr:[9.74,-83.75],bnd:[[8,-86],[11,-82]],cont:"north_america"},
  {id:"pa",cn:"巴拿马",en:"Panama",iso:"pa",ctr:[8.53,-80.78],bnd:[[7,-83],[10,-77]],cont:"north_america"},
  {id:"cu",cn:"古巴",en:"Cuba",iso:"cu",ctr:[21.52,-77.78],bnd:[[19,-85],[24,-74]],cont:"north_america"},
  {id:"jm",cn:"牙买加",en:"Jamaica",iso:"jm",ctr:[18.10,-77.29],bnd:[[17,-79],[19,-76]],cont:"north_america"},
  {id:"ht",cn:"海地",en:"Haiti",iso:"ht",ctr:[18.97,-72.28],bnd:[[18,-75],[20,-71]],cont:"north_america"},
  {id:"do",cn:"多米尼加",en:"Dominican Republic",iso:"do",ctr:[18.73,-70.16],bnd:[[17,-72],[20,-68]],cont:"north_america"},
  {id:"bs",cn:"巴哈马",en:"Bahamas",iso:"bs",ctr:[25.03,-77.39],bnd:[[20,-80],[28,-72]],cont:"north_america"},
  {id:"bb",cn:"巴巴多斯",en:"Barbados",iso:"bb",ctr:[13.19,-59.54],bnd:[[12,-60],[14,-59]],cont:"north_america"},
  {id:"tt",cn:"特立尼达和多巴哥",en:"Trinidad",iso:"tt",ctr:[10.69,-61.22],bnd:[[10,-62],[11,-60]],cont:"north_america"},
  {id:"pr",cn:"波多黎各",en:"Puerto Rico",iso:"pr",ctr:[18.22,-66.59],bnd:[[17,-68],[19,-65]],cont:"north_america"},
  {id:"gd",cn:"格林纳达",en:"Grenada",iso:"gd",ctr:[12.11,-61.67],bnd:[[11,-62],[13,-61]],cont:"north_america"},
  {id:"lc",cn:"圣卢西亚",en:"Saint Lucia",iso:"lc",ctr:[13.90,-60.97],bnd:[[13,-61],[15,-60]],cont:"north_america"},

  // ===== SOUTH AMERICA (12) =====
  {id:"br",cn:"巴西",en:"Brazil",iso:"br",ctr:[-14.23,-51.92],bnd:[[-34,-74],[5,-34]],cont:"south_america"},
  {id:"ar",cn:"阿根廷",en:"Argentina",iso:"ar",ctr:[-38.41,-63.61],bnd:[[-55,-74],[-22,-53]],cont:"south_america"},
  {id:"cl",cn:"智利",en:"Chile",iso:"cl",ctr:[-35.67,-71.54],bnd:[[-56,-76],[-17,-66]],cont:"south_america"},
  {id:"pe",cn:"秘鲁",en:"Peru",iso:"pe",ctr:[-9.18,-75.01],bnd:[[-19,-82],[0,-68]],cont:"south_america"},
  {id:"co",cn:"哥伦比亚",en:"Colombia",iso:"co",ctr:[4.57,-74.29],bnd:[[-4,-79],[12,-67]],cont:"south_america"},
  {id:"ve",cn:"委内瑞拉",en:"Venezuela",iso:"ve",ctr:[6.42,-66.58],bnd:[[0,-73],[13,-59]],cont:"south_america"},
  {id:"ec",cn:"厄瓜多尔",en:"Ecuador",iso:"ec",ctr:[-1.83,-78.18],bnd:[[-5,-82],[2,-75]],cont:"south_america"},
  {id:"bo",cn:"玻利维亚",en:"Bolivia",iso:"bo",ctr:[-16.29,-63.58],bnd:[[-23,-70],[-9,-57]],cont:"south_america"},
  {id:"py",cn:"巴拉圭",en:"Paraguay",iso:"py",ctr:[-23.44,-58.44],bnd:[[-28,-63],[-19,-54]],cont:"south_america"},
  {id:"uy",cn:"乌拉圭",en:"Uruguay",iso:"uy",ctr:[-32.52,-55.76],bnd:[[-35,-59],[-30,-53]],cont:"south_america"},
  {id:"gy",cn:"圭亚那",en:"Guyana",iso:"gy",ctr:[4.86,-58.93],bnd:[[1,-62],[9,-56]],cont:"south_america"},
  {id:"sr",cn:"苏里南",en:"Suriname",iso:"sr",ctr:[3.91,-56.02],bnd:[[1,-59],[7,-53]],cont:"south_america"},

  // ===== AFRICA (54) =====
  {id:"eg",cn:"埃及",en:"Egypt",iso:"eg",ctr:[26.82,30.80],bnd:[[22,25],[32,37]],cont:"africa"},
  {id:"ly",cn:"利比亚",en:"Libya",iso:"ly",ctr:[26.33,17.22],bnd:[[19,9],[34,26]],cont:"africa"},
  {id:"tn",cn:"突尼斯",en:"Tunisia",iso:"tn",ctr:[33.88,9.53],bnd:[[30,7],[38,12]],cont:"africa"},
  {id:"dz",cn:"阿尔及利亚",en:"Algeria",iso:"dz",ctr:[28.03,1.65],bnd:[[19,-9],[38,12]],cont:"africa"},
  {id:"ma",cn:"摩洛哥",en:"Morocco",iso:"ma",ctr:[31.79,-7.09],bnd:[[27,-13],[36,-1]],cont:"africa"},
  {id:"eh",cn:"西撒哈拉",en:"W.Sahara",iso:"eh",ctr:[24.21,-12.88],bnd:[[20,-18],[28,-8]],cont:"africa"},
  {id:"mr",cn:"毛里塔尼亚",en:"Mauritania",iso:"mr",ctr:[21.00,-10.94],bnd:[[14,-18],[28,-4]],cont:"africa"},
  {id:"sn",cn:"塞内加尔",en:"Senegal",iso:"sn",ctr:[14.49,-14.45],bnd:[[12,-18],[17,-11]],cont:"africa"},
  {id:"gm",cn:"冈比亚",en:"Gambia",iso:"gm",ctr:[13.44,-15.31],bnd:[[13,-17],[14,-13]],cont:"africa"},
  {id:"gw",cn:"几内亚比绍",en:"Guinea-Bissau",iso:"gw",ctr:[11.80,-15.18],bnd:[[10,-17],[13,-13]],cont:"africa"},
  {id:"gn",cn:"几内亚",en:"Guinea",iso:"gn",ctr:[9.94,-9.69],bnd:[[7,-15],[13,-7]],cont:"africa"},
  {id:"sl",cn:"塞拉利昂",en:"Sierra Leone",iso:"sl",ctr:[8.46,-11.77],bnd:[[6,-14],[10,-10]],cont:"africa"},
  {id:"lr",cn:"利比里亚",en:"Liberia",iso:"lr",ctr:[6.42,-9.42],bnd:[[4,-12],[9,-7]],cont:"africa"},
  {id:"ci",cn:"科特迪瓦",en:"Côte d'Ivoire",iso:"ci",ctr:[7.53,-5.54],bnd:[[4,-9],[11,-2]],cont:"africa"},
  {id:"gh",cn:"加纳",en:"Ghana",iso:"gh",ctr:[7.94,-1.02],bnd:[[4,-4],[12,2]],cont:"africa"},
  {id:"tg",cn:"多哥",en:"Togo",iso:"tg",ctr:[8.61,0.82],bnd:[[6,-1],[12,2]],cont:"africa"},
  {id:"bj",cn:"贝宁",en:"Benin",iso:"bj",ctr:[9.30,2.31],bnd:[[6,0],[13,4]],cont:"africa"},
  {id:"ng",cn:"尼日利亚",en:"Nigeria",iso:"ng",ctr:[9.08,8.67],bnd:[[4,2],[14,15]],cont:"africa"},
  {id:"ne",cn:"尼日尔",en:"Niger",iso:"ne",ctr:[17.60,8.08],bnd:[[11,0],[24,16]],cont:"africa"},
  {id:"td",cn:"乍得",en:"Chad",iso:"td",ctr:[15.45,18.73],bnd:[[7,13],[24,24]],cont:"africa"},
  {id:"sd",cn:"苏丹",en:"Sudan",iso:"sd",ctr:[12.86,30.21],bnd:[[8,21],[23,39]],cont:"africa"},
  {id:"ss",cn:"南苏丹",en:"South Sudan",iso:"ss",ctr:[7.86,29.66],bnd:[[3,24],[13,36]],cont:"africa"},
  {id:"et",cn:"埃塞俄比亚",en:"Ethiopia",iso:"et",ctr:[9.14,40.48],bnd:[[3,33],[15,48]],cont:"africa"},
  {id:"er",cn:"厄立特里亚",en:"Eritrea",iso:"er",ctr:[15.17,39.78],bnd:[[12,36],[19,44]],cont:"africa"},
  {id:"dj",cn:"吉布提",en:"Djibouti",iso:"dj",ctr:[11.82,42.59],bnd:[[10,41],[13,44]],cont:"africa"},
  {id:"so",cn:"索马里",en:"Somalia",iso:"so",ctr:[5.15,46.19],bnd:[[-2,40],[12,52]],cont:"africa"},
  {id:"ke",cn:"肯尼亚",en:"Kenya",iso:"ke",ctr:[-0.02,37.90],bnd:[[-5,34],[5,42]],cont:"africa"},
  {id:"ug",cn:"乌干达",en:"Uganda",iso:"ug",ctr:[1.37,32.29],bnd:[[-2,29],[5,36]],cont:"africa"},
  {id:"rw",cn:"卢旺达",en:"Rwanda",iso:"rw",ctr:[-1.94,29.87],bnd:[[-3,28],[-1,31]],cont:"africa"},
  {id:"bi",cn:"布隆迪",en:"Burundi",iso:"bi",ctr:[-3.37,29.91],bnd:[[-5,29],[-2,31]],cont:"africa"},
  {id:"tz",cn:"坦桑尼亚",en:"Tanzania",iso:"tz",ctr:[-6.36,34.88],bnd:[[-12,29],[-1,41]],cont:"africa"},
  {id:"mz",cn:"莫桑比克",en:"Mozambique",iso:"mz",ctr:[-18.66,35.52],bnd:[[-27,30],[-10,41]],cont:"africa"},
  {id:"mg",cn:"马达加斯加",en:"Madagascar",iso:"mg",ctr:[-18.76,46.86],bnd:[[-26,43],[-11,51]],cont:"africa"},
  {id:"zm",cn:"赞比亚",en:"Zambia",iso:"zm",ctr:[-13.13,27.84],bnd:[[-18,22],[-8,34]],cont:"africa"},
  {id:"zw",cn:"津巴布韦",en:"Zimbabwe",iso:"zw",ctr:[-19.01,29.15],bnd:[[-23,25],[-15,34]],cont:"africa"},
  {id:"bw",cn:"博茨瓦纳",en:"Botswana",iso:"bw",ctr:[-22.32,24.68],bnd:[[-27,19],[-17,30]],cont:"africa"},
  {id:"na",cn:"纳米比亚",en:"Namibia",iso:"na",ctr:[-22.95,18.49],bnd:[[-29,11],[-16,26]],cont:"africa"},
  {id:"ao",cn:"安哥拉",en:"Angola",iso:"ao",ctr:[-11.20,17.87],bnd:[[-18,11],[-4,25]],cont:"africa"},
  {id:"za",cn:"南非",en:"South Africa",iso:"za",ctr:[-30.55,22.93],bnd:[[-35,16],[-22,33]],cont:"africa"},
  {id:"ls",cn:"莱索托",en:"Lesotho",iso:"ls",ctr:[-29.60,28.23],bnd:[[-31,27],[-28,30]],cont:"africa"},
  {id:"sz",cn:"斯威士兰",en:"Eswatini",iso:"sz",ctr:[-26.52,31.46],bnd:[[-28,30],[-25,33]],cont:"africa"},
  {id:"cm",cn:"喀麦隆",en:"Cameroon",iso:"cm",ctr:[7.36,12.35],bnd:[[1,8],[14,17]],cont:"africa"},
  {id:"cf",cn:"中非",en:"CAR",iso:"cf",ctr:[6.61,20.93],bnd:[[2,14],[11,28]],cont:"africa"},
  {id:"ga",cn:"加蓬",en:"Gabon",iso:"ga",ctr:[-0.80,11.60],bnd:[[-4,8],[3,15]],cont:"africa"},
  {id:"cg",cn:"刚果(布)",en:"Congo",iso:"cg",ctr:[-0.22,15.82],bnd:[[-5,10],[4,19]],cont:"africa"},
  {id:"cd",cn:"刚果(金)",en:"DR Congo",iso:"cd",ctr:[-4.03,21.75],bnd:[[-14,12],[6,32]],cont:"africa"},
  {id:"gq",cn:"赤道几内亚",en:"Eq.Guinea",iso:"gq",ctr:[1.65,10.26],bnd:[[0,9],[3,12]],cont:"africa"},
  {id:"st",cn:"圣多美和普林西比",en:"Sao Tome",iso:"st",ctr:[0.18,6.61],bnd:[[-1,5],[2,8]],cont:"africa"},
  {id:"cv",cn:"佛得角",en:"Cape Verde",iso:"cv",ctr:[16.00,-24.01],bnd:[[14,-26],[18,-22]],cont:"africa"},
  {id:"sc",cn:"塞舌尔",en:"Seychelles",iso:"sc",ctr:[-4.67,55.49],bnd:[[-11,45],[0,57]],cont:"africa"},
  {id:"mu",cn:"毛里求斯",en:"Mauritius",iso:"mu",ctr:[-20.34,57.55],bnd:[[-21,57],[-19,58]],cont:"africa"},
  {id:"km",cn:"科摩罗",en:"Comoros",iso:"km",ctr:[-11.64,43.33],bnd:[[-13,43],[-11,45]],cont:"africa"},
  {id:"bf",cn:"布基纳法索",en:"Burkina Faso",iso:"bf",ctr:[12.23,-1.56],bnd:[[9,-6],[15,3]],cont:"africa"},
  {id:"ml",cn:"马里",en:"Mali",iso:"ml",ctr:[17.57,-3.99],bnd:[[10,-13],[26,5]],cont:"africa"},

  // ===== OCEANIA (16) =====
  {id:"au",cn:"澳大利亚",en:"Australia",iso:"au",ctr:[-25.27,133.77],bnd:[[-44,112],[-10,155]],cont:"oceania"},
  {id:"nz",cn:"新西兰",en:"New Zealand",iso:"nz",ctr:[-40.90,174.88],bnd:[[-47,166],[-34,179]],cont:"oceania"},
  {id:"pg",cn:"巴布亚新几内亚",en:"Papua New Guinea",iso:"pg",ctr:[-6.31,143.95],bnd:[[-12,140],[-1,157]],cont:"oceania"},
  {id:"fj",cn:"斐济",en:"Fiji",iso:"fj",ctr:[-17.71,178.06],bnd:[[-20,176],[-15,180]],cont:"oceania"},
  {id:"sb",cn:"所罗门群岛",en:"Solomon Islands",iso:"sb",ctr:[-9.64,160.15],bnd:[[-13,155],[-5,170]],cont:"oceania"},
  {id:"vu",cn:"瓦努阿图",en:"Vanuatu",iso:"vu",ctr:[-15.37,166.95],bnd:[[-21,166],[-13,171]],cont:"oceania"},
  {id:"nc",cn:"新喀里多尼亚",en:"New Caledonia",iso:"nc",ctr:[-21.30,165.61],bnd:[[-23,163],[-19,168]],cont:"oceania"},
  {id:"ws",cn:"萨摩亚",en:"Samoa",iso:"ws",ctr:[-13.75,-172.10],bnd:[[-15,-173],[-13,-171]],cont:"oceania"},
  {id:"to",cn:"汤加",en:"Tonga",iso:"to",ctr:[-21.17,-175.19],bnd:[[-23,-177],[-18,-173]],cont:"oceania"},
  {id:"pw",cn:"帕劳",en:"Palau",iso:"pw",ctr:[7.51,134.58],bnd:[[2,131],[9,135]],cont:"oceania"},
  {id:"fm",cn:"密克罗尼西亚",en:"Micronesia",iso:"fm",ctr:[7.42,150.56],bnd:[[1,137],[10,164]],cont:"oceania"},
  {id:"mh",cn:"马绍尔群岛",en:"Marshall Islands",iso:"mh",ctr:[7.13,171.18],bnd:[[4,160],[15,173]],cont:"oceania"},
  {id:"ki",cn:"基里巴斯",en:"Kiribati",iso:"ki",ctr:[1.87,-157.36],bnd:[[-12,-175],[5,177]],cont:"oceania"},
  {id:"tv",cn:"图瓦卢",en:"Tuvalu",iso:"tv",ctr:[-7.47,178.68],bnd:[[-11,176],[-5,180]],cont:"oceania"},
  {id:"nr",cn:"瑙鲁",en:"Nauru",iso:"nr",ctr:[-0.52,166.93],bnd:[[-1,166],[0,167]],cont:"oceania"},
  {id:"ck",cn:"库克群岛",en:"Cook Islands",iso:"ck",ctr:[-21.23,-159.77],bnd:[[-22,-166],[-8,-157]],cont:"oceania"},
];

// Continent groupings for loading
const CONTINENTS = {
  asia: { cn:"亚洲", ctr:[48,90], bnd:[[-10,25],[80,170]], countries:COUNTRY_INDEX.filter(c=>c.cont==="asia") },
  europe: { cn:"欧洲", ctr:[54,15], bnd:[[35,-10],[72,40]], countries:COUNTRY_INDEX.filter(c=>c.cont==="europe") },
  africa: { cn:"非洲", ctr:[8,25], bnd:[[-35,-17],[37,51]], countries:COUNTRY_INDEX.filter(c=>c.cont==="africa") },
  north_america: { cn:"北美洲", ctr:[45,-100], bnd:[[15,-170],[72,-50]], countries:COUNTRY_INDEX.filter(c=>c.cont==="north_america") },
  south_america: { cn:"南美洲", ctr:[-15,-60], bnd:[[-56,-80],[12,-35]], countries:COUNTRY_INDEX.filter(c=>c.cont==="south_america") },
  oceania: { cn:"大洋洲", ctr:[-25,135], bnd:[[-50,110],[0,180]], countries:COUNTRY_INDEX.filter(c=>c.cont==="oceania") },
};

// China sub-regions
const CHINA_REGIONS = {
  "华北":{id:"huabei",cn:"华北地区",en:"North China",iso:"cn",ctr:[39.90,116.40],bnd:[[35,110],[43,123]],desc:"京畿重地，千年古都",score:4},
  "华东":{id:"huadong",cn:"华东地区",en:"East China",iso:"cn",ctr:[31.23,121.47],bnd:[[27,116],[35,123]],desc:"东方明珠，江南水乡",score:5},
  "华南":{id:"huanan",cn:"华南地区",en:"South China",iso:"cn",ctr:[23.12,113.26],bnd:[[20,109],[26,118]],desc:"南海之滨，改革先锋",score:5},
  "西南":{id:"xinan",cn:"西南地区",en:"Southwest China",iso:"cn",ctr:[30.57,104.06],bnd:[[26,97],[34,110]],desc:"天府之国，巴蜀风情",score:4},
  "西北":{id:"xibei",cn:"西北地区",en:"Northwest China",iso:"cn",ctr:[41.0,85.0],bnd:[[35,73],[49,97]],desc:"大漠孤烟，丝路古道",score:3},
  "东北":{id:"dongbei",cn:"东北地区",en:"Northeast China",iso:"cn",ctr:[41.8,123.4],bnd:[[38,118],[44,132]],desc:"白山黑水，工业摇篮",score:3},
  "华中":{id:"huazhong",cn:"华中地区",en:"Central China",iso:"cn",ctr:[30.59,114.30],bnd:[[29,108],[34,117]],desc:"九省通衢，荆楚大地",score:4},
  "港澳台":{id:"gangaotai",cn:"港澳台地区",en:"HK,Macau,Taiwan",iso:"cn",ctr:[23.7,120.5],bnd:[[21,113],[26,122]],desc:"宝岛明珠，海峡风情",score:4},
};

// Shared GDP years
const GDP_YEARS = ['2018','2019','2020','2021','2022','2023','2024'];
const ECONOMY_LABELS = ['工业','农业','服务业','科技','教育'];

// ===== Photo generation per country =====
// Load API key from external file (gitignored) or set directly
let PEXELS_API_KEY = '';
if (typeof PEXELS_KEY !== 'undefined') PEXELS_API_KEY = PEXELS_KEY;

const _photoCache = {};
function _cacheKey(countryId) { return 'wj_photos_' + countryId; }

// Load cached photos from localStorage
function _loadPhotoCache(countryId) {
  if (_photoCache[countryId]) return _photoCache[countryId];
  try {
    const raw = localStorage.getItem(_cacheKey(countryId));
    if (raw) { _photoCache[countryId] = JSON.parse(raw); return _photoCache[countryId]; }
  } catch(e) {}
  return null;
}

function _savePhotoCache(countryId, urls) {
  _photoCache[countryId] = urls;
  try { localStorage.setItem(_cacheKey(countryId), JSON.stringify(urls)); } catch(e) {}
}

// Fetch real location photos from Pexels API
async function _fetchPexelsPhotos(query, count) {
  if (!PEXELS_API_KEY) return [];
  const cacheKey = 'pexels_' + query.replace(/\s+/g,'_').toLowerCase();
  const cached = _loadPhotoCache(cacheKey);
  if (cached) return cached;

  try {
    const resp = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&size=medium`, {
      headers: { 'Authorization': PEXELS_API_KEY }
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    const urls = (data.photos || []).map(p => p.src.medium || p.src.small);
    if (urls.length > 0) _savePhotoCache(cacheKey, urls);
    return urls;
  } catch(e) { return []; }
}

// Build photo list: flag + pexels (cached or fetched) + picsum fallback
async function countryPhotos(countryId, iso, nameEN) {
  const urls = [{ type:'flag', url:`https://flagcdn.com/w320/${iso}.png` }];

  // Add picsum placeholders immediately (always works)
  for (let i = 1; i <= 5; i++) {
    urls.push({ type:'photo', url: `https://picsum.photos/seed/${countryId}_${i}/400/300`, placeholder: true });
  }

  // Try Pexels for real location photos (background, cached)
  if (PEXELS_API_KEY) {
    const query = (nameEN || countryId) + ' landmark';
    _fetchPexelsPhotos(query, 5).then(pexelsPhotos => {
      if (pexelsPhotos.length > 0) {
        // Replace placeholder photos with real ones
        const photoSlots = urls.filter(u => u.type === 'photo');
        pexelsPhotos.forEach((url, i) => {
          if (photoSlots[i]) { photoSlots[i].url = url; photoSlots[i].placeholder = false; }
        });
      }
    }).catch(() => {});
  }

  return urls;
}

// ===== Region matching (from index) =====
function findBestRegion(bounds) {
  const selCenter = bounds.getCenter();
  const selLat = selCenter.lat, selLng = selCenter.lng;
  const selArea = Math.abs((bounds.getEast()-bounds.getWest())*(bounds.getNorth()-bounds.getSouth()));

  // Check all countries + continents + china regions
  const all = [];

  // Countries from index
  for (const c of COUNTRY_INDEX) {
    const rArea = Math.abs((c.bnd[1][1]-c.bnd[0][1])*(c.bnd[1][0]-c.bnd[0][0]));
    const inside = selLat>=c.bnd[0][0]&&selLat<=c.bnd[1][0]&&selLng>=c.bnd[0][1]&&selLng<=c.bnd[1][1];
    const areaRatio = Math.max(selArea,rArea)/Math.max(Math.min(selArea,rArea),0.0001);
    all.push({...c, rArea, inside, areaRatio});
  }

  // Continents
  for (const [cid, cont] of Object.entries(CONTINENTS)) {
    const rArea = Math.abs((cont.bnd[1][1]-cont.bnd[0][1])*(cont.bnd[1][0]-cont.bnd[0][0]));
    const inside = selLat>=cont.bnd[0][0]&&selLat<=cont.bnd[1][0]&&selLng>=cont.bnd[0][1]&&selLng<=cont.bnd[1][1];
    const areaRatio = Math.max(selArea,rArea)/Math.max(Math.min(selArea,rArea),0.0001);
    all.push({id:cid,cn:cont.cn,type:'continent',inside,areaRatio,cont:cid,ctr:cont.ctr,bnd:cont.bnd,rArea});
  }

  // China regions
  for (const [name, r] of Object.entries(CHINA_REGIONS)) {
    const rArea = Math.abs((r.bnd[1][1]-r.bnd[0][1])*(r.bnd[1][0]-r.bnd[0][0]));
    const inside = selLat>=r.bnd[0][0]&&selLat<=r.bnd[1][0]&&selLng>=r.bnd[0][1]&&selLng<=r.bnd[1][1];
    const areaRatio = Math.max(selArea,rArea)/Math.max(Math.min(selArea,rArea),0.0001);
    all.push({id:r.id,cn:r.cn,iso:r.iso||'cn',type:'china_region',inside,areaRatio,ctr:r.ctr,bnd:r.bnd,rArea});
  }

  // Sort: inside-bounds first, then best area ratio
  all.sort((a,b) => {
    if (a.inside && !b.inside) return -1;
    if (!a.inside && b.inside) return 1;
    return a.areaRatio - b.areaRatio;
  });

  return all[0] || null;
}

// ===== Lazy-load continent data =====
const _loadedData = {};
async function loadRegionData(region) {
  if (!region) return null;

  // China regions — basic summary (no fine-grained economic data)
  if (region.type === 'china_region') {
    const r = CHINA_REGIONS[region.cn];
    if (!r) return null;
    return {
      ...region, ...r, nameCN: r.cn,
      gdp: [], population: [], economy: {},
      photos: await countryPhotos('cn_'+region.id, 'cn', r.en),
      noData: true,
      area: '—', life_expectancy: 0, literacy_rate: 0, gdp_per_capita: '—',
      currency: '人民币', languages: '汉语', children: [],
      center: r.ctr, bounds: r.bnd
    };
  }

  // Continent — summary (no economic data at continent level)
  if (region.type === 'continent') {
    const cont = CONTINENTS[region.id];
    if (!cont) return null;
    return {
      ...region, id: region.id, nameCN: cont.cn,
      gdp: [], population: [], economy: {},
      photos: await countryPhotos(region.id, 'un', cont.cn),
      noData: true,
      area: '—', life_expectancy: 0, literacy_rate: 0, gdp_per_capita: '—',
      currency: '多种', languages: '多种',
      children: cont.countries.map(c=>c.cn), type: 'continent',
      center: cont.ctr, bounds: cont.bnd
    };
  }

  // Country — lazy load from continent file
  const cont = region.cont || 'asia';
  if (!_loadedData[cont]) {
    _loadedData[cont] = await fetch(`data/${cont}.json`).then(r=>r.json()).catch(()=>({}));
  }
  const data = _loadedData[cont][region.id];
  if (!data) {
    // No detailed data available — return skeleton with flag only
    return {
      ...region, nameCN: region.cn, nameEN: region.en || region.cn,
      noData: true,
      photos: await countryPhotos(region.id, region.iso, region.en || region.nameEN),
      type: 'country', center: region.ctr, bounds: region.bnd,
    };
  }
  return {
    ...region, ...data, nameCN: region.cn, nameEN: region.en || region.cn,
    photos: await countryPhotos(region.id, region.iso, region.en || region.nameEN),
    children: [], type: 'country', center: region.ctr, bounds: region.bnd,
  };
}

// Sticky note helpers
function randomNoteColor() {
  const colors = ['#F9E4E4','#E4ECF9','#FDF9E4','#E4F9E8','#F0E4F9','#FDF0E4'];
  return colors[Math.floor(Math.random()*colors.length)];
}
function randomRotation() { return (Math.random()*4-2).toFixed(1); }
