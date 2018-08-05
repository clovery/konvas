import event from '../event'

export interface ISetGetter {
  klass: string
  layout: any
  get: (a: string) => any
  set: (type: string| any, val?: string | number) => void
}

const layoutSetGetter: ISetGetter = {
  klass: '',
  layout: {},
  set(type: string | object | any, val?: string | number) {
    if (typeof type === 'string') {
      this.layout[type] = val
    }
    if (typeof type === 'object') {
      for (const t in type) {
        if (type[t]) {
          this.layout[t] = type[t]
        }
      }
    }

    event.emit(`${this.klass}.change`, this.layout)
  },

  get(type: string) {
    return this.layout[type]
  }
}

export default layoutSetGetter
