import Image from './image'
import Text from './text'

const Painters: any = {
  text: Text,
  image: Image
}

export default {
  get(type: string) {
    return Painters[type]
  }
}
