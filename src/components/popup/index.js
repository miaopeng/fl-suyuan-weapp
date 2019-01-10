import iphonex from '../mixins/iphonex';
import transition from '../mixins/transition';

Component({
  externalClasses: ['custom-class'],
  behaviors: [transition(false), iphonex],
  properties : {
    transition: String,
    customStyle: String,
    overlayStyle: String,
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center'
    }
  },
  data : {
  },
  methods : {
    onClickOverlay() {
      this.triggerEvent('click-overlay');

      if (this.data.closeOnClickOverlay) {
        this.triggerEvent('close');
      }
    }

  }

})