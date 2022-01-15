const targets = {}

export const TeleportTarget = {
  name: 'TeleportTarget',
  data: () => ({ children: [] }),
  props: {
    name: { type: String, required: true },
  },
  created () {
    if (this.name in targets) throw new Error(`TeleportTarget: duplicate name ${this.name}`)
    targets[this.name] = this
  },
  beforeDestroy () {
    delete targets[this.name]
    if (this.children.length > 0) throw new Error(`TeleportTarget: ${this.name} beforeDestroy but still has children mounted`)
  },
  render (h) {
    return h('div', this.children.map(vm => vm.$slots.default || []).flat())
  },
}

export const Teleport = {
  name: 'Teleport',
  props: {
    to: { type: String, required: true },
  },
  mounted () {
    if (!(this.to in targets)) throw new Error(`Teleport: non-existent target ${this.to}`)
    targets[this.to].children.push(this)
  },
  beforeDestroy () {
    if (!(this.to in targets)) throw new Error(`Teleport: non-existent target ${this.to} on unmount`)
    const children = targets[this.to].children
    children.splice(children.indexOf(this), 1)
  },
  render: h => h('span'),
}