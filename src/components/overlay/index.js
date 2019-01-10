Component({
  externalClasses: ['custom-class'],
  properties : {
    show: Boolean,
    mask: Boolean,
    customStyle: String,
    zIndex: {
      type: Number,
      value: 1
    }
  },
  data : {
  },
  methods : {
    onClick() {
      this.triggerEvent('click');
    },

    // for prevent touchmove
    noop() {}
  }

})