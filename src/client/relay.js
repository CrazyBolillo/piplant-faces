import {get, post, put, destroy} from "./client";

export const RelayClient = {
    list: () => get('relays'),
    create: options => post('relay', options),
    update: (pin, options) => put('relay/' + pin, options),
    delete: pin => destroy('relay/' + pin),
    turnOn: pin => post(`relay/${pin}/on`),
    turnOff: pin => post(`relay/${pin}/off`)
}