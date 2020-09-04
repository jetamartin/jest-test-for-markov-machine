const { MarkovMachine } = require('./markov.js')

let text, markovChain, mChain
beforeAll(() => {
  console.log("Create Markov Chain before calling tests")
  text = "the cat in the hat is in the hat";
  markovChain = new MarkovMachine(text)
  mChain = markovChain.makeChains()
})

describe('Test that makeChains produces a correct chain', () => {

   function occurances(arr) {
    return arr.reduce((obj, item) => {
      obj[item] = (obj[item] || 0) + 1;
      return obj;
     }, {});
  }
  
  test('Chain produced has the right number of keys', ()=> {
    let numKeys = Object.keys(mChain).length
    let uniqueWords = [...new Set(markovChain.words)];
    expect(uniqueWords.length).toBe(numKeys)
  } )

  test("# of array elements in a single chain's value should equal # of times the word appears in the text", () => {
    // For example 'the" appears 3 times in the input text so therefore it's chain element would have a value with 3 words in it: {the : ['cat', 'hat', 'hat']}

    const wordCount = occurances(markovChain.words)
  
    for (const [key, value] of Object.entries(wordCount)) {
       expect(mChain[key].length).toEqual(value)
    }
   })

  test("the chain element for the last word should include the null value", () => {
    const lastWord = markovChain.words[markovChain.words.length - 1]
    const nullPresent = mChain[lastWord].includes(null)

    expect(nullPresent).toBeTruthy();

  });

})

  describe('Test that text produced by makeText() is valid', () => {
    test("Last word in the generated is the last word in the input text", () => {

      const lastWordInInputText = markovChain.words[markovChain.words.length - 1]
      const markovText = markovChain.makeText();
      const markovWordArray = markovText.split(/[ \r\n]+/);
      const lastWordInMarkovText = markovWordArray[markovWordArray.length-1]
      expect(lastWordInInputText).toEqual(lastWordInMarkovText)
  
    });


    // Make sure that text generated contains <= number of words specified (i.e., numWords)
    test("Total words in makeText output is <= length specified in makeText(numWords) parameter", () => {
      const numWords = 3
      const markovText = markovChain.makeText(numWords);
      const markovTextWordArray = markovText.split(/[ \r\n]+/);
      expect(markovTextWordArray.length).toBeLessThanOrEqual(numWords)

    });

    // Make sure that text generated doesn't include any words that were not in the original text
    test("Make sure generated Markov text only includes words that were part of original input text..no extraneous words added", () => {

      const markovText = markovChain.makeText();
      const markovTextWordArray = markovText.split(/[ \r\n]+/);
      const inputTextArray = text.split(/[ \r\n]+/);

      const isFoundInInputText = (currentValue) => inputTextArray.includes(currentValue);
      
      expect(isFoundInInputText).toBeTruthy()

    })
 



  })


