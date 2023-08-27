import { LightningElement,track } from 'lwc';
export default class BmiCalculator extends LightningElement {
    cardTitle = "BMI Calculator";
    /*height;
    weight;
    bmi;*/

    //Array and Object are the Non-Primitive data  and it is used with the @track decorator
    @track bmiData = { 
        height :0,
        weight :0,
        results : 0
    }

    weightHandler(event){
          this.bmiData.weight =  parseFloat(event.target.value);
    }

    heightHandler(event){
        this.bmiData.height = parseFloat(event.target.value);
    }

    bmiCalculator(){
        this.bmiData.results = this.bmiData.weight/(this.bmiData.height*this.bmiData.height);
    }

    get bmiValue(){
        if(this.bmiData.results === undefined){
            return "";
        }
        return `The Calculated BMI is ${this.bmiData.results}`;
    }

}