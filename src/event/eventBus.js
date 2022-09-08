export default class OnFire {
  static ver = '__VERSION__'

  es = {}

  on(eventName, cb, once) {
    if (!this.es[eventName]) {
      this.es[eventName] = []
    }

    this.es[eventName].push({
      cb,
      once,
    })
  }

  once(eventName, cb) {
    this.on(eventName, cb, true)
  }

  fire(eventName, ...params) {
    const listeners = this.es[eventName] || []
    let l = listeners.length

    for (let i = 0; i < l; i++) {
      const { cb, once } = listeners[i]

      cb.apply(this, params)
      if (once) {
        listeners.splice(i, 1)
        i--
        l--
      }
    }
  }

  off(eventName, cb) {
    if (eventName === undefined) {
      this.es = {}
    } else {
      if (cb === undefined) {
        delete this.es[eventName]
      } else {
        const listeners = this.es[eventName] || []
        let l = listeners.length
        for (let i = 0; i < l; i++) {
          if (listeners[i].cb === cb) {
            listeners.splice(i, 1)
            i--
            l--
          }
        }
      }
    }
  }

  emit = this.fire
}

export const BusService = new OnFire()
console.log(BusService)
