/**
 * Mark pair character
 * PairMarker aim to mark pair string as a single sentence.
 *
 * For example, Following sentence has two period(。). but it should treat a single sentence
 *
 * > I hear "I'm back to home." from radio.
 *
 * https://ja.wikipedia.org/wiki/%E6%8B%AC%E5%BC%A7
 */
/**
 * @typedef {{key:string,start:string,end:string}[]} PairMark
 */
const PAIR_MARKS = [
    {
        key: "英文双引号\"\"",
        start: `"`,
        end: `"`
    },
    {
        key: "中括号[]",
        start: `[`,
        end: `]`
    },
    {
        key: "英文圆括号()",
        start: `(`,
        end: `)`
    },
    {
        key: "大括号{}",
        start: `{`,
        end: `}`
    },
    {
        key: "汉字半括号「」",
        start: `「`,
        end: `」`
    },
    {
        key: "中日文括号（）",
        start: `（`,
        end: `）`
    },
    {
        key: "空心汉字半括号『』",
        start: `『`,
        end: `』`
    },
    {
        key: "全角大括号｛｝",
        start: `｛`,
        end: `｝`
    },
    {
        key: "全角中括号［］",
        start: `［`,
        end: `］`
    },
    {
        key: "空心方头括号〚〛",
        start: `〚`,
        end: `〛`
    },
    {
        key: "全角角括号〈〉",
        start: `〈`,
        end: `〉`
    },
    {
        key: "六角括号〔〕",
        start: `〔`,
        end: `〕`
    },
    {
        key: "实心方头括号【】",
        start: `【`,
        end: `】`
    }
];

// For readme
// console.log(PAIR_MARKS.map(pair => `- ${pair.key}: \`${pair.start}\` and \`${pair.end}\``).join("\n"));
export class PairMaker {
    mark(sourceCode) {
        const string = sourceCode.read();
        if (!string) {
            return;
        }
        // if current is in a context, should not start other context.
        // PairMaker does not support nest context by design.
        if (sourceCode.isInContext()) {
            // check that string is end mark?
            const pair = PAIR_MARKS.find(pair => pair.end === string);
            if (pair) {
                sourceCode.leaveContext(pair);
            }
        } else {
            const pair = PAIR_MARKS.find(pair => pair.start === string);
            if (pair) {
                sourceCode.enterContext(pair);
            }
        }
    }
}
