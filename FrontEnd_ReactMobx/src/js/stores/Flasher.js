import { extendObservable, action } from 'mobx'

class Flasher {
    constructor(time) {
        extendObservable(this, {
            message: ''
        })
        this.time = time
        this.style =''
    }

    flash = action((msg, style) => {
        this.message = msg
        this.style = style
        setTimeout(action(() => {
            this.message = ''
        }), this.time)
    })
}

const flasher = new Flasher(2000)
export default flasher
