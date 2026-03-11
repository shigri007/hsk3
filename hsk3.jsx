import { useState, useEffect, useCallback } from "react";

const hsk3Words = [
  { id: 1, char: "阿姨", pinyin: "āyí", en: "aunt", tip: "AA + YI = Auntie! 👩 Soch ke tumhari auntie 'AA' bol ke aati hai" },
  { id: 2, char: "啊", pinyin: "a", en: "ah! (exclamation)", tip: "Muh khola aur 'AH!' nikla — bilkul simple! 口 = muh 😮" },
  { id: 3, char: "矮", pinyin: "ǎi", en: "short (height)", tip: "矮 = chhota. Character neche daba hua lagta hai — jaise koi chhota insaan 📏" },
  { id: 4, char: "爱", pinyin: "ài", en: "love", tip: "爱 = mohabbat. AI sounds like 'I' — I LOVE you! ❤️ Dil ke andar chhupa hua hai" },
  { id: 5, char: "爱好", pinyin: "àihào", en: "hobby", tip: "爱=love, 好=good. Jo cheez tumhe LOVE aur GOOD lage = hobby! ❤️" },
  { id: 6, char: "安静", pinyin: "ānjìng", en: "quiet/peaceful", tip: "安=peace (chhat ke neeche aurat=ghar mein sukoon), 静=still. Ghar mein sukoon = quiet 🤫" },
  { id: 7, char: "八", pinyin: "bā", en: "eight", tip: "八 = aath. Character mein 2 alag hoti lines — BA = 8 fingers khol ke dikha raha 🙌" },
  { id: 8, char: "把", pinyin: "bǎ", en: "hold/grammar particle", tip: "把 = haath se pakarna. Grammar mein object ko pehle laata hai — jaise 'haath mein pakad ke aage lao'" },
  { id: 9, char: "爸爸", pinyin: "bàba", en: "dad/father", tip: "爸爸 = abbu. BA BA = baby ki pehli awaaz — abbu ko call karna! 👨‍👦" },
  { id: 10, char: "吧", pinyin: "ba", en: "right? (particle)", tip: "吧 = na? / right? — Mouth (口) se half-question. 'Tum theek ho, BA?' = right?" },
  { id: 11, char: "白", pinyin: "bái", en: "white", tip: "白 = safed. BAI = bare/blank — safed = blank jaisa. Sun (日) se zyada bright = WHITE ⬜" },
  { id: 12, char: "百", pinyin: "bǎi", en: "hundred", tip: "百 = sau. BAI = 'BIG hundred!' — 一百 = 100. White (白) ka upar ek stroke = hundred ☝️" },
  { id: 13, char: "班", pinyin: "bān", en: "class/shift", tip: "班 = class. Soch ke class mein log ek BAND (班) banaate hain 📚" },
  { id: 14, char: "搬", pinyin: "bān", en: "move (house)", tip: "搬 = shift karna. Haath (扌) se saaman BAAN ke uthao = move house 🏠" },
  { id: 15, char: "半", pinyin: "bàn", en: "half", tip: "半 = aadha. Ek line beech mein = BAN (band) = aadha kata hua ✂️" },
  { id: 16, char: "办法", pinyin: "bànfǎ", en: "way/method", tip: "办=do/manage, 法=law/method. Kaam karne ka TAREEQA = method 💡" },
  { id: 17, char: "办公室", pinyin: "bàngōngshì", en: "office", tip: "办=work, 公=public, 室=room. Kaam karne wala sarkari kamra = OFFICE 🏢" },
  { id: 18, char: "帮忙", pinyin: "bāngmáng", en: "help (verb)", tip: "帮=help group, 忙=busy. Busy insaan ki HELP karo 🤝" },
  { id: 19, char: "帮助", pinyin: "bāngzhù", en: "help/assist", tip: "帮=help, 助=assist. BANG ZHU = 'BANG! Help dedo!' — saath milke madad karna 🙏" },
  { id: 20, char: "包", pinyin: "bāo", en: "bag/package", tip: "包 = bag. Ander kuch WRAPPED hai — jaise bun mein filling hoti hai 🎒" },
  { id: 21, char: "饱", pinyin: "bǎo", en: "full (after eating)", tip: "饱 = pet bhar gaya. 食(khana) + wrapping = pet mein khana bhar gaya = full 🍽️" },
  { id: 22, char: "报纸", pinyin: "bàozhǐ", en: "newspaper", tip: "报=report/announce, 纸=paper. Khabar wala kaghaz = NEWSPAPER 📰 BAO ZHI!" },
  { id: 23, char: "杯子", pinyin: "bēizi", en: "cup/glass", tip: "杯=cup, 子=suffix. BEI ZI = BIG cup! ☕ Chai peene wala pyala" },
  { id: 24, char: "北方", pinyin: "běifāng", en: "north", tip: "北=north, 方=direction. BEI = NORTH — Beijing (北京) north mein hai! 🧭" },
  { id: 25, char: "北京", pinyin: "běijīng", en: "Beijing", tip: "北=north, 京=capital. Northern Capital = BEIJING 🏯 China ki rajdhani!" },
  { id: 26, char: "被", pinyin: "bèi", en: "passive marker/blanket", tip: "被 = passive voice. 'Kisi ne mujhe MARA' — yahan 被 use hota hai. BEI = by someone" },
  { id: 27, char: "本", pinyin: "běn", en: "book/measure word", tip: "本 = kitaab (measure word). Tree (木) ki jar = ROOTS = basis = BOOK 📗" },
  { id: 28, char: "鼻子", pinyin: "bízi", en: "nose", tip: "鼻 = naak. BI = nose breath sound. 鼻 character mein upar pointed part = naak 👃" },
  { id: 29, char: "比", pinyin: "bǐ", en: "than/compare", tip: "比 = se zyada (than). BI = 'BEAT' karo — 'I am BETTER than you' = 比 你好 🏆" },
  { id: 30, char: "比较", pinyin: "bǐjiào", en: "compare/relatively", tip: "比=compare, 较=compare. Dono compare karna = BI JIAO — tumse BETTER ya worse?" },
  { id: 31, char: "比赛", pinyin: "bǐsài", en: "match/competition", tip: "比=compare, 赛=race/compete. Ek doosre se compare karo = MATCH/COMPETITION 🏆" },
  { id: 32, char: "必须", pinyin: "bìxū", en: "must/have to", tip: "必须 = ZAROOR karna. BI XU sounds like 'be sure' — zaroor karo! ✅" },
  { id: 33, char: "变化", pinyin: "biànhuà", en: "change/transformation", tip: "变=transform, 化=change. BIAN HUA = BADALAO 🦋" },
  { id: 34, char: "表示", pinyin: "biǎoshì", en: "express/indicate", tip: "表=show/surface, 示=show/indicate. Dikhana = BIAO SHI = express 🎭" },
  { id: 35, char: "表演", pinyin: "biǎoyǎn", en: "perform/performance", tip: "表=show, 演=perform/act. Show karo = PERFORM 🎪 BIAO YAN = show performance!" },
  { id: 36, char: "别", pinyin: "bié", en: "don't/other", tip: "别 = mat karo! BIE = 'BEY! Mat karo!' — like warning someone to STOP 🛑" },
  { id: 37, char: "别人", pinyin: "biéren", en: "other people/others", tip: "别=other/different, 人=person. Alag insaan = doosre log = OTHERS 👥" },
  { id: 38, char: "宾馆", pinyin: "bīnguǎn", en: "hotel", tip: "宾=guest, 馆=building. Mehmaan wali imarat = HOTEL 🏨 BIN GUAN!" },
  { id: 39, char: "冰箱", pinyin: "bīngxiāng", en: "refrigerator", tip: "冰=ice, 箱=box. ICE BOX = FRIDGE ❄️📦" },
  { id: 40, char: "不客气", pinyin: "búkèqi", en: "you're welcome", tip: "不=not, 客=guest, 气=manner. Mehmaan jaisi tameezon ki zaroorat nahi = YOU'RE WELCOME 😊" },
  { id: 41, char: "不", pinyin: "bù", en: "no/not", tip: "不 = nahi. BU = 'BOO!' — nahi nahi, BOO karo! ❌" },
  { id: 42, char: "才", pinyin: "cái", en: "just/only then", tip: "才 = abhi abhi / tab hi. CAI = 'CHAI' — abhi abhi chai bani = JUST now ⏱️" },
  { id: 43, char: "菜", pinyin: "cài", en: "dish/vegetable", tip: "菜 = saalan/sabzi. CAI = 'KAI' — khana khao 🍲 Grass (艹) + tree = plants = food!" },
  { id: 44, char: "菜单", pinyin: "càidān", en: "menu", tip: "菜=food, 单=list. Khane ki LIST = MENU 📋" },
  { id: 45, char: "参加", pinyin: "cānjiā", en: "participate/join", tip: "参加 = shamil hona. CAN JIA — 'CAN I JOIN?' = participate! 🙋" },
  { id: 46, char: "草", pinyin: "cǎo", en: "grass", tip: "草 = ghaas. Upar 艹 = grass symbol. CAO = rough/grassy ⚽" },
  { id: 47, char: "层", pinyin: "céng", en: "floor/layer/storey", tip: "层 = manzil. Ek upar ek LAYER — CENG = ceiling of each floor 🏢" },
  { id: 48, char: "茶", pinyin: "chá", en: "tea", tip: "茶 = chai. CHA = CHAI! 🍵 Grass (艹) + person under tree = chill karo chai piyo!" },
  { id: 49, char: "差", pinyin: "chà", en: "bad/lacking/difference", tip: "差 = kharab/faraq. CHA = CHAR jaisi bad quality 😤" },
  { id: 50, char: "长", pinyin: "cháng", en: "long (length)", tip: "长 = lamba. CHANG = LONG! Character mein lambi lines hain 📏" },
  { id: 51, char: "唱歌", pinyin: "chànggē", en: "sing (a song)", tip: "唱=sing, 歌=song. Muh (口) se song nikalna = SING 🎤 CHANG GE!" },
  { id: 52, char: "超市", pinyin: "chāoshì", en: "supermarket", tip: "超=super/exceed, 市=market. SUPER MARKET = CHAO SHI 🛒" },
  { id: 53, char: "衬衫", pinyin: "chènshān", en: "shirt", tip: "衬=lining, 衫=shirt. CHEN SHAN = shirt 👕" },
  { id: 54, char: "成绩", pinyin: "chéngjì", en: "grades/results", tip: "成=achieve, 绩=result. CHENG JI = exam result 📊" },
  { id: 55, char: "城市", pinyin: "chéngshì", en: "city", tip: "城=city wall, 市=market. Deewar wala bazaar = CITY 🌆" },
  { id: 56, char: "吃", pinyin: "chī", en: "eat", tip: "吃 = khana khana. CHI = 'CHEW!' — muh (口) se khana = EAT 🍜" },
  { id: 57, char: "迟到", pinyin: "chídào", en: "arrive late", tip: "迟=late, 到=arrive. CHI = chew slowly = LATE. Chi Dao = late aana ⏰😅" },
  { id: 58, char: "出", pinyin: "chū", en: "come out/exit", tip: "出 = bahar nikalna. CHU = 'CHOO!' train ki awaaz bahar aane ki 🚂" },
  { id: 59, char: "出现", pinyin: "chūxiàn", en: "appear/emerge", tip: "出=come out, 现=appear. Bahar aa ke dikhna = APPEAR 👁️" },
  { id: 60, char: "出租车", pinyin: "chūzūchē", en: "taxi/cab", tip: "出租=rent out, 车=vehicle. Kiraye wali gaadi = TAXI 🚕 CHU ZU CHE!" },
  { id: 61, char: "厨房", pinyin: "chúfáng", en: "kitchen", tip: "厨=cook, 房=room. Pakane wala kamra = KITCHEN 🍳 CHU FANG!" },
  { id: 62, char: "除了", pinyin: "chúle", en: "except/besides", tip: "除=remove, 了=done. CHU LE = CHHOR ke = EXCEPT 🚫" },
  { id: 63, char: "穿", pinyin: "chuān", en: "wear/pass through", tip: "穿 = pehenna. CHUAN = 'CHOOSE AN' outfit — pass through clothing = WEAR 👗" },
  { id: 64, char: "船", pinyin: "chuán", en: "ship/boat", tip: "船 = kashti. CHUAN sounds like 'CANOE' 🚢" },
  { id: 65, char: "春", pinyin: "chūn", en: "spring (season)", tip: "春 = bahar. Sun (日) neeche aata hai + plants nikaltay hain = SPRING 🌸" },
  { id: 66, char: "词语", pinyin: "cíyǔ", en: "words/terms", tip: "词=word, 语=language. CI YU = words of language 📝" },
  { id: 67, char: "次", pinyin: "cì", en: "time/occasion", tip: "次 = baar/dafa. CI = 'SEE' it one more TIME — second time around 🔢" },
  { id: 68, char: "聪明", pinyin: "cōngming", en: "clever/smart", tip: "聪=sharp ears+eyes, 明=bright. Tez kaan aur roshan dimagh = CLEVER 🧠" },
  { id: 69, char: "从", pinyin: "cóng", en: "from/since", tip: "从 = se (from). CONG = 'COME FROM' — ek jagah se doosri taraf jaana. Two people following each other! 👣" },
  { id: 70, char: "错", pinyin: "cuò", en: "wrong/mistake", tip: "错 = galat. CUO = 'CUE wrong!' — cue pe galat kadam 😬 Gold (钅) gone wrong = mistake!" },
  { id: 71, char: "打电话", pinyin: "dǎdiànhuà", en: "make a phone call", tip: "打=hit/do, 电=electric, 话=talk. Electric talk = PHONE CALL 📞 DA DIAN HUA!" },
  { id: 72, char: "打篮球", pinyin: "dǎlánqiú", en: "play basketball", tip: "打=hit, 篮=basket, 球=ball. Ball ko BASKET mein MAAR = BASKETBALL 🏀" },
  { id: 73, char: "打扫", pinyin: "dǎsǎo", en: "clean/sweep", tip: "打=hit, 扫=sweep. Jhaadu MAARO = sweep clean 🧹" },
  { id: 74, char: "打算", pinyin: "dǎsuàn", en: "plan/intend", tip: "打=do, 算=calculate. Pehle calculate karo phir karo = PLAN 📝" },
  { id: 75, char: "大", pinyin: "dà", en: "big/large", tip: "大 = bara. DA = BIG! Character mein haath failaye insaan — BADA 🙆" },
  { id: 76, char: "大家", pinyin: "dàjiā", en: "everyone/everybody", tip: "大=big, 家=home/family. Sab ka bada ghar = EVERYBODY 👨‍👩‍👧‍👦" },
  { id: 77, char: "带", pinyin: "dài", en: "bring/carry/belt", tip: "带 = saath laana. DAI = 'DUDE bring it!' — kuch saath laao 🎒" },
  { id: 78, char: "担心", pinyin: "dānxīn", en: "worry/be anxious", tip: "担=carry burden, 心=heart. Dil pe bojh uthana = WORRY 😟" },
  { id: 79, char: "蛋糕", pinyin: "dàngāo", en: "cake", tip: "蛋=egg, 糕=cake. EGG + sweet = CAKE 🎂 DANG! Aacha cake hai!" },
  { id: 80, char: "但是", pinyin: "dànshì", en: "but/however", tip: "但=but, 是=is. DAN SHI = 'DONE IS... BUT!' — lekin/magar 🔄" },
  { id: 81, char: "当然", pinyin: "dāngrán", en: "of course/naturally", tip: "当然 = bilkul/zaroor. DANG RAN = 'OF COURSE!' 👌" },
  { id: 82, char: "到", pinyin: "dào", en: "arrive/reach", tip: "到 = pahunchna. DAO = 'DOOR' — pahuncha darwaze tak = REACH 🚪" },
  { id: 83, char: "地", pinyin: "de", en: "adverb particle (-ly)", tip: "地 = adverb marker DE. 'Quickly' mein -ly jaisa. 安静地 = quietly 🔤" },
  { id: 84, char: "的", pinyin: "de", en: "possessive particle", tip: "的 = ka/ki/ke. DE = 'OF' — tumhari kitaab = 你的书 (ni DE shu) 📚" },
  { id: 85, char: "得", pinyin: "de", en: "complement particle", tip: "得 = action ka result. 跑得快 = run fast. DE = result connector 🏃" },
  { id: 86, char: "灯", pinyin: "dēng", en: "lamp/light", tip: "灯 = batti. DENG = ding! Bulb ki awaaz 💡" },
  { id: 87, char: "等", pinyin: "děng", en: "wait/etc.", tip: "等 = intezar karna / wagera. DENG = 'DANG wait!' — ruko ⏳" },
  { id: 88, char: "低", pinyin: "dī", en: "low/short", tip: "低 = neecha. DI = 'DIP' — neecha karo = LOW ⬇️" },
  { id: 89, char: "弟弟", pinyin: "dìdi", en: "younger brother", tip: "弟=younger brother. DI DI = 'DIDDY' — chhota bhai 👦" },
  { id: 90, char: "地方", pinyin: "dìfang", en: "place/location", tip: "地=earth/ground, 方=direction/place. Zameen ki jagah = PLACE 📍" },
  { id: 91, char: "地铁", pinyin: "dìtiě", en: "subway/metro", tip: "地=underground, 铁=iron. Zameen ke neeche lohe ki gaadi = METRO 🚇" },
  { id: 92, char: "地图", pinyin: "dìtú", en: "map", tip: "地=earth, 图=picture. Zameen ki picture = MAP 🗺️" },
  { id: 93, char: "第一", pinyin: "dìyī", en: "first/number one", tip: "第=ordinal, 一=one. DI YI = number ONE! 🥇" },
  { id: 94, char: "点", pinyin: "diǎn", en: "o'clock/point/dot", tip: "点 = bajay / point. DIAN = a DOT on clock = O'CLOCK 🕐" },
  { id: 95, char: "电脑", pinyin: "diànnǎo", en: "computer", tip: "电=electric, 脑=brain. Electric BRAIN = COMPUTER 💻 DIAN NAO!" },
  { id: 96, char: "电视", pinyin: "diànshì", en: "television", tip: "电=electric, 视=look at. Electric viewing = TV 📺 DIAN SHI!" },
  { id: 97, char: "电梯", pinyin: "diàntī", en: "elevator/lift", tip: "电=electric, 梯=ladder. Electric seedhi = ELEVATOR 🛗" },
  { id: 98, char: "电影", pinyin: "diànyǐng", en: "film/movie", tip: "电=electric, 影=shadow/image. Electric shadow image = MOVIE 🎬 DIAN YING!" },
  { id: 99, char: "电子邮件", pinyin: "diànzǐyóujiàn", en: "email", tip: "电子=electronic, 邮件=mail. Electronic mail = EMAIL 📧" },
  { id: 100, char: "东", pinyin: "dōng", en: "east", tip: "东 = east. DONG = DAWN — suraj east mein ugta hai 🌅" },
  { id: 101, char: "东西", pinyin: "dōngxi", en: "thing/stuff", tip: "东=east, 西=west. East-West = EVERYTHING = STUFF 📦 DONG XI = things!" },
  { id: 102, char: "冬", pinyin: "dōng", en: "winter", tip: "冬 = sardi. DONG = DONG! Ghanта bajta hai sardi mein ❄️🔔" },
  { id: 103, char: "懂", pinyin: "dǒng", en: "understand", tip: "懂 = samajhna. DONG = 'DONG! Got it!' — samajh gaya 💡" },
  { id: 104, char: "动物", pinyin: "dòngwù", en: "animal", tip: "动=move, 物=thing. Chalne wali cheez = ANIMAL 🐘" },
  { id: 105, char: "都", pinyin: "dōu", en: "all/both", tip: "都 = sab/dono. DOU = 'DO ALL' — sab karo, sab hain! 👐" },
  { id: 106, char: "读", pinyin: "dú", en: "read (aloud)", tip: "读 = padhna. DU = 'DO read!' — school mein padhna 📖" },
  { id: 107, char: "短", pinyin: "duǎn", en: "short (length)", tip: "短 = chhota. DUAN = 'DOWN' short hai! 📏" },
  { id: 108, char: "段", pinyin: "duàn", en: "paragraph/section", tip: "段 = paragraph/hissa. DUAN = ek PART = SECTION 📄" },
  { id: 109, char: "锻炼", pinyin: "duànliàn", en: "exercise/work out", tip: "锻=forge metal, 炼=refine. Metal forge karna = body taqatwer banana = EXERCISE 💪" },
  { id: 110, char: "对", pinyin: "duì", en: "correct/yes/towards", tip: "对 = theek/bilkul. DUI = 'DO IT RIGHT!' — sahi jawab ✅" },
  { id: 111, char: "对不起", pinyin: "duìbuqǐ", en: "sorry/I'm sorry", tip: "对不起 = maafi. DUI BU QI = 'RIGHT? NO! Can't stand' = SORRY 🙇" },
  { id: 112, char: "多", pinyin: "duō", en: "many/much", tip: "多 = zyada. DUO = DUO = two people = MORE 🔢" },
  { id: 113, char: "多么", pinyin: "duōme", en: "how/such (exclamation)", tip: "多=much, 么=suffix. 'Kitna zyada!' = DUO ME = HOW! 😮" },
  { id: 114, char: "多少", pinyin: "duōshao", en: "how much/how many", tip: "多=much, 少=few. Zyada ya kam? = HOW MUCH? 🤔" },
  { id: 115, char: "饿", pinyin: "è", en: "hungry", tip: "饿 = bhookha. E = 'AYY I'm hungry!' Food (食) + lacking = HUNGRY 🍜" },
  { id: 116, char: "而且", pinyin: "érqiě", en: "and/moreover/furthermore", tip: "而且 = aur bhi. ER QIE = 'ALSO!' — moreover. Pehli baat ke baad aur baat! ➕" },
  { id: 117, char: "儿子", pinyin: "érzi", en: "son", tip: "儿=child/son, 子=child. ER ZI = LITTLE one = SON 👦" },
  { id: 118, char: "耳朵", pinyin: "ěrduo", en: "ear", tip: "耳=ear (looks like ear shape!), 朵=petal. ER DUO — ER sounds like EAR! 👂" },
  { id: 119, char: "二", pinyin: "èr", en: "two", tip: "二 = do. ER = TWO lines = 2! 二 ══ literally two lines ✌️" },
  { id: 120, char: "发烧", pinyin: "fāshāo", en: "have a fever", tip: "发=emit, 烧=burn. Body se burning emit = FEVER 🤒🌡️" },
  { id: 121, char: "发现", pinyin: "fāxiàn", en: "discover/find out", tip: "发=happen/emerge, 现=appear. Kuch appear hona = DISCOVER 🔍" },
  { id: 122, char: "饭馆", pinyin: "fànguǎn", en: "restaurant", tip: "饭=rice/food, 馆=building. Khane wali jagah = RESTAURANT 🍽️ FAN GUAN!" },
  { id: 123, char: "方便", pinyin: "fāngbiàn", en: "convenient", tip: "方=way, 便=easy. Aasaan tareeqa = CONVENIENT 😌" },
  { id: 124, char: "房间", pinyin: "fángjiān", en: "room", tip: "房=building/house, 间=space between. Ghar mein jagah = ROOM 🚪 FANG JIAN!" },
  { id: 125, char: "放", pinyin: "fàng", en: "put/place/release", tip: "放 = rakhna. FANG = FLING/PLACE — kuch koi jagah RAKH do 📦" },
  { id: 126, char: "放心", pinyin: "fàngxīn", en: "relax/don't worry", tip: "放=release, 心=heart. Dil ko RELEASE karo = tension chordo 😌💙" },
  { id: 127, char: "非常", pinyin: "fēicháng", en: "very/extremely", tip: "非=not ordinary, 常=normal. Non-normal = FEI CHANG = VERY/EXTREMELY! 💯" },
  { id: 128, char: "飞机", pinyin: "fēijī", en: "airplane", tip: "飞=fly, 机=machine. Urne wali machine = AIRPLANE ✈️ FEI JI!" },
  { id: 129, char: "分", pinyin: "fēn", en: "minute/divide/point", tip: "分 = minute ya point. FEN = divide — ek ghante ke 60 PARTS 🕐" },
  { id: 130, char: "分钟", pinyin: "fēnzhōng", en: "minute (time)", tip: "分=minute, 钟=clock/bell. Clock ka minute = MINUTE ⏱️ FEN ZHONG!" },
  { id: 131, char: "服务员", pinyin: "fúwùyuán", en: "waiter/service staff", tip: "服务=service, 员=staff. Service dene wala = WAITER 👨‍🍳 FU WU YUAN!" },
  { id: 132, char: "附近", pinyin: "fùjìn", en: "nearby/vicinity", tip: "附=attached/near, 近=close. Kareeb attached = NEARBY 📍" },
  { id: 133, char: "复习", pinyin: "fùxí", en: "review/revise", tip: "复=repeat/return, 习=practice. Wapas practice karo = REVISE 📚" },
  { id: 134, char: "干净", pinyin: "gānjìng", en: "clean/neat", tip: "干=dry/clean, 净=pure. DRY + PURE = CLEAN ✨ GAN JING!" },
  { id: 135, char: "敢", pinyin: "gǎn", en: "dare/bold", tip: "敢 = jurrat karna. GAN = 'GONE!' — himmat karke aage jaana = DARE 🦁" },
  { id: 136, char: "感冒", pinyin: "gǎnmào", en: "cold/flu", tip: "感=feel/catch, 冒=rise/emit. Cold pakarna = GAN MAO 🤧" },
  { id: 137, char: "刚才", pinyin: "gāngcái", en: "just now/a moment ago", tip: "刚=just/barely, 才=just/then. ABHI ABHI = GANG CAI ⏱️" },
  { id: 138, char: "高", pinyin: "gāo", en: "tall/high", tip: "高 = uncha/lamba. GAO = 'GOA' high above sea! ⬆️ Character mein tall building shape!" },
  { id: 139, char: "高兴", pinyin: "gāoxìng", en: "happy/glad", tip: "高=high, 兴=mood. HIGH mood = HAPPY 😄 GAO XING!" },
  { id: 140, char: "告诉", pinyin: "gàosu", en: "tell/inform", tip: "告=announce/inform, 诉=tell. Bata dena = TELL 💬 GAO SU!" },
  { id: 141, char: "哥哥", pinyin: "gēge", en: "older brother", tip: "哥=older brother. GE GE = bhai ki awaaz! 👨‍👦 Repeat = OLDER bhai" },
  { id: 142, char: "个", pinyin: "gè", en: "individual (measure word)", tip: "个 = ek (cheez ginne ka word). GE = 'GET one!' — yi ge = one item 1️⃣" },
  { id: 143, char: "给", pinyin: "gěi", en: "give/for", tip: "给 = dena. GEI = 'GIVE!' — kisi ko kuch do 🎁" },
  { id: 144, char: "跟", pinyin: "gēn", en: "with/follow", tip: "跟 = saath. GEN = 'GEN Z follows trends' = FOLLOW/WITH 👣" },
  { id: 145, char: "根据", pinyin: "gēnjù", en: "according to/based on", tip: "根=root/basis, 据=evidence. Jadon (roots) par based = ACCORDING TO 📜" },
  { id: 146, char: "更", pinyin: "gèng", en: "even more/still more", tip: "更 = aur zyada. GENG = MORE intense! ⬆️" },
  { id: 147, char: "公共汽车", pinyin: "gōnggòngqìchē", en: "bus", tip: "公共=public, 汽=steam/gas, 车=vehicle. Public gas vehicle = BUS 🚌 GONG GONG QI CHE!" },
  { id: 148, char: "公斤", pinyin: "gōngjīn", en: "kilogram", tip: "公=standard, 斤=weight unit. Standard weight = KG ⚖️" },
  { id: 149, char: "公司", pinyin: "gōngsī", en: "company/firm", tip: "公=public, 司=manage. Public management = COMPANY 🏢 GONG SI!" },
  { id: 150, char: "公园", pinyin: "gōngyuán", en: "park", tip: "公=public, 园=garden. Public garden = PARK 🌳" },
  { id: 151, char: "工作", pinyin: "gōngzuò", en: "work/job", tip: "工=work/craft, 作=do/make. GONG ZUO = work karna 💼 Craft + action = JOB!" },
  { id: 152, char: "狗", pinyin: "gǒu", en: "dog", tip: "狗 = kutta. GOU = 'GOO!' — kutta 'woof' karta hai 🐕" },
  { id: 153, char: "故事", pinyin: "gùshi", en: "story/tale", tip: "故=old/past, 事=event. Purani baat = STORY 📖 GU SHI!" },
  { id: 154, char: "刮风", pinyin: "guāfēng", en: "windy", tip: "刮=scrape/blow, 风=wind. Hawaen scrape karti hain = WINDY 💨" },
  { id: 155, char: "关", pinyin: "guān", en: "close/shut/turn off", tip: "关 = band karna. GUAN = GONE — cheez band kar do 🚪" },
  { id: 156, char: "关系", pinyin: "guānxì", en: "relationship/connection", tip: "关=concern/connect, 系=tie. Dono connected hain = RELATIONSHIP 💞" },
  { id: 157, char: "关心", pinyin: "guānxīn", en: "care for/concern", tip: "关=concern, 心=heart. Dil se connection = CARE FOR 🤗" },
  { id: 158, char: "关于", pinyin: "guānyú", en: "about/regarding", tip: "关=concerning, 于=at/in. Is baare mein = ABOUT 🔍" },
  { id: 159, char: "贵", pinyin: "guì", en: "expensive", tip: "贵 = mehenga. GUI = 'GOOEY expensive' — bahut mehenga! 💰" },
  { id: 160, char: "国家", pinyin: "guójiā", en: "country/nation", tip: "国=nation, 家=home. Qoum ka ghar = COUNTRY 🌏" },
  { id: 161, char: "果汁", pinyin: "guǒzhī", en: "fruit juice", tip: "果=fruit, 汁=juice/liquid. Phal ka paani = FRUIT JUICE 🍹 GUO ZHI!" },
  { id: 162, char: "过去", pinyin: "guòqù", en: "past/gone by", tip: "过=pass, 去=go. Jo guzar gaya = THE PAST ⏳" },
  { id: 163, char: "过", pinyin: "guò", en: "pass/cross/experience", tip: "过 = guzarna/experience. GUO = pass through 🚶" },
  { id: 164, char: "还", pinyin: "hái", en: "still/yet/also", tip: "还 = abhi bhi. HAI = 'HEY still here!' — abhi bhi wahi hai 🔄" },
  { id: 165, char: "还是", pinyin: "háishì", en: "still/or (questions)", tip: "还=still, 是=is. HAI SHI = 'still is' OR choice question 🤔" },
  { id: 166, char: "孩子", pinyin: "háizi", en: "child/children", tip: "孩=child, 子=child. HAI ZI = little one 👶 Hai = sea of energy = KIDS!" },
  { id: 167, char: "害怕", pinyin: "hàipà", en: "be afraid/fear", tip: "害=harm, 怕=fear. Nuqsan ka darr = HAI PA = scared! 😱" },
  { id: 168, char: "汉语", pinyin: "hànyǔ", en: "Chinese language", tip: "汉=Han Chinese, 语=language. Han language = CHINESE 🇨🇳 HAN YU!" },
  { id: 169, char: "好", pinyin: "hǎo", en: "good/well", tip: "好 = acha. HAO = 'HOW good!' — 女(woman) + 子(child) = GOOD family life 🥰" },
  { id: 170, char: "好吃", pinyin: "hǎochī", en: "delicious/yummy", tip: "好=good, 吃=eat. Good to eat = DELICIOUS 😋 HAO CHI!" },
  { id: 171, char: "号", pinyin: "hào", en: "number/day of month", tip: "号 = number/tarikh. HAO = 'HOW many?' — what number? 🔢" },
  { id: 172, char: "喝", pinyin: "hē", en: "drink", tip: "喝 = peena. HE = 'HEY drink!' — muh (口) se liquid 💧" },
  { id: 173, char: "和", pinyin: "hé", en: "and/with", tip: "和 = aur. HE = 'HEY AND you!' — joining two things together ➕" },
  { id: 174, char: "河", pinyin: "hé", en: "river", tip: "河 = darya/nehr. HE = 'HEY flowing!' — water (氵) flowing = RIVER 🌊" },
  { id: 175, char: "黑", pinyin: "hēi", en: "black", tip: "黑 = kala. HEI = 'HEY it's dark!' — bilkul kala andhere mein 🖤" },
  { id: 176, char: "黑板", pinyin: "hēibǎn", en: "blackboard", tip: "黑=black, 板=board. BLACK BOARD = HEI BAN 🖊️" },
  { id: 177, char: "很", pinyin: "hěn", en: "very", tip: "很 = bahut. HEN = 'HEN very much!' — bahut zyada 🔥" },
  { id: 178, char: "红", pinyin: "hóng", en: "red", tip: "红 = laal. HONG = 'HONG Kong' — red flag wala Hong Kong! 🔴 Silk (纟) + red = RED" },
  { id: 179, char: "后面", pinyin: "hòumiàn", en: "behind/back side", tip: "后=after/behind, 面=side/face. Peecha = BEHIND 🔙 HOU MIAN!" },
  { id: 180, char: "护照", pinyin: "hùzhào", en: "passport", tip: "护=protect, 照=document. Protection wala document = PASSPORT 🛂" },
  { id: 181, char: "花", pinyin: "huā", en: "flower/spend", tip: "花 = phool / kharch karna. HUA = beautiful FLOWER 🌸 OR spend money 💸" },
  { id: 182, char: "花园", pinyin: "huāyuán", en: "garden/flower garden", tip: "花=flower, 园=garden. Phoolon ka baghicha = GARDEN 🌺 HUA YUAN!" },
  { id: 183, char: "画", pinyin: "huà", en: "painting/draw", tip: "画 = tasveer. HUA = draw. Character mein frame/box bana hua hai 🖼️" },
  { id: 184, char: "坏", pinyin: "huài", en: "bad/broken/evil", tip: "坏 = kharab. HUAI = 'HOW Y!' — kharab cheez dekh ke bolte ho! ❌" },
  { id: 185, char: "欢迎", pinyin: "huānyíng", en: "welcome", tip: "欢=joyful, 迎=greet. Khushi se swagat = WELCOME! 🎉 HUAN YING!" },
  { id: 186, char: "还", pinyin: "huán", en: "return/give back", tip: "还 = wapas karna. HUAN = RETURN — library ki kitaab HUAN karo! 📚" },
  { id: 187, char: "环境", pinyin: "huánjìng", en: "environment", tip: "环=ring/surround, 境=boundary. Jo cheez hume surround kare = ENVIRONMENT 🌍" },
  { id: 188, char: "换", pinyin: "huàn", en: "change/exchange", tip: "换 = badalna. HUAN = 'CHANGE!' 🔄" },
  { id: 189, char: "黄", pinyin: "huáng", en: "yellow", tip: "黄 = peela. HUANG = 'HUANG' Yellow River (黄河) = YELLOW 🟡" },
  { id: 190, char: "回", pinyin: "huí", en: "return/go back", tip: "回 = wapas jaana. HUI = 'COME BACK!' — ghar wapas jaao 🏠" },
  { id: 191, char: "回答", pinyin: "huídá", en: "answer/reply", tip: "回=return, 答=answer. Jawab WAPAS karo = ANSWER 💬" },
  { id: 192, char: "会", pinyin: "huì", en: "can/be able to/meeting", tip: "会 = kar sakna. HUI = 'HOORAY I CAN!' — kuch karna aata hai 💪" },
  { id: 193, char: "会议", pinyin: "huìyì", en: "meeting/conference", tip: "会=meeting, 议=discuss. Log milke discuss karo = MEETING 🤝" },
  { id: 194, char: "火车站", pinyin: "huǒchēzhàn", en: "train station", tip: "火=fire/steam, 车=vehicle, 站=station. Steam vehicle station = TRAIN STATION 🚂 HUO CHE ZHAN!" },
  { id: 195, char: "或者", pinyin: "huòzhě", en: "or (statements)", tip: "或=perhaps/or, 者=person/thing. Ya YA = OR 🔀" },
  { id: 196, char: "机场", pinyin: "jīchǎng", en: "airport", tip: "机=machine, 场=field/ground. Machine ka maidan = AIRPORT 🛫 JI CHANG!" },
  { id: 197, char: "鸡蛋", pinyin: "jīdàn", en: "egg", tip: "鸡=chicken, 蛋=egg. Murgi ka anda = EGG 🥚 JI DAN!" },
  { id: 198, char: "几乎", pinyin: "jīhū", en: "almost/nearly", tip: "几=almost/how many, 乎=particle. JI HU = 'nearly there!' = ALMOST ≈" },
  { id: 199, char: "机会", pinyin: "jīhuì", en: "opportunity/chance", tip: "机=chance, 会=meeting. Mauka aata hai = OPPORTUNITY 🎯" },
  { id: 200, char: "极", pinyin: "jí", en: "extremely/pole", tip: "极 = bahut zyada. JI = 'GEEZ!' = EXTREMELY! 💯" },
  { id: 201, char: "几", pinyin: "jǐ", en: "how many/several", tip: "几 = kitne/kuch. JI = 'GIVE me how many?' — small number question 🔢" },
  { id: 202, char: "记得", pinyin: "jìde", en: "remember", tip: "记=record/remember, 得=get. JI DE = remember ☝️🧠" },
  { id: 203, char: "季节", pinyin: "jìjié", en: "season", tip: "季=season, 节=segment. JI JIE = saal ke SEGMENTS = SEASONS 🍂🌸❄️☀️" },
  { id: 204, char: "家", pinyin: "jiā", en: "home/family", tip: "家 = ghar/khandan. JIA = 'YAY! Home!' — chhat ke neeche pig (豕) = ghar 🏠" },
  { id: 205, char: "检查", pinyin: "jiǎnchá", en: "check/inspect", tip: "检=examine, 查=investigate. Dekho aur puchho = CHECK 🔎" },
  { id: 206, char: "简单", pinyin: "jiǎndān", en: "simple/easy", tip: "简=simple, 单=single. Ek hi cheez = SIMPLE! JIAN DAN 👍" },
  { id: 207, char: "件", pinyin: "jiàn", en: "piece/item (measure word)", tip: "件 = cheez ginne ka word. JIAN = one ITEM. Yi jian yifu = one piece of clothing 👔" },
  { id: 208, char: "健康", pinyin: "jiànkāng", en: "healthy/health", tip: "健=strong/healthy, 康=health. JIAN KANG = healthy & strong 💪" },
  { id: 209, char: "见面", pinyin: "jiànmiàn", en: "meet (someone)", tip: "见=see, 面=face. Chehra DEKHNA = meet face to face 👀" },
  { id: 210, char: "讲", pinyin: "jiǎng", en: "speak/tell/explain", tip: "讲 = bolna. JIANG = explain karna, jaise teacher ⚖️📢" },
  { id: 211, char: "教", pinyin: "jiāo", en: "teach", tip: "教 = sikhana. JIAO = 'TEACH-O!' Teacher sikhata hai 👨‍🏫" },
  { id: 212, char: "脚", pinyin: "jiǎo", en: "foot/feet", tip: "脚 = paon. Body (月) + low position = FOOT at bottom 🦶" },
  { id: 213, char: "角", pinyin: "jiǎo", en: "corner/horn/0.1 yuan", tip: "角 = kona/seenga. JIAO looks like corner/angle shape 📐" },
  { id: 214, char: "叫", pinyin: "jiào", en: "call/be called/shout", tip: "叫 = naam hai / cheekh. JIAO = 'YO!' calling someone's name 📣" },
  { id: 215, char: "教室", pinyin: "jiàoshì", en: "classroom", tip: "教=teach, 室=room. Padhane wala kamra = CLASSROOM 🏫 JIAO SHI!" },
  { id: 216, char: "接", pinyin: "jiē", en: "receive/pick up/connect", tip: "接 = receive/pick up. JIE = 'HEY! CATCH!' — pakad lo 🙌" },
  { id: 217, char: "街道", pinyin: "jiēdào", en: "street/road", tip: "街=street, 道=road. Road + road = STREET 🛣️" },
  { id: 218, char: "结婚", pinyin: "jiéhūn", en: "get married", tip: "结=tie/knot, 婚=marriage. Dil ka gaanth lagana = GET MARRIED 💍" },
  { id: 219, char: "结束", pinyin: "jiéshù", en: "end/finish/conclude", tip: "结=conclude, 束=bundle up. Sab bundle up karo = END 🏁" },
  { id: 220, char: "节目", pinyin: "jiémù", en: "program/show (TV)", tip: "节=segment, 目=eye/item. Aankhon ke liye segments = TV SHOW 📺" },
  { id: 221, char: "节日", pinyin: "jiérì", en: "festival/holiday", tip: "节=festival, 日=day. Festival ka din = HOLIDAY 🎊" },
  { id: 222, char: "姐姐", pinyin: "jiějie", en: "older sister", tip: "姐=older sister. JIE JIE = baji! 👩 Woman (女) + older = big sister!" },
  { id: 223, char: "解决", pinyin: "jiějué", en: "solve/resolve", tip: "解=untie/solve, 决=decide. Gaanth kholna = SOLVE 🔓" },
  { id: 224, char: "借", pinyin: "jiè", en: "borrow/lend", tip: "借 = udhar lena. JIE = 'GIVEEE me!' — tumse maangta hoon = BORROW 📚" },
  { id: 225, char: "介绍", pinyin: "jièshào", en: "introduce/introduction", tip: "介=between/introduce, 绍=continue/connect. Beech mein connect karna = INTRODUCE 🤝 JIE SHAO!" },
  { id: 226, char: "今天", pinyin: "jīntiān", en: "today", tip: "今=present/now, 天=day. Present day = TODAY 📅 JIN TIAN!" },
  { id: 227, char: "进", pinyin: "jìn", en: "enter/go in", tip: "进 = andar jaana. JIN = 'JIN!' — darwaze se andar 🚪" },
  { id: 228, char: "近", pinyin: "jìn", en: "near/close", tip: "近 = qareeb. JIN = 'GIN close!' — qareeb aao 📍" },
  { id: 229, char: "经常", pinyin: "jīngcháng", en: "often/frequently", tip: "经=pass through, 常=ordinary. Regularly guzarna = OFTEN ♻️" },
  { id: 230, char: "经过", pinyin: "jīngguò", en: "pass through/after", tip: "经=through, 过=pass. PASS THROUGH = JING GUO 🚶" },
  { id: 231, char: "经理", pinyin: "jīnglǐ", en: "manager", tip: "经=manage, 理=reason. Jo manage kare = MANAGER 👔" },
  { id: 232, char: "九", pinyin: "jiǔ", en: "nine", tip: "九 = nau. JIU = 'JUICE has 9 vitamins!' 9️⃣ Character jaisa curved = 9" },
  { id: 233, char: "久", pinyin: "jiǔ", en: "long time/a while", tip: "久 = lamba waqt. JIU = 'JEE UH' — time bahut lamba lag raha ⌛" },
  { id: 234, char: "旧", pinyin: "jiù", en: "old/used/worn", tip: "旧 = purana. JIU = 'JEW-EL' purana ho gaya jewel 💎" },
  { id: 235, char: "就", pinyin: "jiù", en: "just/then/exactly", tip: "就 = tab/hi. JIU = 'JEW it!' — bas ab hi karo = JUST/THEN ✅" },
  { id: 236, char: "举行", pinyin: "jǔxíng", en: "hold (an event)", tip: "举=raise/hold up, 行=do/go. Uthake karna = HOLD AN EVENT 🎪 JU XING!" },
  { id: 237, char: "句子", pinyin: "jùzi", en: "sentence", tip: "句=sentence/phrase, 子=suffix. Phrase = SENTENCE 📝" },
  { id: 238, char: "觉得", pinyin: "juéde", en: "feel/think", tip: "觉=feel/sense, 得=get. Mehsoos karna = FEEL/THINK 💭 JUE DE!" },
  { id: 239, char: "决定", pinyin: "juédìng", en: "decide/decision", tip: "决=decide/determined, 定=settled. Pakka karna = DECIDE 🔨" },
  { id: 240, char: "咖啡", pinyin: "kāfēi", en: "coffee", tip: "咖啡 = coffee (transliteration). KA FEI = COFFEE! ☕ Bilkul sound jaisa!" },
  { id: 241, char: "开", pinyin: "kāi", en: "open/start/drive", tip: "开 = kholna/shuru karna. KAI = 'KEY!' — key se kholna = OPEN 🔑" },
  { id: 242, char: "开始", pinyin: "kāishǐ", en: "begin/start", tip: "开=open, 始=begin. Khola aur shuru kiya = BEGIN 🚀 KAI SHI!" },
  { id: 243, char: "看", pinyin: "kàn", en: "see/look/watch", tip: "看 = dekhna. KAN = 'CAN see!' — hand (手) over eye = LOOK 👁️" },
  { id: 244, char: "看见", pinyin: "kànjiàn", en: "see/catch sight of", tip: "看=look, 见=see. Dekhna aur dikhna = SEE/CATCH SIGHT 👀 KAN JIAN!" },
  { id: 245, char: "考试", pinyin: "kǎoshì", en: "exam/test", tip: "考=test/examine, 试=try. Test dena = EXAM 📝 KAO SHI!" },
  { id: 246, char: "渴", pinyin: "kě", en: "thirsty", tip: "渴 = piyaas. Water (氵) + lacking = needs water = THIRSTY 💧" },
  { id: 247, char: "可爱", pinyin: "kě'ài", en: "cute/adorable", tip: "可=can/may, 爱=love. KE AI = loveable = CUTE! 🥰" },
  { id: 248, char: "可能", pinyin: "kěnéng", en: "possible/maybe", tip: "可=can/may, 能=able. Ho sakta hai = POSSIBLE/MAYBE 🤷 KE NENG!" },
  { id: 249, char: "可以", pinyin: "kěyǐ", en: "can/may (permission)", tip: "可=can, 以=use/with. KE YI = 'OK you can!' — ijazat dena ✅" },
  { id: 250, char: "刻", pinyin: "kè", en: "quarter hour/carve", tip: "刻 = 15 minutes. KE = 'CLOCK' ka ek hissa = quarter hour ⏰" },
  { id: 251, char: "课", pinyin: "kè", en: "class/lesson/course", tip: "课 = class/sabaq. KE = 'OKAY class!' — suno sabaq! 📒 Speak (言) + study = CLASS" },
  { id: 252, char: "客人", pinyin: "kèrén", en: "guest/visitor", tip: "客=guest, 人=person. Mehmaan insaan = GUEST 🏠" },
  { id: 253, char: "空调", pinyin: "kōngtiáo", en: "air conditioner", tip: "空=air/empty, 调=adjust. Air ko adjust karna = AC ❄️💨" },
  { id: 254, char: "口", pinyin: "kǒu", en: "mouth/opening", tip: "口 = muh. Ek khuli BOX = open MOUTH 👄 KOU = COO" },
  { id: 255, char: "哭", pinyin: "kū", en: "cry/weep", tip: "哭 = rona. Two mouths + tears = CRY 😭 KU = boo-hoo!" },
  { id: 256, char: "裤子", pinyin: "kùzi", en: "trousers/pants", tip: "裤=trousers, 子=suffix. KU ZI = TROUSERS 👖" },
  { id: 257, char: "块", pinyin: "kuài", en: "piece/yuan (informal)", tip: "块 = tukda / yuan. KUAI = 'QUICK cash!' — informal money 💰" },
  { id: 258, char: "快", pinyin: "kuài", en: "fast/quick", tip: "快 = tez. KUAI = 'QUICK!' — fast heart (忄) = speed 🏃💨" },
  { id: 259, char: "快乐", pinyin: "kuàilè", en: "happy/joyful", tip: "快=pleasant, 乐=happy/music. Acha aur khush = HAPPY 😊 KUAI LE!" },
  { id: 260, char: "筷子", pinyin: "kuàizi", en: "chopsticks", tip: "筷=chopstick (bamboo+fast), 子=suffix. Bamboo se fast khana = CHOPSTICKS 🥢" },
  { id: 261, char: "来", pinyin: "lái", en: "come", tip: "来 = aana. LAI = 'LIE come!' — 'Come here!' aao 🚶" },
  { id: 262, char: "蓝", pinyin: "lán", en: "blue", tip: "蓝 = neela. LAN = 'LANE' pool ka BLUE paani 💙" },
  { id: 263, char: "老", pinyin: "lǎo", en: "old (people/things)", tip: "老 = budhha/purana. LAO = 'LOW energy' = OLD 👴" },
  { id: 264, char: "老师", pinyin: "lǎoshī", en: "teacher", tip: "老=old/experienced, 师=teacher. Purana tajurbakaar = TEACHER 👨‍🏫 LAO SHI!" },
  { id: 265, char: "了", pinyin: "le", en: "completed action particle", tip: "了 = kaam ho gaya. LE = 'DONE!' — action complete marker ✅" },
  { id: 266, char: "累", pinyin: "lèi", en: "tired/exhausted", tip: "累 = thaka hua. LEI = 'LAY down!' — thak ke let jaao 😴" },
  { id: 267, char: "冷", pinyin: "lěng", en: "cold (temperature)", tip: "冷 = thanda. LENG = 'LING LING!' — sardi mein kaampna ❄️" },
  { id: 268, char: "离", pinyin: "lí", en: "away from/separate", tip: "离 = door rehna. LI = 'LEAVE!' — door jana = AWAY FROM 🚶" },
  { id: 269, char: "离开", pinyin: "líkāi", en: "leave/depart", tip: "离=separate, 开=open/away. Alag ho ke door jao = LEAVE 👋" },
  { id: 270, char: "里", pinyin: "lǐ", en: "inside/within", tip: "里 = andar. LI = 'LEE inside' — andar ki baat 🏠" },
  { id: 271, char: "礼物", pinyin: "lǐwù", en: "gift/present", tip: "礼=ceremony/gift, 物=thing. Rasmi taur par diya gaya = GIFT 🎁" },
  { id: 272, char: "历史", pinyin: "lìshǐ", en: "history", tip: "历=experience/go through, 史=history. Jo guzra = HISTORY 📜" },
  { id: 273, char: "脸", pinyin: "liǎn", en: "face", tip: "脸 = chehra. LIAN = 'LEAN in' to see someone's FACE 👤" },
  { id: 274, char: "练习", pinyin: "liànxí", en: "practice/exercise", tip: "练=train, 习=practice. Seekhte seekhte practice karna = PRACTICE 📝" },
  { id: 275, char: "两", pinyin: "liǎng", en: "two (with measure word)", tip: "两 = do (ginnay ke liye). LIANG = 'LONG two!' — 两个 = two items ✌️" },
  { id: 276, char: "辆", pinyin: "liàng", en: "measure word for vehicles", tip: "辆 = gaadi ginne ke liye. Yi LIANG che = ek gaadi 🚗" },
  { id: 277, char: "了解", pinyin: "liǎojiě", en: "understand/know about", tip: "了=clear/finish, 解=explain. Samajh ke khatam karna = UNDERSTAND 🤓" },
  { id: 278, char: "邻居", pinyin: "línjū", en: "neighbor", tip: "邻=adjacent, 居=reside. Saath rehne wale = NEIGHBOR 🏘️" },
  { id: 279, char: "零", pinyin: "líng", en: "zero", tip: "零 = sifar. LING = 'LING ZERO ring' — phone ki awaaz bhi ring = ZERO 0️⃣" },
  { id: 280, char: "六", pinyin: "liù", en: "six", tip: "六 = chheh. LIU = 'LEW six!' — 6️⃣ Top dot + base = SIX" },
  { id: 281, char: "楼", pinyin: "lóu", en: "floor/building/storey", tip: "楼 = manzil/imarat. LOU = 'LOW' nahi — TALL building! 🏢" },
  { id: 282, char: "路", pinyin: "lù", en: "road/path", tip: "路 = sarak. LU = 'ROUTE' — foot (足) + road = ROAD 🛣️" },
  { id: 283, char: "旅游", pinyin: "lǚyóu", en: "travel/tourism", tip: "旅=travel, 游=swim/roam. Doosri jagah roam karna = TRAVEL/TOURISM ✈️ LV YOU!" },
  { id: 284, char: "绿", pinyin: "lǜ", en: "green", tip: "绿 = hara. LU = 'LEAF green' 🌿 Silk thread (纟) + water = green plants" },
  { id: 285, char: "妈妈", pinyin: "māma", en: "mom/mother", tip: "妈=mother. MA MA = ammi/amma! 👩 Baby ki pehli awaaz — MAA! 🤱" },
  { id: 286, char: "马", pinyin: "mǎ", en: "horse", tip: "马 = ghoda. MA sounds like horse sound. Character mein 4 legs! 🐴" },
  { id: 287, char: "马上", pinyin: "mǎshàng", en: "immediately/at once", tip: "马=horse, 上=on. Ghode par sawaar = IMMEDIATELY 🏇" },
  { id: 288, char: "吗", pinyin: "ma", en: "question particle", tip: "吗 = (?) question marker. MA = question ke end mein. 'Theek ho ma?' = Are you ok? ❓" },
  { id: 289, char: "买", pinyin: "mǎi", en: "buy/purchase", tip: "买 = kharidna. MAI = 'MAY I buy?' — kharidna 🛍️" },
  { id: 290, char: "卖", pinyin: "mài", en: "sell", tip: "卖 = bechna. MAI = 'MY sale!' — mai apni cheez bech raha hoon 💰" },
  { id: 291, char: "满意", pinyin: "mǎnyì", en: "satisfied/content", tip: "满=full/satisfied, 意=intention. Dil bhar gaya = SATISFIED 😊" },
  { id: 292, char: "慢", pinyin: "màn", en: "slow", tip: "慢 = dheeма. MAN = 'MAN, so slow!' — bahut aahista 🐢" },
  { id: 293, char: "忙", pinyin: "máng", en: "busy", tip: "忙 = masroof. MANG = 'MANGE work!' — bahut kaam = BUSY 💼" },
  { id: 294, char: "猫", pinyin: "māo", en: "cat", tip: "猫 = billi. MAO = 'MEOW!' bilkul billi ki awaaz! 🐱" },
  { id: 295, char: "帽子", pinyin: "màozi", en: "hat/cap", tip: "帽=hat, 子=suffix. MAO ZI = hat 🎩" },
  { id: 296, char: "没", pinyin: "méi", en: "not have/no", tip: "没 = nahi hai. MEI = 'MAY not have' — past mein nahi tha ❌" },
  { id: 297, char: "没关系", pinyin: "méiguānxi", en: "no problem/never mind", tip: "没=not, 关系=relationship. No connection to problem = NO PROBLEM 😌 MEI GUAN XI!" },
  { id: 298, char: "每", pinyin: "měi", en: "every/each", tip: "每 = har ek. MEI = 'MAY I have EACH?' — har cheez, sab 📋" },
  { id: 299, char: "妹妹", pinyin: "mèimei", en: "younger sister", tip: "妹=younger sister. MEI MEI = chhoti behan 👧 Woman (女) + younger = little sister!" },
  { id: 300, char: "门", pinyin: "mén", en: "door/gate", tip: "门 = darwaza. MEN = 'MEN door' — darwaze ka shape exactly jaisa 🚪" },
  { id: 301, char: "米", pinyin: "mǐ", en: "rice/meter", tip: "米 = chawal. MI looks like grains of rice with lines crossing 🌾" },
  { id: 302, char: "米饭", pinyin: "mǐfàn", en: "steamed rice (cooked)", tip: "米=rice, 饭=cooked food. Paka hua chawal = STEAMED RICE 🍚 MI FAN!" },
  { id: 303, char: "面包", pinyin: "miànbāo", en: "bread", tip: "面=flour/face, 包=wrap. Aaate ka package = BREAD 🍞" },
  { id: 304, char: "面条", pinyin: "miàntiáo", en: "noodles", tip: "面=flour/noodle, 条=strip. Flour strips = NOODLES 🍜 MIAN TIAO!" },
  { id: 305, char: "明白", pinyin: "míngbai", en: "understand/clear", tip: "明=bright (sun+moon), 白=white/clear. Roshan aur saaf = UNDERSTAND 💡" },
  { id: 306, char: "明天", pinyin: "míngtiān", en: "tomorrow", tip: "明=bright, 天=day. Agle roshan din = TOMORROW ☀️ MING TIAN!" },
  { id: 307, char: "名字", pinyin: "míngzi", en: "name", tip: "名=name/famous, 字=character/word. Naam ka lafz = NAME 🏷️ MING ZI!" },
  { id: 308, char: "拿", pinyin: "ná", en: "take/hold/grab", tip: "拿 = lena/pakdna. NA = 'NAAN pakad lo' = take/hold 🤲" },
  { id: 309, char: "哪", pinyin: "nǎ", en: "which", tip: "哪 = kaun sa. NA = 'NAH, which one?' — option choose karna 🤔" },
  { id: 310, char: "哪儿", pinyin: "nǎr", en: "where (Beijing dialect)", tip: "哪=which, 儿=suffix. NAR = 'NAH, where?' — kahan hai? 📍" },
  { id: 311, char: "那", pinyin: "nà", en: "that/then", tip: "那 = woh. NA = 'THAT one!' — door wali cheez 👆" },
  { id: 312, char: "那儿", pinyin: "nàr", en: "there (place)", tip: "那=that, 儿=suffix. NAR = 'THERE!' — wahan 📍" },
  { id: 313, char: "奶奶", pinyin: "nǎinai", en: "grandma (paternal)", tip: "奶=milk/grandma. NAI NAI = dadi ammi 👵 Pyaar wali repeat!" },
  { id: 314, char: "南", pinyin: "nán", en: "south", tip: "南 = janub. NAN = 'NAAN' bread — South Asia mein naan khate hain! 🧭" },
  { id: 315, char: "男人", pinyin: "nánrén", en: "man/male person", tip: "男=male (field+strength), 人=person. Khait mein kaam karne wala = MAN 👨" },
  { id: 316, char: "难", pinyin: "nán", en: "difficult/hard", tip: "难 = mushkil. NAN = 'NONE can do it' — bahut DIFFICULT 😤" },
  { id: 317, char: "难过", pinyin: "nánguò", en: "sad/feel bad", tip: "难=difficult, 过=pass through. Mushkil waqt guzarna = SAD 😢" },
  { id: 318, char: "呢", pinyin: "ne", en: "and you? (particle)", tip: "呢 = aur tum? / what about...? NE = 'NEH what about you?' — turn dena ❓" },
  { id: 319, char: "能", pinyin: "néng", en: "can/be capable of", tip: "能 = kar sakna (taqat se). NENG = 'HANG in there, you CAN!' 💪" },
  { id: 320, char: "你", pinyin: "nǐ", en: "you", tip: "你 = tum/aap. NI = 'NEE you!' — saamne wala NI hai 👉" },
  { id: 321, char: "年", pinyin: "nián", en: "year", tip: "年 = saal. NIAN = 'NEW year!' — har saal naya jaanwar 🎊" },
  { id: 322, char: "年级", pinyin: "niánjí", en: "grade/year (school)", tip: "年=year, 级=level. Saal ka level = SCHOOL GRADE 🎓" },
  { id: 323, char: "年轻", pinyin: "niánqīng", en: "young", tip: "年=year, 轻=light/young. Halke saal = YOUNG 🧑" },
  { id: 324, char: "鸟", pinyin: "niǎo", en: "bird", tip: "鸟 = chiriya. NIAO looks like a bird with wings 🐦" },
  { id: 325, char: "您", pinyin: "nín", en: "you (polite form)", tip: "您 = aap (izzat wala). NIN = 'NIN polite you' — dil (心) se respect 🙏" },
  { id: 326, char: "牛奶", pinyin: "niúnǎi", en: "milk", tip: "牛=cow, 奶=milk. Cow ka doodh = MILK 🥛 NIU NAI!" },
  { id: 327, char: "努力", pinyin: "nǔlì", en: "work hard/strive", tip: "努=strive/exert, 力=strength. Taqat lagao = WORK HARD 💪" },
  { id: 328, char: "女儿", pinyin: "nǚ'ér", en: "daughter", tip: "女=female, 儿=child. Female child = DAUGHTER 👧 NV ER!" },
  { id: 329, char: "女人", pinyin: "nǚrén", en: "woman", tip: "女=female, 人=person. Female person = WOMAN 👩 NV REN!" },
  { id: 330, char: "爬山", pinyin: "páshān", en: "mountain climbing", tip: "爬=crawl/climb, 山=mountain. Pahaad par chadna = MOUNTAIN CLIMBING 🏔️" },
  { id: 331, char: "盘子", pinyin: "pánzi", en: "plate/dish", tip: "盘=plate/coil, 子=suffix. PAN ZI = PLATE 🍽️" },
  { id: 332, char: "旁边", pinyin: "pángbiān", en: "beside/next to", tip: "旁=side/beside, 边=side/edge. Saath wali side = BESIDE 👉 PANG BIAN!" },
  { id: 333, char: "胖", pinyin: "pàng", en: "fat/chubby", tip: "胖 = mota. PANG = 'PAUNCHY!' Body (月) + wide = FAT 🎈" },
  { id: 334, char: "跑步", pinyin: "pǎobù", en: "run/jogging", tip: "跑=run, 步=step. Running steps = RUN/JOG 🏃 PAO BU!" },
  { id: 335, char: "朋友", pinyin: "péngyou", en: "friend", tip: "朋=friend (two moons together), 友=friend. Two friends together = FRIEND 👫 PENG YOU!" },
  { id: 336, char: "啤酒", pinyin: "píjiǔ", en: "beer", tip: "啤=beer sound, 酒=alcohol. PI JIU = BEER 🍺" },
  { id: 337, char: "便宜", pinyin: "piányi", en: "cheap/inexpensive", tip: "便=convenient/easy, 宜=suitable. Easy on pocket = CHEAP 💵 PIAN YI!" },
  { id: 338, char: "票", pinyin: "piào", en: "ticket", tip: "票 = ticket. PIAO = 'PLEASE show ticket!' — concert ya train ki ticket 🎫" },
  { id: 339, char: "漂亮", pinyin: "piàoliang", en: "beautiful/pretty", tip: "漂=float/clean, 亮=bright. Water-bright = BEAUTIFUL 💄 PIAO LIANG!" },
  { id: 340, char: "苹果", pinyin: "píngguǒ", en: "apple", tip: "苹=apple plant, 果=fruit. Apple fruit = APPLE 🍎 PING GUO!" },
  { id: 341, char: "葡萄", pinyin: "pútao", en: "grape", tip: "葡萄 = angoor (transliteration). PU TAO = GRAPE 🍇 Clusters wala!" },
  { id: 342, char: "普通话", pinyin: "pǔtōnghuà", en: "Mandarin Chinese", tip: "普通=common/standard, 话=speech. Standard speech = MANDARIN 🗣️ PU TONG HUA!" },
  { id: 343, char: "七", pinyin: "qī", en: "seven", tip: "七 = saat. QI = 'KEY seven!' 7️⃣ Character mein + cross = 7" },
  { id: 344, char: "妻子", pinyin: "qīzi", en: "wife", tip: "妻=wife, 子=suffix. QI ZI = WIFE 👩 Woman with broom on head = wife (old-fashioned!) 🧹" },
  { id: 345, char: "其实", pinyin: "qíshí", en: "actually/in fact", tip: "其=that/it, 实=real. Asal mein = ACTUALLY 🤔" },
  { id: 346, char: "其他", pinyin: "qítā", en: "other/the rest", tip: "其=other, 他=he/other. Dono milke = OTHER/REST 👥" },
  { id: 347, char: "骑", pinyin: "qí", en: "ride (bike/horse)", tip: "骑 = sawari karna. QI = 'KEY' — key se gaadi chalao = RIDE 🚲" },
  { id: 348, char: "起床", pinyin: "qǐchuáng", en: "get out of bed/wake up", tip: "起=rise, 床=bed. Bistar se uthna = GET UP! 🛏️➡️🧍 QI CHUANG!" },
  { id: 349, char: "千", pinyin: "qiān", en: "thousand", tip: "千 = hazar. QIAN = 'KHAN has a THOUSAND soldiers!' ⚔️ 1000" },
  { id: 350, char: "铅笔", pinyin: "qiānbǐ", en: "pencil", tip: "铅=lead (metal), 笔=pen/brush. Lead pen = PENCIL ✏️ QIAN BI!" },
  { id: 351, char: "钱", pinyin: "qián", en: "money", tip: "钱 = paisa. QIAN = 'CHAIN of money!' 💰 Metal (钅) + coins = MONEY" },
  { id: 352, char: "前面", pinyin: "qiánmiàn", en: "front/in front of", tip: "前=front/before, 面=side/face. Aagla side = FRONT 🔛 QIAN MIAN!" },
  { id: 353, char: "清楚", pinyin: "qīngchu", en: "clear/distinct", tip: "清=clear/pure, 楚=distinct. QING CHU = crystal clear! 💎" },
  { id: 354, char: "晴", pinyin: "qíng", en: "sunny/clear (weather)", tip: "晴 = dhoop wala mausam. QING = 'CHING!' bright sun ☀️ Sun (日) + blue = SUNNY" },
  { id: 355, char: "请", pinyin: "qǐng", en: "please/invite/request", tip: "请 = please/invite. QING = 'QUEEN please!' — pleading request 🙏" },
  { id: 356, char: "请假", pinyin: "qǐngjià", en: "ask for leave", tip: "请=please/request, 假=holiday. Please mujhe chhutti do = ASK FOR LEAVE 🙏" },
  { id: 357, char: "秋", pinyin: "qiū", en: "autumn/fall", tip: "秋 = khizan. QIU = 'Queue' of leaves falling 🍂" },
  { id: 358, char: "奇怪", pinyin: "qíguài", en: "strange/weird", tip: "奇=strange/odd, 怪=weird. Ajeeb + ajeeb = STRANGE 👻 QI GUAI!" },
  { id: 359, char: "去", pinyin: "qù", en: "go/leave", tip: "去 = jaana. QU = 'CUE to go!' — jaao ➡️" },
  { id: 360, char: "去年", pinyin: "qùnián", en: "last year", tip: "去=gone/past, 年=year. Jo saal guzra = LAST YEAR 📅 QU NIAN!" },
  { id: 361, char: "裙子", pinyin: "qúnzi", en: "skirt", tip: "裙=skirt, 子=suffix. QUN ZI = skirt 👗" },
  { id: 362, char: "然后", pinyin: "ránhòu", en: "then/afterwards", tip: "然=so/then, 后=after. Tab ke baad = THEN/AFTER RAN HOU ⏭️" },
  { id: 363, char: "让", pinyin: "ràng", en: "let/allow/make (someone)", tip: "让 = karne dena. RANG = 'RANGE, let me do it!' — ijazat dena ✅" },
  { id: 364, char: "热", pinyin: "rè", en: "hot", tip: "热 = garam. RE = 'RAY of heat!' — fire (火) at bottom = HOT 🔥" },
  { id: 365, char: "热情", pinyin: "rèqíng", en: "enthusiasm/passionate", tip: "热=hot, 情=feeling. Garam feeling = ENTHUSIASM 🔥❤️" },
  { id: 366, char: "人", pinyin: "rén", en: "person/people", tip: "人 = insaan. REN = Character looks like a person walking! 🚶" },
  { id: 367, char: "认识", pinyin: "rènshi", en: "know/recognize (person)", tip: "认=recognize, 识=know. Chehra aur naam jaanna = RECOGNIZE/KNOW 🤝 REN SHI!" },
  { id: 368, char: "认为", pinyin: "rènwéi", en: "think/consider/believe", tip: "认=recognize, 为=as. Samajhna aur maanna = THINK/CONSIDER 🤔" },
  { id: 369, char: "认真", pinyin: "rènzhēn", en: "serious/earnest", tip: "认=recognize, 真=real. Sachchi cheez ko maanna = SERIOUS 😤" },
  { id: 370, char: "日", pinyin: "rì", en: "day/sun", tip: "日 = din / suraj. RI = 'RI-SE' — suraj uga = sun/day ☀️" },
  { id: 371, char: "容易", pinyin: "róngyì", en: "easy", tip: "容=contain/tolerate, 易=easy. Jo sahel ho = EASY RONG YI! 😄" },
  { id: 372, char: "如果", pinyin: "rúguǒ", en: "if/suppose", tip: "如=like/as if, 果=result. Agar aisa ho = IF RU GUO 📌" },
  { id: 373, char: "三", pinyin: "sān", en: "three", tip: "三 = teen. SAN = THREE lines! ≡ literally three horizontal strokes 3️⃣" },
  { id: 374, char: "伞", pinyin: "sǎn", en: "umbrella", tip: "伞 = chhatri. Character looks like an UMBRELLA! SAN = sun se bachao ☂️" },
  { id: 375, char: "商店", pinyin: "shāngdiàn", en: "shop/store", tip: "商=business/trade, 店=shop. Business ki jagah = SHOP 🏪 SHANG DIAN!" },
  { id: 376, char: "上", pinyin: "shàng", en: "up/on/above", tip: "上 = upar. SHANG = 'GOING UP!' — line se upar = UP ⬆️" },
  { id: 377, char: "上班", pinyin: "shàngbān", en: "go to work", tip: "上=up/go, 班=class/shift. Shift par jaana = GO TO WORK 💼 SHANG BAN!" },
  { id: 378, char: "上网", pinyin: "shàngwǎng", en: "go online/surf internet", tip: "上=up/on, 网=net. Net par jaana = INTERNET 🌐" },
  { id: 379, char: "上午", pinyin: "shàngwǔ", en: "morning/forenoon", tip: "上=before, 午=noon. Noon se pehle = MORNING 🌄 SHANG WU!" },
  { id: 380, char: "少", pinyin: "shǎo", en: "few/little/less", tip: "少 = kam/thoda. SHAO = 'SHALLOW' — kam paani = FEW 📉" },
  { id: 381, char: "谁", pinyin: "shéi", en: "who", tip: "谁 = kaun. SHEI = 'SHAY who?' — kaun hai? 🤷" },
  { id: 382, char: "身体", pinyin: "shēntǐ", en: "body/health", tip: "身=body, 体=body/health. Body + body = physical HEALTH 💪 SHEN TI!" },
  { id: 383, char: "什么", pinyin: "shénme", en: "what", tip: "什么 = kya. SHEN ME = 'SHAME, what?' — kya hua? 🤔" },
  { id: 384, char: "生病", pinyin: "shēngbìng", en: "get sick/fall ill", tip: "生=life/grow, 病=sick. Life mein bimari aana = GET SICK 🤒 SHENG BING!" },
  { id: 385, char: "生气", pinyin: "shēngqì", en: "get angry", tip: "生=life/generate, 气=air/energy. Body ki energy badh jaana = GET ANGRY 😤" },
  { id: 386, char: "生日", pinyin: "shēngrì", en: "birthday", tip: "生=birth, 日=day. Paida hone ka din = BIRTHDAY 🎂 SHENG RI!" },
  { id: 387, char: "声音", pinyin: "shēngyīn", en: "sound/voice", tip: "声=sound, 音=tone. SHENG YIN = sound energy = VOICE 🔊" },
  { id: 388, char: "十", pinyin: "shí", en: "ten", tip: "十 = das. SHI = TEN. Character looks like a cross + = 10! ✝️" },
  { id: 389, char: "时候", pinyin: "shíhou", en: "time/moment/when", tip: "时=time, 候=moment. Koi khaas waqt = TIME/WHEN ⏱️ SHI HOU!" },
  { id: 390, char: "时间", pinyin: "shíjiān", en: "time (duration)", tip: "时=time, 间=between/space. Waqt ka faasla = TIME ⏰ SHI JIAN!" },
  { id: 391, char: "使", pinyin: "shǐ", en: "cause/make/use", tip: "使 = kisi ko kuch karne par majboor karna. SHI = 'SHOVE someone to do it' = CAUSE 💪" },
  { id: 392, char: "是", pinyin: "shì", en: "is/are/was", tip: "是 = hai. SHI = 'SHE IS!' — statement confirm karna ✅" },
  { id: 393, char: "世界", pinyin: "shìjiè", en: "world", tip: "世=generation/world, 界=boundary. Duniya ki haddein = WORLD 🌍" },
  { id: 394, char: "事情", pinyin: "shìqing", en: "matter/thing/affair", tip: "事=matter/affair, 情=situation. Koi maamla = MATTER/AFFAIR 📋 SHI QING!" },
  { id: 395, char: "手表", pinyin: "shǒubiǎo", en: "watch/wristwatch", tip: "手=hand, 表=surface/show. Haath par dikhane wali = WATCH ⌚ SHOU BIAO!" },
  { id: 396, char: "手机", pinyin: "shǒujī", en: "mobile phone", tip: "手=hand, 机=machine. Haath wali machine = MOBILE PHONE 📱 SHOU JI!" },
  { id: 397, char: "瘦", pinyin: "shòu", en: "thin/slim", tip: "瘦 = patla. SHOU = 'SHOW off thin figure!' 👗" },
  { id: 398, char: "书", pinyin: "shū", en: "book", tip: "书 = kitaab. SHU = 'SHOW me the book!' 📖" },
  { id: 399, char: "舒服", pinyin: "shūfu", en: "comfortable/at ease", tip: "舒=stretch out, 服=clothing/serve. Aaram se phailna = COMFORTABLE 😌" },
  { id: 400, char: "叔叔", pinyin: "shūshu", en: "uncle (father's younger brother)", tip: "叔=uncle. SHU SHU = SHOO SHOO, chacha aa rahe hain! 👨" },
  { id: 401, char: "树", pinyin: "shù", en: "tree", tip: "树 = darakht. SHU = 'SHOE' tree — Wood (木) + special = TREE 🌳" },
  { id: 402, char: "数学", pinyin: "shùxué", en: "mathematics", tip: "数=number/count, 学=study. Numbers padhna = MATHS ➕➖" },
  { id: 403, char: "刷牙", pinyin: "shuāyá", en: "brush teeth", tip: "刷=brush, 牙=tooth. Daanton ko brush karna 🪥" },
  { id: 404, char: "双", pinyin: "shuāng", en: "pair/double/both", tip: "双 = joda. Two birds (隹) = PAIR 🦅🦅" },
  { id: 405, char: "水", pinyin: "shuǐ", en: "water", tip: "水 = paani. SHUI = 'SHOE in water!' 💧 Character looks like flowing water!" },
  { id: 406, char: "水果", pinyin: "shuǐguǒ", en: "fruit", tip: "水=water, 果=fruit. Water fruit = FRUIT 🍎🍊 SHUI GUO!" },
  { id: 407, char: "水平", pinyin: "shuǐpíng", en: "level/standard", tip: "水=water, 平=flat. Water is always level = STANDARD 📊" },
  { id: 408, char: "睡觉", pinyin: "shuìjiào", en: "sleep", tip: "睡=sleep, 觉=feel/sense. So jaana = SLEEP 😴 SHUI JIAO!" },
  { id: 409, char: "说话", pinyin: "shuōhuà", en: "speak/talk", tip: "说=speak, 话=speech/words. Bolna = SPEAK 💬 SHUO HUA!" },
  { id: 410, char: "司机", pinyin: "sījī", en: "driver", tip: "司=manage/operate, 机=machine. Machine chalane wala = DRIVER 🚗" },
  { id: 411, char: "四", pinyin: "sì", en: "four", tip: "四 = chaar. SI = 'SEE four corners!' 4️⃣ Character like a box with inside line = 4" },
  { id: 412, char: "送", pinyin: "sòng", en: "give/send/deliver", tip: "送 = dena/bhejna. SONG = 'SONG as a gift!' — kisi ko kuch dena/deliver karna 🎁" },
  { id: 413, char: "虽然", pinyin: "suīrán", en: "although/even though", tip: "虽=although, 然=so/thus. SUI RAN = 'SUE WRONG, but although...' — lekin/agarche 🔄" },
  { id: 414, char: "岁", pinyin: "suì", en: "years old/age", tip: "岁 = saal ki umar. SUI = 'SWEET 16!' — age/years 🎂" },
  { id: 415, char: "所以", pinyin: "suǒyǐ", en: "therefore/so", tip: "所=place/therefore, 以=use. Is liye = THEREFORE 🔗 SUO YI!" },
  { id: 416, char: "他", pinyin: "tā", en: "he/him", tip: "他 = woh (mard). TA = 'THE HE!' — person (人) with standing posture = HE 👨" },
  { id: 417, char: "她", pinyin: "tā", en: "she/her", tip: "她 = woh (aurat). TA = 'THE SHE!' — woman (女) = SHE 👩" },
  { id: 418, char: "它", pinyin: "tā", en: "it (thing/animal)", tip: "它 = woh (cheez). TA = 'THAT thing!' — non-human object 📦" },
  { id: 419, char: "太", pinyin: "tài", en: "too/excessively/very", tip: "太 = bahut/zyada. TAI = 'TIE too tight!' — zyada zyada! ❗" },
  { id: 420, char: "太阳", pinyin: "tàiyáng", en: "sun", tip: "太=very/great, 阳=sunny/yang. Bahut bada roshan = SUN ☀️ TAI YANG!" },
  { id: 421, char: "糖", pinyin: "táng", en: "sugar/candy", tip: "糖 = cheeni / mithai. TANG = 'TANG drink is sugary!' 🍬 Rice + extra = SWEET" },
  { id: 422, char: "特别", pinyin: "tèbié", en: "especially/special", tip: "特=special, 别=other. Khaas alag = ESPECIALLY 🌟" },
  { id: 423, char: "疼", pinyin: "téng", en: "hurt/ache/pain", tip: "疼 = dard. TENG = 'STING!' — chubhne wala dard 🩹" },
  { id: 424, char: "踢足球", pinyin: "tīzúqiú", en: "play football/soccer", tip: "踢=kick, 足=foot, 球=ball. Paon se ball maarna = PLAY FOOTBALL ⚽" },
  { id: 425, char: "题", pinyin: "tí", en: "topic/question/problem", tip: "题 = sawaal/topic. TI = 'THE question!' — exam ka sawaal 📝" },
  { id: 426, char: "提高", pinyin: "tígāo", en: "improve/raise/enhance", tip: "提=lift/raise, 高=high. Upar uthana = IMPROVE ⬆️" },
  { id: 427, char: "体育", pinyin: "tǐyù", en: "sports/physical education", tip: "体=body, 育=educate. Jism ki taleem = SPORTS/PE 🏃" },
  { id: 428, char: "天气", pinyin: "tiānqì", en: "weather", tip: "天=sky/day, 气=air/energy. Sky ka mood = WEATHER 🌤️ TIAN QI!" },
  { id: 429, char: "甜", pinyin: "tián", en: "sweet", tip: "甜 = meetha. TIAN = 'TIAN = candy sound!' 🍬 Tongue (舌) + sweet = SWEET" },
  { id: 430, char: "条", pinyin: "tiáo", en: "strip/long thin (measure word)", tip: "条 = patli cheez. TIAO = long thin strip 🐟" },
  { id: 431, char: "跳舞", pinyin: "tiàowǔ", en: "dance", tip: "跳=jump, 舞=dance. Uchhal uchhal ke nachna = DANCE 💃 TIAO WU!" },
  { id: 432, char: "听", pinyin: "tīng", en: "listen/hear", tip: "听 = sunna. TING = 'TING!' — bell ki awaaz suno 🔔 Ear listening!" },
  { id: 433, char: "同事", pinyin: "tóngshì", en: "colleague/coworker", tip: "同=same/together, 事=work. Ek kaam karne wale = COLLEAGUE 👥" },
  { id: 434, char: "同学", pinyin: "tóngxué", en: "classmate", tip: "同=same, 学=study. Saath padhne wale = CLASSMATE 🎒 TONG XUE!" },
  { id: 435, char: "同意", pinyin: "tóngyì", en: "agree/consent", tip: "同=same/agree, 意=intention. Ek hi rai hona = AGREE 👍" },
  { id: 436, char: "头发", pinyin: "tóufa", en: "hair (on head)", tip: "头=head, 发=grow/hair. Sar par ugne wale = HAIR 💇" },
  { id: 437, char: "突然", pinyin: "tūrán", en: "suddenly/all of a sudden", tip: "突=sudden/rush out, 然=thus. Achanak bahir aana = SUDDENLY 💥" },
  { id: 438, char: "图书馆", pinyin: "túshūguǎn", en: "library", tip: "图=picture/map, 书=book, 馆=building. Kitaabon ki building = LIBRARY 📚🏛️" },
  { id: 439, char: "腿", pinyin: "tuǐ", en: "leg", tip: "腿 = tang. Body (月) + long part = LEG 🦵" },
  { id: 440, char: "外", pinyin: "wài", en: "outside/abroad/foreign", tip: "外 = bahar. WAI = 'WAY outside!' — bahar ki duniya 🌏" },
  { id: 441, char: "完", pinyin: "wán", en: "finish/complete/run out", tip: "完 = khatam hona. WAN = 'WANNA finish!' — ho gaya = DONE ✅" },
  { id: 442, char: "完成", pinyin: "wánchéng", en: "complete/accomplish", tip: "完=finish, 成=accomplish. Pura kar lena = COMPLETE ✅" },
  { id: 443, char: "玩", pinyin: "wán", en: "play/have fun", tip: "玩 = khalna. WAN = 'WAN to play!' — khel kood 🎮" },
  { id: 444, char: "碗", pinyin: "wǎn", en: "bowl", tip: "碗 = pyala. WAN = 'WON TON soup BOWL' 🍜" },
  { id: 445, char: "晚上", pinyin: "wǎnshang", en: "evening/night", tip: "晚=late/evening, 上=on/period. Shaam ka waqt = EVENING 🌙 WAN SHANG!" },
  { id: 446, char: "万", pinyin: "wàn", en: "ten thousand (10,000)", tip: "万 = das hazar. WAN = 10,000! 💰 Wan = a LOT of things" },
  { id: 447, char: "忘记", pinyin: "wàngjì", en: "forget", tip: "忘=forget, 记=remember. WANG JI = 'WANG forgot!' 🤦" },
  { id: 448, char: "喂", pinyin: "wèi", en: "hello (phone)/hey!", tip: "喂 = hello (phone par). WEI = 'HEY!' when calling someone 📞" },
  { id: 449, char: "为", pinyin: "wèi", en: "for (purpose)/because of", tip: "为 = ke liye. WEI = 'WHY?' — Kisi ke LIYE kaam karna 🎯" },
  { id: 450, char: "为了", pinyin: "wèile", en: "in order to/for the purpose of", tip: "为=for, 了=done. Kisi cheez ke LIYE = IN ORDER TO ➡️" },
  { id: 451, char: "为什么", pinyin: "wèishénme", en: "why", tip: "为=why, 什么=what. WEI SHEN ME = WHY?? 🤷 Kyon?" },
  { id: 452, char: "位", pinyin: "wèi", en: "position/polite measure (people)", tip: "位 = izzatdar jagah/insaan. WEI = honorific for people. 两位 = two people (politely) 🧑" },
  { id: 453, char: "文化", pinyin: "wénhuà", en: "culture", tip: "文=writing/culture, 化=transform. Tehzeeb aur writing = CULTURE 🎭" },
  { id: 454, char: "问", pinyin: "wèn", en: "ask/inquire", tip: "问 = puchhna. WEN = 'WEN? When? asking!' — knock (门) on door to ask ❓" },
  { id: 455, char: "问题", pinyin: "wèntí", en: "question/problem", tip: "问=ask, 题=topic. Puchhe gaye sawaal = QUESTION/PROBLEM ❓ WEN TI!" },
  { id: 456, char: "我", pinyin: "wǒ", en: "I/me", tip: "我 = main. WO = 'WOKE' = I am awake! First person = ME 🙋" },
  { id: 457, char: "我们", pinyin: "wǒmen", en: "we/us", tip: "我=I, 们=plural marker. WO MEN = US/WE 👥" },
  { id: 458, char: "五", pinyin: "wǔ", en: "five", tip: "五 = paanch. WU = 'FIVE' — cross shape + = 5️⃣" },
  { id: 459, char: "西", pinyin: "xī", en: "west", tip: "西 = maghrib. XI = birds nesting in west at sunset 🌇 Xi'an is western China!" },
  { id: 460, char: "西瓜", pinyin: "xīguā", en: "watermelon", tip: "西=west, 瓜=melon. Western melon = WATERMELON 🍉 XI GUA!" },
  { id: 461, char: "希望", pinyin: "xīwàng", en: "hope/wish", tip: "希=hope/rare, 望=look forward. Umeed se dekhna = HOPE 🌟 XI WANG!" },
  { id: 462, char: "习惯", pinyin: "xíguàn", en: "habit/be used to", tip: "习=practice/habit, 惯=accustomed. Aadat padna = HABIT 🔄" },
  { id: 463, char: "洗", pinyin: "xǐ", en: "wash/clean", tip: "洗 = dhona. XI = 'WASH-EE!' — water (氵) + feet = WASH 🚿" },
  { id: 464, char: "洗手间", pinyin: "xǐshǒujiān", en: "restroom/bathroom", tip: "洗=wash, 手=hand, 间=room. Haath dhone ka kamra = RESTROOM 🚻" },
  { id: 465, char: "洗澡", pinyin: "xǐzǎo", en: "take a bath/shower", tip: "洗=wash, 澡=bathe. Nahaana = BATH 🛁 XI ZAO!" },
  { id: 466, char: "喜欢", pinyin: "xǐhuan", en: "like/enjoy", tip: "喜=joy/happy, 欢=joyful. Khushi wali cheez = LIKE 😍 XI HUAN!" },
  { id: 467, char: "下", pinyin: "xià", en: "down/under/below", tip: "下 = neecha. XIA = 'LOWER!' — line ke neeche = DOWN ⬇️" },
  { id: 468, char: "下午", pinyin: "xiàwǔ", en: "afternoon", tip: "下=after, 午=noon. Noon ke baad = AFTERNOON 🌤️ XIA WU!" },
  { id: 469, char: "下雨", pinyin: "xiàyǔ", en: "rain/it's raining", tip: "下=fall/come down, 雨=rain. Paani gir raha hai = RAINING 🌧️ XIA YU!" },
  { id: 470, char: "夏", pinyin: "xià", en: "summer", tip: "夏 = garmi. XIA = 'SIZZLE-A' = garmi mein sizzle ☀️🥵" },
  { id: 471, char: "先", pinyin: "xiān", en: "first/before/earlier", tip: "先 = pehle. XIAN = 'SCENE' — pehle scene set karo = FIRST 1️⃣" },
  { id: 472, char: "先生", pinyin: "xiānsheng", en: "Mr./sir/husband", tip: "先=first, 生=born/life. XIAN SHENG = first born = educated sir = MR. 👨‍💼" },
  { id: 473, char: "现在", pinyin: "xiànzài", en: "now/at present", tip: "现=present/appear, 在=at. Ab yahan = NOW 📍 XIAN ZAI!" },
  { id: 474, char: "香蕉", pinyin: "xiāngjiāo", en: "banana", tip: "香=fragrant, 蕉=plantain. Mehakta hua fruit = BANANA 🍌 XIANG JIAO!" },
  { id: 475, char: "相同", pinyin: "xiāngtóng", en: "identical/the same", tip: "相=mutual/same, 同=same. Bilkul ek jaisa = IDENTICAL 🟰 XIANG TONG!" },
  { id: 476, char: "相信", pinyin: "xiāngxìn", en: "believe/trust", tip: "相=mutual, 信=trust. Ek doosre par bharosa = BELIEVE 🙏" },
  { id: 477, char: "想", pinyin: "xiǎng", en: "think/want/miss", tip: "想 = sochna/chaahna. XIANG = 'THINK-ANG!' — heart (心) + tree thinking = THINK 💭" },
  { id: 478, char: "向", pinyin: "xiàng", en: "towards/in direction of", tip: "向 = ki taraf. XIANG = 'ANGLE towards' — kisi taraf mujhna 🎯" },
  { id: 479, char: "像", pinyin: "xiàng", en: "resemble/like/similar to", tip: "像 = jaisa. XIANG = 'SAME IMAGE' — kisi jaisi dikhna = RESEMBLE 🪞" },
  { id: 480, char: "小", pinyin: "xiǎo", en: "small/little/young", tip: "小 = chhota. XIAO = 'SHOW small!' — beech mein dot + two sides = SMALL 🔹" },
  { id: 481, char: "小姐", pinyin: "xiǎojiě", en: "Miss/young woman", tip: "小=young, 姐=sister. Young woman = MISS 👩 XIAO JIE!" },
  { id: 482, char: "小时", pinyin: "xiǎoshí", en: "hour", tip: "小=small, 时=time. Small unit of time = HOUR ⏰ XIAO SHI!" },
  { id: 483, char: "小心", pinyin: "xiǎoxīn", en: "be careful/watch out", tip: "小=small, 心=heart. Chhote dil se kaam lo = BE CAREFUL ⚠️" },
  { id: 484, char: "笑", pinyin: "xiào", en: "laugh/smile", tip: "笑 = hansna. XIAO = 'HEE-HEE!' — bamboo (竹) swaying = happy, laughing 😄" },
  { id: 485, char: "校长", pinyin: "xiàozhǎng", en: "principal/headmaster", tip: "校=school, 长=head. School ka mukhi = PRINCIPAL 👨‍💼" },
  { id: 486, char: "些", pinyin: "xiē", en: "some/a few", tip: "些 = kuch/thore. XIE = 'SHAY some!' — thora kuch 🔢" },
  { id: 487, char: "鞋", pinyin: "xié", en: "shoes/footwear", tip: "鞋 = joote. XIE = 'SHAY! My shoes!' 👟 Leather skin + shape = SHOES" },
  { id: 488, char: "写", pinyin: "xiě", en: "write", tip: "写 = likhna. XIE = 'WRITE-AY!' 🖊️ Cover (冖) + feather-pen below = WRITE" },
  { id: 489, char: "谢谢", pinyin: "xièxie", en: "thank you", tip: "谢=thank. XIE XIE = shukriya! 🙏 Repeat = lots of thanks!" },
  { id: 490, char: "新", pinyin: "xīn", en: "new/fresh", tip: "新 = naya. XIN = 'SHEEN of new!' — naya chamakta hua ✨" },
  { id: 491, char: "新闻", pinyin: "xīnwén", en: "news", tip: "新=new, 闻=hear/smell. Nai baat sunna = NEWS 📰" },
  { id: 492, char: "新鲜", pinyin: "xīnxiān", en: "fresh", tip: "新=new, 鲜=fresh. Naya aur taaza = FRESH 🌿" },
  { id: 493, char: "信", pinyin: "xìn", en: "letter/trust/believe", tip: "信 = khat / bharosa. XIN = 'SINCERE trust' — person (人) + speech = trustworthy letter ✉️" },
  { id: 494, char: "星期", pinyin: "xīngqī", en: "week", tip: "星=star, 期=period. Star period = WEEK 📅 XING QI!" },
  { id: 495, char: "行李箱", pinyin: "xínglixiāng", en: "suitcase/luggage case", tip: "行李=luggage, 箱=box. Safar ka saaman = SUITCASE 🧳" },
  { id: 496, char: "姓", pinyin: "xìng", en: "surname/family name", tip: "姓 = khandaan ka naam. XING = 'SING your surname!' — family name 👪" },
  { id: 497, char: "兴趣", pinyin: "xìngqù", en: "interest/hobby", tip: "兴=mood/interest, 趣=interest/fun. Dilchaspi = INTEREST 🎯 XING QU!" },
  { id: 498, char: "熊猫", pinyin: "xióngmāo", en: "panda", tip: "熊=bear, 猫=cat. Bear-cat = PANDA 🐼 XIONG MAO!" },
  { id: 499, char: "休息", pinyin: "xiūxi", en: "rest/take a break", tip: "休=rest (person leaning on tree), 息=rest/breathe. Person on tree = REST 😌 XIU XI!" },
  { id: 500, char: "需要", pinyin: "xūyào", en: "need/require", tip: "需=need/require, 要=want. XU YAO = 'YOU need' = NEED 📌" },
  { id: 501, char: "选择", pinyin: "xuǎnzé", en: "choose/choice/select", tip: "选=select/choose, 择=choose carefully. XUAN ZE = choose! 🗳️" },
  { id: 502, char: "学生", pinyin: "xuésheng", en: "student", tip: "学=study, 生=born/person. Padhne wala insaan = STUDENT 🎒 XUE SHENG!" },
  { id: 503, char: "学习", pinyin: "xuéxí", en: "study/learn", tip: "学=study, 习=practice. Padhna aur practice karna = STUDY 📚 XUE XI!" },
  { id: 504, char: "学校", pinyin: "xuéxiào", en: "school", tip: "学=study, 校=school. Padhne ki jagah = SCHOOL 🏫 XUE XIAO!" },
  { id: 505, char: "雪", pinyin: "xuě", en: "snow", tip: "雪 = barf. XUE = 'SHOE in snow!' — Rain (雨) + feather-like = SNOW ❄️" },
  { id: 506, char: "颜色", pinyin: "yánsè", en: "colour/color", tip: "颜=appearance/color, 色=color. Rang = COLOR 🎨 YAN SE!" },
  { id: 507, char: "眼镜", pinyin: "yǎnjìng", en: "glasses/spectacles", tip: "眼=eye, 镜=mirror/lens. Eye mirrors = GLASSES 👓 YAN JING!" },
  { id: 508, char: "眼睛", pinyin: "yǎnjing", en: "eye/eyes", tip: "眼=eye, 睛=pupil/clear eye. EYE + pupil = EYES 👁️ YAN JING!" },
  { id: 509, char: "羊肉", pinyin: "yángròu", en: "mutton/lamb meat", tip: "羊=goat/sheep, 肉=meat. Bakre ka gosht = MUTTON 🍖 YANG ROU!" },
  { id: 510, char: "要求", pinyin: "yāoqiú", en: "requirement/demand", tip: "要=want/require, 求=request. Demand karna = REQUIREMENT 📋" },
  { id: 511, char: "药", pinyin: "yào", en: "medicine/drug", tip: "药 = dawa. YAO = 'YOW! Medicine!' — grass (艹) + tree = herbal MEDICINE 💊" },
  { id: 512, char: "要", pinyin: "yào", en: "want/will/need to", tip: "要 = chaahna/chahiye. YAO = 'YO! I want!' — need or will 💬" },
  { id: 513, char: "爷爷", pinyin: "yéye", en: "grandpa (paternal)", tip: "爷=grandfather. YE YE = dada abbu. 'YAY!' to grandpa 👴" },
  { id: 514, char: "也", pinyin: "yě", en: "also/too/either", tip: "也 = bhi. YE = 'YA ME TOO!' — main bhi = ALSO 🙋" },
  { id: 515, char: "一", pinyin: "yī", en: "one", tip: "一 = ek. YI = ONE stroke = literally 1! ➖" },
  { id: 516, char: "衣服", pinyin: "yīfu", en: "clothes/clothing", tip: "衣=garment, 服=clothing/serve. Kapde = CLOTHES 👗 YI FU!" },
  { id: 517, char: "医生", pinyin: "yīshēng", en: "doctor/physician", tip: "医=medicine, 生=life/person. Medical person = DOCTOR 👨‍⚕️ YI SHENG!" },
  { id: 518, char: "医院", pinyin: "yīyuàn", en: "hospital", tip: "医=medicine, 院=courtyard/institution. Medical institution = HOSPITAL 🏥 YI YUAN!" },
  { id: 519, char: "一定", pinyin: "yídìng", en: "definitely/certainly", tip: "一=one, 定=fixed. Ek fixed baat = DEFINITELY ✅" },
  { id: 520, char: "一共", pinyin: "yígòng", en: "altogether/in total", tip: "一=one, 共=together. Sab milake ek = TOTAL ∑" },
  { id: 521, char: "一会儿", pinyin: "yíhuìr", en: "a while/a moment", tip: "一=one, 会=moment. Ek chhota waqt = A WHILE ⏱️" },
  { id: 522, char: "一样", pinyin: "yíyàng", en: "same/alike/equal", tip: "一=one, 样=appearance. Ek jaisi shakal = SAME 🟰" },
  { id: 523, char: "以后", pinyin: "yǐhòu", en: "after/later/in the future", tip: "以=from, 后=after. Is ke baad = AFTER/LATER ⏭️ YI HOU!" },
  { id: 524, char: "以前", pinyin: "yǐqián", en: "before/previously/in the past", tip: "以=from, 前=before. Pehle se = BEFORE ⏪" },
  { id: 525, char: "以为", pinyin: "yǐwéi", en: "think/mistakenly believe", tip: "以=use/think, 为=as. Galti se samajhna = MISTAKENLY THINK 🤦 YI WEI!" },
  { id: 526, char: "已经", pinyin: "yǐjīng", en: "already", tip: "已=already, 经=pass. Pehle se ho chuka = ALREADY ✅ YI JING!" },
  { id: 527, char: "椅子", pinyin: "yǐzi", en: "chair", tip: "椅=chair (wood+lean), 子=suffix. Lakdi ki sandali = CHAIR 🪑 YI ZI!" },
  { id: 528, char: "一般", pinyin: "yìbān", en: "ordinary/generally/usually", tip: "一=one, 般=kind/sort. Aam qism = ORDINARY 📊" },
  { id: 529, char: "一边", pinyin: "yìbiān", en: "one side/while doing", tip: "一=one, 边=side. Ek taraf / karte huye = ONE SIDE/WHILE 🔄" },
  { id: 530, char: "一起", pinyin: "yìqǐ", en: "together", tip: "一=one, 起=rise/together. Milke uthna = TOGETHER 🤝 YI QI!" },
  { id: 531, char: "一直", pinyin: "yìzhí", en: "always/all along/straight", tip: "一=one, 直=straight. Seedha chalte rehna = ALWAYS ➡️" },
  { id: 532, char: "意思", pinyin: "yìsi", en: "meaning/idea", tip: "意=meaning/intention, 思=think. Soch ka matlab = MEANING 💭 YI SI!" },
  { id: 533, char: "阴", pinyin: "yīn", en: "cloudy/overcast/yin", tip: "阴 = abr wala mausam. YIN = gloomy/cloudy — 'Yin and yang' ☁️" },
  { id: 534, char: "因为", pinyin: "yīnwèi", en: "because/since", tip: "因=cause/because, 为=for/because. Is liye = BECAUSE 🔗 YIN WEI!" },
  { id: 535, char: "音乐", pinyin: "yīnyuè", en: "music", tip: "音=sound, 乐=joy/music. Khushi bhari awaazain = MUSIC 🎵" },
  { id: 536, char: "银行", pinyin: "yínháng", en: "bank", tip: "银=silver, 行=establishment. Chandi ka adara = BANK 🏦" },
  { id: 537, char: "应该", pinyin: "yīnggāi", en: "should/ought to", tip: "应=should/respond, 该=should. YING GAI = 'you GOTTA do it' = SHOULD 👆" },
  { id: 538, char: "影响", pinyin: "yǐngxiǎng", en: "influence/affect", tip: "影=shadow/image, 响=sound/affect. Shadow effect = INFLUENCE 🌑" },
  { id: 539, char: "用", pinyin: "yòng", en: "use/utilize", tip: "用 = istemaal karna. YONG = USE it 🔧" },
  { id: 540, char: "游戏", pinyin: "yóuxì", en: "game", tip: "游=play/travel, 戏=play/drama. Play + drama = GAME 🎮" },
  { id: 541, char: "游泳", pinyin: "yóuyǒng", en: "swim/swimming", tip: "游=roam/swim, 泳=swim. YOU YONG = swimming! 🏊 Water flowing = SWIM" },
  { id: 542, char: "有", pinyin: "yǒu", en: "have/there is", tip: "有 = hona/paas hona. YOU = 'YOU have!' — hath mein kuch hai 🤲" },
  { id: 543, char: "有名", pinyin: "yǒumíng", en: "famous/well-known", tip: "有=have, 名=name. Naam hona = FAMOUS 🌟" },
  { id: 544, char: "又", pinyin: "yòu", en: "again/also/and", tip: "又 = phir/bhi. YOU = 'YOU AGAIN!' — dobara 🔄" },
  { id: 545, char: "右边", pinyin: "yòubian", en: "right side", tip: "右=right side, 边=side/edge. Dahni taraf = RIGHT SIDE 👉 YOU BIAN!" },
  { id: 546, char: "鱼", pinyin: "yú", en: "fish", tip: "鱼 = machhli. YU = 'YOU fish!' 🐟 Character looks like fish with fins and tail!" },
  { id: 547, char: "遇到", pinyin: "yùdào", en: "encounter/meet by chance", tip: "遇=encounter, 到=arrive. Achanak milna = ENCOUNTER 🤝" },
  { id: 548, char: "元", pinyin: "yuán", en: "yuan (Chinese currency)", tip: "元 = yuan (paisa). YUAN = Chinese money 💴" },
  { id: 549, char: "远", pinyin: "yuǎn", en: "far/distant", tip: "远 = door. YUAN = 'YEARNING from afar' — door jagah 🌄" },
  { id: 550, char: "愿意", pinyin: "yuànyì", en: "be willing/want to", tip: "愿=wish/willing, 意=intention. Dil se chaahna = BE WILLING 💙" },
  { id: 551, char: "月", pinyin: "yuè", en: "month/moon", tip: "月 = chaand/maheena. YUE = 'YOU-AY moon!' 🌙 Character looks like crescent moon!" },
  { id: 552, char: "月亮", pinyin: "yuèliang", en: "moon (in sky)", tip: "月=moon, 亮=bright. Chamakta hua chaand = MOON 🌙" },
  { id: 553, char: "越", pinyin: "yuè", en: "the more...the more", tip: "越 = jitna zyada. YUE = 'MORE' — 越来越好 = better and BETTER 📈" },
  { id: 554, char: "云", pinyin: "yún", en: "cloud", tip: "云 = badal. YUN = 'YUM clouds!' ☁️ Character like wavy cloud shape!" },
  { id: 555, char: "运动", pinyin: "yùndòng", en: "exercise/sport/movement", tip: "运=move/transport, 动=move. Movement = EXERCISE/SPORT 🏃 YUN DONG!" },
  { id: 556, char: "在", pinyin: "zài", en: "at/in/exist", tip: "在 = mein/par (location). ZAI = 'ZAP! I'm AT this place!' 📍" },
  { id: 557, char: "再", pinyin: "zài", en: "again/once more", tip: "再 = phir/dobara. ZAI = 'ZAP again!' — dobara karna 🔄" },
  { id: 558, char: "再见", pinyin: "zàijiàn", en: "goodbye/see you again", tip: "再=again, 见=see. Phir milenge = GOODBYE 👋 ZAI JIAN!" },
  { id: 559, char: "早上", pinyin: "zǎoshang", en: "morning/early morning", tip: "早=early/morning, 上=upper period. Subah sawere = MORNING 🌅 ZAO SHANG!" },
  { id: 560, char: "怎么", pinyin: "zěnme", en: "how/why/what's wrong", tip: "怎=how, 么=suffix. ZEN ME = 'THEN HOW?' — kaise? 🤔" },
  { id: 561, char: "怎么样", pinyin: "zěnmeyàng", en: "how about/what's it like", tip: "怎么=how, 样=appearance. Kaisa lagta hai = WHAT'S IT LIKE? 🤷 ZEN ME YANG!" },
  { id: 562, char: "站", pinyin: "zhàn", en: "stand/station/stop", tip: "站 = khada rehna / station. ZHAN = STAND. Station par khare raho 🚉" },
  { id: 563, char: "张", pinyin: "zhāng", en: "measure word for flat things", tip: "张 = flat cheez ginne ka word. ZHANG = sheets of paper 📄" },
  { id: 564, char: "长", pinyin: "zhǎng", en: "grow/senior/head of", tip: "长=grow/long. ZHANG = grow up! 🌱 Senior position = CHIEF/HEAD" },
  { id: 565, char: "丈夫", pinyin: "zhàngfu", en: "husband", tip: "丈=husband/10 feet, 夫=man/husband. Strong man = HUSBAND 👨 ZHANG FU!" },
  { id: 566, char: "着急", pinyin: "zháojí", en: "be anxious/worried", tip: "着=attached/burning, 急=urgent. Jaldi + pareshani = ANXIOUS 😰" },
  { id: 567, char: "找", pinyin: "zhǎo", en: "look for/seek/find", tip: "找 = dhundhna. ZHAO = 'SHOW me!' — kuch dhundhna 🔍" },
  { id: 568, char: "照顾", pinyin: "zhàogù", en: "look after/take care of", tip: "照=shine/look, 顾=care. Roshan nazar rakhna = TAKE CARE OF 👀💙" },
  { id: 569, char: "照片", pinyin: "zhàopiàn", en: "photo/photograph", tip: "照=reflect/photo, 片=flat piece. Tasveer = PHOTO 📷" },
  { id: 570, char: "照相机", pinyin: "zhàoxiàngjī", en: "camera", tip: "照=photo, 相=image, 机=machine. Photo machine = CAMERA 📸" },
  { id: 571, char: "这", pinyin: "zhè", en: "this", tip: "这 = yeh. ZHE = 'THE this!' — qareeb wali cheez 👉" },
  { id: 572, char: "这儿", pinyin: "zhèr", en: "here", tip: "这=this, 儿=suffix. ZHE R = 'HERE!' — yahan 📍" },
  { id: 573, char: "着", pinyin: "zhe", en: "ongoing action particle (-ing)", tip: "着 = karte huye (-ing). ZHE = progressive marker. 穿着 = wearing (right now) 🔄" },
  { id: 574, char: "真", pinyin: "zhēn", en: "really/truly/genuine", tip: "真 = sacchi. ZHEN = 'GENUINE truth!' — sach mein ✅ Upright person = TRUE" },
  { id: 575, char: "正在", pinyin: "zhèngzài", en: "in the process of (-ing)", tip: "正=correct/in progress, 在=at. Ab isi waqt ho raha = CURRENTLY DOING 🔄 ZHENG ZAI!" },
  { id: 576, char: "知道", pinyin: "zhīdào", en: "know/be aware of", tip: "知=know, 道=way/know. Maloom hona = KNOW 💡 ZHI DAO!" },
  { id: 577, char: "只", pinyin: "zhī/zhǐ", en: "measure word (animals)/only", tip: "只 = janwar ginne ka / sirf. ZHI = 'SEE just ONE' animal or 'ONLY' one 🐕" },
  { id: 578, char: "中国", pinyin: "zhōngguó", en: "China", tip: "中=middle/center, 国=country. Middle Kingdom = CHINA 🇨🇳 ZHONG GUO!" },
  { id: 579, char: "中间", pinyin: "zhōngjiān", en: "middle/between", tip: "中=middle, 间=space/between. Beech mein = MIDDLE 🎯" },
  { id: 580, char: "中午", pinyin: "zhōngwǔ", en: "noon/midday", tip: "中=middle, 午=noon. Din ka beech = NOON ☀️ ZHONG WU!" },
  { id: 581, char: "终于", pinyin: "zhōngyú", en: "finally/at last", tip: "终=end/final, 于=at. Akhir mein = FINALLY 🎉" },
  { id: 582, char: "种", pinyin: "zhǒng", en: "type/species/seed", tip: "种=type/seed. ZHONG = 'GENRE' = TYPE/KIND 🌱" },
  { id: 583, char: "重要", pinyin: "zhòngyào", en: "important", tip: "重=heavy/important, 要=need. Bhaari zaroori = IMPORTANT ⭐" },
  { id: 584, char: "周末", pinyin: "zhōumò", en: "weekend", tip: "周=week, 末=end. Hafte ka aakhri = WEEKEND 🎉" },
  { id: 585, char: "住", pinyin: "zhù", en: "live/reside/stay", tip: "住 = rehna. ZHU = 'ZOO! live here!' — kisi jagah rehna 🏠" },
  { id: 586, char: "祝", pinyin: "zhù", en: "wish/express good wishes", tip: "祝 = dua dena. ZHU = 'JOO wish you well!' 🎂 Birthday wish! 🎊" },
  { id: 587, char: "注意", pinyin: "zhùyì", en: "pay attention/be careful", tip: "注=pour/focus, 意=intention. Dhyan dena = PAY ATTENTION 👁️" },
  { id: 588, char: "准备", pinyin: "zhǔnbèi", en: "prepare/get ready", tip: "准=accurate/prepare, 备=prepare. Tayyar hona = PREPARE 🎯 ZHUN BEI!" },
  { id: 589, char: "桌子", pinyin: "zhuōzi", en: "table/desk", tip: "桌=table (wood+high), 子=suffix. Lakdi ki unchi cheez = TABLE 🪑 ZHUO ZI!" },
  { id: 590, char: "字", pinyin: "zì", en: "character/word/letter", tip: "字 = haroof/lafz. ZI = 'ZEE character!' — written word under roof 📝" },
  { id: 591, char: "字典", pinyin: "zìdiǎn", en: "dictionary", tip: "字=character, 典=classic reference. Characters ki reference = DICTIONARY 📖" },
  { id: 592, char: "自己", pinyin: "zìjǐ", en: "oneself/yourself/myself", tip: "自=self/from, 己=self. ZI JI = apna aap 🙋" },
  { id: 593, char: "自行车", pinyin: "zìxíngchē", en: "bicycle", tip: "自=self, 行=travel, 车=vehicle. Apne aap chalne wali gaadi = BICYCLE 🚲" },
  { id: 594, char: "总是", pinyin: "zǒngshì", en: "always/invariably", tip: "总=always/total, 是=is. Hamesha = ALWAYS 🔄" },
  { id: 595, char: "走", pinyin: "zǒu", en: "walk/go/leave", tip: "走 = chalna. ZOU = 'ZOOM walk!' — paon se chalna 🚶" },
  { id: 596, char: "最", pinyin: "zuì", en: "most/least (superlative)", tip: "最 = sab se. ZUI = 'ZU-EE most!' — sab se zyada ⭐" },
  { id: 597, char: "最近", pinyin: "zuìjìn", en: "recently/lately", tip: "最=most, 近=close/near. Sab se qareeb waqt = RECENTLY 📅" },
  { id: 598, char: "昨天", pinyin: "zuótiān", en: "yesterday", tip: "昨=yesterday, 天=day. Guzra hua din = YESTERDAY 📅 ZUO TIAN!" },
  { id: 599, char: "左边", pinyin: "zuǒbian", en: "left side", tip: "左=left, 边=side. Bayin taraf = LEFT SIDE 👈 ZUO BIAN!" },
  { id: 600, char: "坐", pinyin: "zuò", en: "sit/take (transport)", tip: "坐 = baithna. ZUO = 'ZO sit down!' — two people on earth = SIT 🪑" },
  { id: 601, char: "做", pinyin: "zuò", en: "do/make/cook", tip: "做 = karna/banana. ZUO = 'DO it!' — action word 💪" },
  { id: 602, char: "作业", pinyin: "zuòyè", en: "homework/assignment", tip: "作=make/do, 业=work/course. Ghar par kaam karna = HOMEWORK 📝" },
  { id: 603, char: "作用", pinyin: "zuòyòng", en: "effect/function/role", tip: "作=action/make, 用=use. Jo kaam kare = EFFECT/FUNCTION ⚙️ ZUO YONG!" },
  { id: 604, char: "主要", pinyin: "zhǔyào", en: "main/major/principal", tip: "主=master/main, 要=need. Asli zaroori = MAIN/MAJOR 🔑" },
];

const TIPS_URDU = [
  { emoji: "🧩", title: "Radicals Yaad Karo", body: "Har character components (radicals) se bana hota hai. Maslan 氵= paani, 木 = lakdi, 口 = muh, 女 = aurat. Ek baar radicals yaad ho jaayein, naye characters khud samajh mein aane lagte hain!" },
  { emoji: "✍️", title: "Likhte Likhte Seekho", body: "Sirf dekhne se yaad nahi hoga. Har character 10-20 baar likhna zaroori hai. Haath ka muscular memory banta hai — exam mein akhud nikal aata hai!" },
  { emoji: "📸", title: "Character Ki Tasveer Soch", body: "Har character mein ek shape/picture dekho. 山=pahaad (3 chuntiyan), 木=darakht, 口=muh, 日=suraj, 鱼=machhli (character jaisi shape!). Jo picture aaye — yaad rehti hai!" },
  { emoji: "🎵", title: "Tones Ke Saath Seekho", body: "Sirf character nahi, pinyin tones bhi zaroor yaad rakho. 1st tone = flat (ā), 2nd = rising (á), 3rd = dip-rise (ǎ), 4th = falling (à). Tones ke bina Chinese ulti ho jaati hai!" },
  { emoji: "🔗", title: "Groups Mein Seekho", body: "Related characters saath yaad karo: Body parts ek session mein (鼻子, 耳朵, 脚, 腿, 头发, 眼睛), directions ek mein (东南西北), seasons ek mein (春夏秋冬). Groups mein zyada yaad rehta hai!" },
  { emoji: "📅", title: "Roz 30-40 Characters", body: "Ek din mein sab nahi! Ab 600 words hain, roz 30-40 karo. Phir next day pehle wale review karo, phir naye. 3 hafton mein sab hoge InshaAllah! Spaced repetition = best technique!" },
  { emoji: "🃏", title: "Flashcard Test Karo", body: "Sirf character dekho — meaning guess karo. Peeche flip karo. Sahi to ✅ pile, galat to ❌ pile. Galat wale dobara karo jab tak ✅ na ho jaaye!" },
  { emoji: "🗣️", title: "Zor Se Bolo", body: "Character dekhte waqt ZOR SE pinyin + meaning bolo. 'Bǐsài — MATCH!' Awaaz se padhne par dimagh zyada yaad karta hai!" },
  { emoji: "🔍", title: "Particles Sikhlo (de/le/zhe/guo)", body: "的(de), 了(le), 着(zhe), 过(guo) — ye 4 grammar particles har jagah aate hain. 的=ka/ki, 了=ho gaya, 着=ho raha hai, 过=experience hua. Inhe ZAROORI pakka karo!" },
  { emoji: "📊", title: "Measure Words Pakke Karo", body: "Chinese mein har cheez ka alag ginnay wala word hai: 个(ge)=log/cheezain, 本(ben)=kitabain, 张(zhang)=kaghaz, 辆(liang)=gaadiyaan, 只(zhi)=janwar, 条(tiao)=patli cheezain. Ye HSK3 mein zaroor aate hain!" },
];

export default function HSK3App() {
  const [view, setView] = useState("home");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizResult, setQuizResult] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [studyList, setStudyList] = useState(hsk3Words);

  useEffect(() => {
    let list = hsk3Words;
    if (filter === "unknown") list = hsk3Words.filter(w => unknown.has(w.id));
    else if (filter === "known") list = hsk3Words.filter(w => known.has(w.id));
    setStudyList(list.length > 0 ? list : hsk3Words);
    setCurrentIdx(0);
    setFlipped(false);
  }, [filter, known, unknown]);

  const currentWord = studyList[currentIdx];

  const generateOptions = useCallback((word) => {
    const others = hsk3Words.filter(w => w.id !== word.id);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const all = [...shuffled, word].sort(() => Math.random() - 0.5);
    setQuizOptions(all);
    setQuizAnswer("");
    setQuizResult(null);
  }, []);

  useEffect(() => {
    if (view === "quiz" && currentWord) generateOptions(currentWord);
  }, [view, currentIdx, currentWord, generateOptions]);

  const next = () => { setFlipped(false); setCurrentIdx(i => (i + 1) % studyList.length); };
  const prev = () => { setFlipped(false); setCurrentIdx(i => (i - 1 + studyList.length) % studyList.length); };

  const markKnown = () => {
    setKnown(s => new Set([...s, currentWord.id]));
    setUnknown(s => { const n = new Set(s); n.delete(currentWord.id); return n; });
    next();
  };
  const markUnknown = () => {
    setUnknown(s => new Set([...s, currentWord.id]));
    setKnown(s => { const n = new Set(s); n.delete(currentWord.id); return n; });
    next();
  };

  const checkQuiz = (opt) => {
    setQuizAnswer(opt.char);
    setQuizResult(opt.id === currentWord.id);
  };

  const filtered = hsk3Words.filter(w =>
    w.char.includes(searchTerm) ||
    w.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progress = Math.round((known.size / hsk3Words.length) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#f5e6d3",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #8b0000 0%, #c41e3a 50%, #8b0000 100%)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(196,30,58,0.5)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>🐉</span>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "2px" }}>HSK 3 MASTER</div>
            <div style={{ fontSize: "11px", opacity: 0.8 }}>604 Characters • یاد کرو</div>
          </div>
        </div>
        <div style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: "20px",
          padding: "4px 12px",
          fontSize: "13px",
          fontWeight: 700,
        }}>
          ✅ {known.size}/604
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: "4px", background: "#1a1a1a" }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #c41e3a, #ff6b6b)",
          transition: "width 0.5s",
        }} />
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "12px 16px", flexWrap: "wrap" }}>
        {[
          { id: "home", label: "🏠 Tips" },
          { id: "flashcard", label: "🃏 Flashcards" },
          { id: "quiz", label: "🎯 Quiz" },
          { id: "list", label: "📋 List" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setView(tab.id)} style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: view === tab.id ? "2px solid #ff6b6b" : "2px solid #3a1a1a",
            background: view === tab.id ? "linear-gradient(135deg, #c41e3a, #8b0000)" : "rgba(255,255,255,0.05)",
            color: "#f5e6d3",
            fontWeight: view === tab.id ? 700 : 400,
            cursor: "pointer",
            fontSize: "14px",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ padding: "16px 16px 80px" }}>

        {/* HOME - TIPS */}
        {view === "home" && (
          <div>
            <div style={{
              textAlign: "center",
              padding: "20px",
              marginBottom: "20px",
              background: "linear-gradient(135deg, rgba(196,30,58,0.2), rgba(139,0,0,0.1))",
              borderRadius: "16px",
              border: "1px solid rgba(196,30,58,0.3)",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "8px" }}>📚</div>
              <h2 style={{ margin: "0 0 8px", fontSize: "22px", fontWeight: 900 }}>Chinese Characters Kese Yaad Karen?</h2>
              <p style={{ margin: 0, opacity: 0.8, fontSize: "14px" }}>PDF se complete 604 characters — sab tips Roman Urdu mein</p>
            </div>
            {TIPS_URDU.map((tip, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(196,30,58,0.3)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                display: "flex",
                gap: "14px",
              }}>
                <div style={{ fontSize: "32px", flexShrink: 0 }}>{tip.emoji}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "15px", color: "#ff9999", marginBottom: "4px" }}>{tip.title}</div>
                  <div style={{ fontSize: "13px", lineHeight: 1.6, opacity: 0.9 }}>{tip.body}</div>
                </div>
              </div>
            ))}
            <div style={{
              background: "linear-gradient(135deg, rgba(196,30,58,0.3), rgba(139,0,0,0.2))",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid rgba(196,30,58,0.5)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "24px", fontWeight: 900, color: "#ff6b6b", marginBottom: "8px" }}>🎯 3-Week Study Plan (604 words)</div>
              <div style={{ fontSize: "13px", lineHeight: 1.9, opacity: 0.9 }}>
                <b>Week 1:</b> Words 1–200 (roz 28-30, likhna + flashcards)<br />
                <b>Week 2:</b> Words 201–400 (roz 28-30, likhna + flashcards)<br />
                <b>Week 3 Day 1-4:</b> Words 401–604<br />
                <b>Week 3 Day 5-7:</b> Quiz mode + unknown pile focus<br />
                <b>Har roz 30 min minimum — likhna zaroor!</b>
              </div>
            </div>
          </div>
        )}

        {/* FLASHCARD VIEW */}
        {view === "flashcard" && currentWord && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              {[
                { key: "all", label: `Sab (604)` },
                { key: "unknown", label: `❌ Mushkil (${unknown.size})` },
                { key: "known", label: `✅ Yaad (${known.size})` },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: filter === f.key ? "2px solid #ff6b6b" : "2px solid #3a1a1a",
                  background: filter === f.key ? "rgba(196,30,58,0.4)" : "rgba(255,255,255,0.05)",
                  color: "#f5e6d3",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: filter === f.key ? 700 : 400,
                }}>{f.label}</button>
              ))}
            </div>

            <div style={{ textAlign: "center", fontSize: "13px", opacity: 0.6, marginBottom: "12px" }}>
              #{currentWord.id} • {currentIdx + 1} / {studyList.length}
            </div>

            <div onClick={() => setFlipped(!flipped)} style={{
              background: flipped
                ? "linear-gradient(135deg, #1a3a1a, #0a2a0a)"
                : "linear-gradient(135deg, #1a0a0a, #3a1010)",
              border: `2px solid ${flipped ? "#2a6a2a" : "#c41e3a"}`,
              borderRadius: "20px",
              padding: "40px 24px",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
              boxShadow: flipped ? "0 0 30px rgba(0,200,0,0.2)" : "0 0 30px rgba(196,30,58,0.3)",
              marginBottom: "16px",
            }}>
              {!flipped ? (
                <>
                  <div style={{ fontSize: "80px", lineHeight: 1.1, marginBottom: "8px", textShadow: "0 0 20px rgba(255,100,100,0.5)" }}>
                    {currentWord.char}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginTop: "16px" }}>
                    👆 Tap karo — meaning dekhne ke liye
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "44px", marginBottom: "8px", opacity: 0.6 }}>{currentWord.char}</div>
                  <div style={{ fontSize: "22px", color: "#88ff88", fontWeight: 700, marginBottom: "4px" }}>{currentWord.pinyin}</div>
                  <div style={{ fontSize: "17px", color: "#fff", fontWeight: 600, marginBottom: "16px" }}>{currentWord.en}</div>
                  <div style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontSize: "13px",
                    color: "#ffd700",
                    lineHeight: 1.6,
                    maxWidth: "320px",
                  }}>
                    💡 {currentWord.tip}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "12px" }}>
              <button onClick={prev} style={{ padding: "12px 20px", borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", color: "#f5e6d3", cursor: "pointer", fontSize: "18px" }}>⬅️</button>
              <button onClick={markUnknown} style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #8b0000, #c41e3a)", color: "white", cursor: "pointer", fontWeight: 700, fontSize: "14px" }}>❌ Yaad Nahi</button>
              <button onClick={markKnown} style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #006400, #228b22)", color: "white", cursor: "pointer", fontWeight: 700, fontSize: "14px" }}>✅ Yaad Hai!</button>
              <button onClick={next} style={{ padding: "12px 20px", borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", color: "#f5e6d3", cursor: "pointer", fontSize: "18px" }}>➡️</button>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => { setCurrentIdx(Math.floor(Math.random() * studyList.length)); setFlipped(false); }} style={{
                padding: "10px 20px", borderRadius: "10px", border: "1px solid #3a1a1a",
                background: "rgba(255,255,255,0.05)", color: "#f5e6d3", cursor: "pointer", fontSize: "13px",
              }}>🔀 Random</button>
            </div>
          </div>
        )}

        {/* QUIZ VIEW */}
        {view === "quiz" && currentWord && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", opacity: 0.6 }}>Character #{currentWord.id} — {currentIdx + 1}/{studyList.length}</div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #1a0a0a, #3a1010)",
              border: "2px solid #c41e3a",
              borderRadius: "20px",
              padding: "40px 24px",
              textAlign: "center",
              marginBottom: "24px",
              boxShadow: "0 0 30px rgba(196,30,58,0.3)",
            }}>
              <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "12px" }}>Is character ka matlab kya hai?</div>
              <div style={{ fontSize: "90px", lineHeight: 1, textShadow: "0 0 20px rgba(255,100,100,0.5)" }}>{currentWord.char}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
              {quizOptions.map(opt => (
                <button key={opt.id} onClick={() => !quizAnswer && checkQuiz(opt)} style={{
                  padding: "16px 12px",
                  borderRadius: "12px",
                  border: quizAnswer
                    ? opt.id === currentWord.id ? "2px solid #88ff88"
                      : quizAnswer === opt.char ? "2px solid #ff4444"
                      : "2px solid #3a1a1a"
                    : "2px solid #3a1a1a",
                  background: quizAnswer
                    ? opt.id === currentWord.id ? "rgba(0,150,0,0.3)"
                      : quizAnswer === opt.char ? "rgba(150,0,0,0.3)"
                      : "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.06)",
                  color: "#f5e6d3",
                  cursor: quizAnswer ? "default" : "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                  textAlign: "left",
                }}>
                  <div style={{ fontSize: "22px", fontWeight: 800 }}>{opt.char}</div>
                  <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "4px" }}>{opt.pinyin}</div>
                  {quizAnswer && <div style={{ fontSize: "12px", color: opt.id === currentWord.id ? "#88ff88" : "#ff8888", marginTop: "4px" }}>{opt.en}</div>}
                </button>
              ))}
            </div>

            {quizAnswer && (
              <div style={{
                background: quizResult ? "rgba(0,150,0,0.2)" : "rgba(150,0,0,0.2)",
                border: `2px solid ${quizResult ? "#88ff88" : "#ff4444"}`,
                borderRadius: "12px",
                padding: "14px 16px",
                marginBottom: "16px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "20px", marginBottom: "6px" }}>{quizResult ? "✅ Sahi! Shabaash!" : "❌ Galat!"}</div>
                {!quizResult && (
                  <div style={{ fontSize: "14px", opacity: 0.9 }}>
                    Sahi jawab: <b>{currentWord.char}</b> = {currentWord.en} ({currentWord.pinyin})
                  </div>
                )}
                <div style={{ fontSize: "12px", color: "#ffd700", marginTop: "8px" }}>💡 {currentWord.tip}</div>
              </div>
            )}

            {quizAnswer && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => {
                  setCurrentIdx(i => (i + 1) % studyList.length);
                  setQuizAnswer("");
                  setQuizResult(null);
                }} style={{
                  padding: "14px 40px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #c41e3a, #8b0000)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "16px",
                }}>Agla Character ➡️</button>
              </div>
            )}
          </div>
        )}

        {/* LIST VIEW */}
        {view === "list" && (
          <div>
            <input
              placeholder="🔍 Dhundho: character, pinyin, ya English..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #3a1a1a",
                background: "rgba(255,255,255,0.07)",
                color: "#f5e6d3",
                fontSize: "14px",
                marginBottom: "16px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "12px" }}>{filtered.length} characters mile</div>
            {filtered.map(word => (
              <div key={word.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: known.has(word.id) ? "rgba(0,100,0,0.15)" : unknown.has(word.id) ? "rgba(100,0,0,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${known.has(word.id) ? "rgba(0,200,0,0.2)" : unknown.has(word.id) ? "rgba(200,0,0,0.2)" : "rgba(255,255,255,0.07)"}`,
                marginBottom: "6px",
              }}>
                <div style={{ fontSize: "11px", opacity: 0.4, width: "28px", flexShrink: 0 }}>#{word.id}</div>
                <div style={{ fontSize: "26px", fontWeight: 700, flexShrink: 0, width: "52px", textAlign: "center" }}>{word.char}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", color: "#88ff88" }}>{word.pinyin}</div>
                  <div style={{ fontSize: "13px", opacity: 0.9 }}>{word.en}</div>
                </div>
                <div>{known.has(word.id) ? "✅" : unknown.has(word.id) ? "❌" : ""}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
