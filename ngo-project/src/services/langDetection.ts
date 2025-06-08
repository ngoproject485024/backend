import * as XRegExp from 'xregexp';

export default async (text : any)=> {
  // split into words
  const langs = text.trim().split(/\s+/).map(word => {
    return detect(word)
  })
  // pick the lang with the most occurances
  return (langs || []).reduce( ( acc, el ) => {
    acc.k[el] = acc.k[el] ? acc.k[el] + 1 : 1
    acc.max = acc.max ? acc.max < acc.k[el] ? el : acc.max : el
    return acc  
  }, { k:{} }).max


  function detect(text) {
    const scores = {}
    // https://en.wikipedia.org/wiki/Unicode_block
    // http://www.regular-expressions.info/unicode.html#script
    const regexes = {
      // en: /[a-zA-Z]+/gi,
      en: XRegExp('\\p{Latin}', 'gi'),
      zh: XRegExp('\\p{Han}', 'gi'),
      hi: XRegExp('\\p{Devanagari}', 'gi'),
      ar: XRegExp('\\p{Arabic}', 'gi'),
      bn: XRegExp('\\p{Bengali}', 'gi'),
      he: XRegExp('\\p{Hebrew}', 'gi'),
      ru: XRegExp('\\p{Cyrillic}', 'gi'),
      jp: XRegExp('[\\p{Hiragana}\\p{Katakana}]', 'gi'),
      pa: XRegExp('\\p{Gurmukhi}', 'gi')
    }
    
    for (const [lang, regex] of Object.entries(regexes)) {
      // detect occurances of lang in a word
      let matches = XRegExp.match(text, regex) || []
      let score = matches.length / text.length
      if (score) {
        // high percentage, return result
        if (score > 0.85) {
          return lang
        }
        scores[lang] = score
      }
    }
    // not detected
    if (Object.keys(scores).length == 0)
      return null
    // pick lang with highest percentage
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  }
}