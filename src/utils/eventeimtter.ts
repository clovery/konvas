import * as EventEmitter from 'eventemitter3'

export interface IEventEmitter {
  [key: string]: any
}
const ee = EventEmitter as IEventEmitter

export default ee['default']
