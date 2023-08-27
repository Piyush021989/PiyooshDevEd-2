import { LightningElement,api } from 'lwc';
import LightningModal from 'lightning/modal';


export default class LigtningModalOverLay extends LightningModal {
    handleOkay() {
        this.close('okay');
    }
}