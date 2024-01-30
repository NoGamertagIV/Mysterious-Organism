// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  function pAequorFactory(specimenNum, dna) {
    return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length)
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
     },
     compareDNA(otherPAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === otherPAequor.dna[i]) {
          identicalBases++
        }
      }
      const percentage = (identicalBases / this.dna.length) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.}`);
     },
     willLikelySurvive() {
      const cgCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      const survivalRate = cgCount / this.dna.length;
      return survivalRate >= 0.6;
     }
    };
  }
  
  const survivablePAequor = [];
  let id = 1;
  while (survivablePAequor.length < 30) {
    let newOrganism = pAequorFactory(id, mockUpStrand());
    if(newOrganism.willLikelySurvive()) {
      survivablePAequor.push(newOrganism);
      console.log(`Organism #${id} added. Survival liklihood:`, newOrganism.willLikelySurvive());
      
      id++;
    }
  }
  
  const organism1 = pAequorFactory (1, mockUpStrand());
  console.log(organism1.dna);
  const organism2 = pAequorFactory (2, mockUpStrand());
  console.log(organism2.dna)
  organism1.compareDNA(organism2);
  