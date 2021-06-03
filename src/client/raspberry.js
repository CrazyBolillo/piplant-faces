import { get } from './config'

export const RaspberryClient = {
    read_cpu: () => get('raspberry/cpu'),
    read_disk: () => get('raspberry/disk')
}