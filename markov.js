/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** Pick random choice from array */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
     return this.words.map((word, index, wordAry) => {
      return {[word] : [wordAry[index + 1] || null]}

     }).reduce((chains, word ) => {
      let key = Object.keys(word)[0]
      let value = word[key][0]

      if (Array.isArray(chains[key])) {
        chains[key].push(value);
      } else {
        chains[key] = [value];
      }
      // this.chains = chains;
      // console.log("this.chains: ", this.chains)
      return chains
    }, {});

   }


  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Object.keys(this.chains)
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains[key]);
    }

    return out.join(" ");
  }


}

// const text = "the cat in the hat is in the hat";
// const markovChain = new MarkovMachine(text)
// // const mChain = markovChain.makeChains()
// const textOutput = markovChain.makeText();
// console.log(textOutput)



module.exports = {
  MarkovMachine,
};
