import { LightningElement,api } from 'lwc';
import LightningModal from 'lightning/modal';


export default class LigtningModalOverLay extends LightningElement {
    handleOkay() {
        this.close('okay');
    }
}