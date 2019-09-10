
const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
};

console.log(getFirstName('Mike Smith'));

const getFirName = (fullName) =>fullName.split(' ')[0];
console.log(getFirName('Mike Smith'));

const multiplier = {
    numbers : [1,2,3],
    multiplyBy : 2,
    multiply(){
      return this.numbers.map((numbers) => this.multiplyBy*numbers);
    }
};

console.log(multiplier.multiply())