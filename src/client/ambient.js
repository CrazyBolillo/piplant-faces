import { get } from './config'

export const AmbientClient = {
    read: () => get('ambient')
}