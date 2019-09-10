class Person {
    constructor (name, age = 0) {
        this.name = name;
        this.age = age;
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
}


class Student extends Person{
    constructor(name, age, major){
        super(name, age);
        this.major = major;
    }

    hasMajor() {
        return !!this.major;
    }


    getDescription() {
        let description = super.getDescription();

        if(this.hasMajor()){
            description += ` Their major is ${this.major}`;
        }
        return description;
    }

}

class Traveler extends Person{

    constructor(name, age, homeLocation) { 
        super(name, age);
        this.homeLocation = homeLocation;
    }

    hasLocation() {
        return !!this.homeLocation;
    }

    getDescription(){
        let location = super.getDescription();

        if(this.hasLocation()){
            location += ` I am visiting from ${this.homeLocation}`;
        }
        return location;
    }



}



const me = new Traveler ('Simon', 25, 'Sydney');
console.log(me.getDescription());