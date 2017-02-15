import { Converter } from 'showdown'

const converter = new Converter()
converter.setOption('tables', true)
converter.setOption('strikethrough', true)
export default converter
