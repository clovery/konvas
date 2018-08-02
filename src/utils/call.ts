export default function(methods: any, method: string, data?: any) {
  if (method in methods) {
    methods[method](data, methods.type, methods.el)
  }
}
