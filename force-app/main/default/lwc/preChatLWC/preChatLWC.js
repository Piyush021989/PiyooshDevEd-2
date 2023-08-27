import BasePrechat from 'lightningsnapin/basePrechat';
import { api, track, wire } from 'lwc';
import PreChaFormCSS from "@salesforce/resourceUrl/preChatCSS";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import { LightningElement } from 'lwc';


export default class PreChatLWC extends BasePrechat {

    @api prechatFields;
    fields;
    namelist;
    navigateTo;
    FName;
    LName;
    Phonenumber;
    EmailId;
    Contactreason;
    isCaptchaValidated;
    errorMessage;
    error;
    isPreHolidayMessage;
    brand;
    autofocus;



    constructor() {
    super();
    //this.isCaptchaValidated = false;
    this.errorMessage = '';
    }


    get showPreChatForm() {
        return true;
    }

    connectedCallback() {

        /*  loadScript(this, CaptchaScript).then(() => {
            // your code with calls to the JS library
            //for reCAPTCHA V2
            document.addEventListener("grecaptchaVerified", function(e) {
                this.isCaptchaValidated = true;
                //Disabled server validation for now
                verifyRecaptcha({
                        record: null, //TODO: map UI fields to sobject
                        recaptchaResponse: e.detail.response
                    })
                    .then(result => {
                        //document.dispatchEvent(new Event("grecaptchaReset"));
                        if (result === 'Success - v2') {
                            this.isCaptchaValidated = true;
                        }
                        //alert(result);
                    })
                    .catch(error => {
                        console.log('ERROR: ' + this.error);
                    });
            }.bind(this));
            //for reCAPTCHA V2

        });*/

        this.fields = this.prechatFields.map(field => {
            const { label, name, value, required, maxLength } = field;
            return { label, name, value, required, maxLength };
        });
        this.namelist = this.fields.map(field => field.name);
        console.log('@@PRECHAT FIELDS: ' + JSON.stringify(this.fields));
    }


    //Focus on the first input after this component renders.
    renderedCallback() {
        console.log('Inside the renderedCallback');
        Promise.all([
            loadStyle(this, PreChaFormCSS),
        ]).then(() => { });
        
        if (!this.inputFocused) {
            let lightningInputElement = this.template.querySelector("lightning-input");
            if (lightningInputElement) {
                lightningInputElement.focus();
                this.inputFocused = true;
            };
        }

        /* //for reCAPTCHA V2
        var divElement = this.template.querySelector('div.recaptchaCheckbox');
        //valide values for badge: bottomright bottomleft inline
        var payload = { element: divElement, badge: 'bottomright' };
        document.dispatchEvent(new CustomEvent("grecaptchaRender", { "detail": payload }));
        //for reCAPTCHA V2*/
    }

    get options() {
        return [
        { label: 'Please Select', value: '' },
        { label: 'Search Inventory', value: 'Search Inventory' },
        { label: 'Pricing', value: 'Pricing' },
        { label: 'Trade-in', value: 'Trade-in' },
        { label: 'Service & Protection Plan', value: 'Service & Protection Plan' },
        { label: 'Accessories', value: 'Accessories' },
        { label: 'Test Drive', value: 'Test Drive' },
        { label: 'Schedule Home Delivery', value: 'Schedule Home Delivery' },
        { label: 'Other', value: 'Other' }
        ];
    }

    handleChange(event) {
        const field = event.target.name;
        if (field === 'fstname') {
            this.FName = event.target.value;
        } else if (field === 'lstname') {
            this.LName = event.target.value;
        } else if (field === 'Phone') {
            this.Phonenumber = event.target.value;
        } else if (field === 'Email') {
            this.EmailId = event.target.value;
        } else if (field === 'ReasonForContact') {
            this.Contactreason = event.target.value;
        }

        let preChatEvent = new CustomEvent(
            "setCustomField", {
            detail: {
                customFieldName: event.target.name, // we can get the name of the field with this key
                customFieldValue: event.target.value // the literal value as provided in the field
            }
        }
        );
        document.dispatchEvent(preChatEvent);
    }


    handleStartChat(event) {

        this.getRemoteContact(this.fields);
    }

    getRemoteContact(fields) {

        if (this.formValidate()) {
            this.startChat(fields);
        }

    }

    formValidate() {
        console.log('inside formvalidate');
       // return true;
        this.fields.forEach(field => {
            if (field.name === 'fstName') {
                field.value = this.FName;
            } else if (field.name === 'lstName') {
                field.value = this.LName;
            } else if (field.name === 'Email') {
                field.value = this.EmailId;
            }
        });

        //Validate all input fields & dropdown
        let inputElements = this.template.querySelectorAll("lightning-input");
        let inputCombobox = this.template.querySelectorAll("lightning-combobox");
        if (inputElements &&
            this.checkInputValidity(inputElements) &&
            inputCombobox &&
            this.checkInputValidity(inputCombobox)) {
            //console.log('@@IS VALID');
            //this.startChat(this.fields);
            return true;
        }
        return false;
    }


    checkInputValidity(inputElements) {
        const allValid = [...inputElements].reduce(
            (validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
        return allValid;
    }

    get startChatLabel() {
        // return 'Start Chat with an Agent';
        return 'Start Chat With An Agent';
    }
}