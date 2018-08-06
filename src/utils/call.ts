export default function(methods: any, method: string, data?: any) {
  if (method in methods) {
    methods[method](data, methods.type, methods.el)
  }
}

export function _call(methods: any, method: string, a?: any, b?: any, c?: any) {
  if (typeof methods === 'object' && method in methods) {
    methods[method](a, b, c)
  }
}
