import transition from '../mixins/transition';

Component({
  externalClasses: ['custom-class'],
  behaviors: [transition(true)],
  properties: {
    name: {
      type: String,
      value: 'fade',
    },
  },

  data: {
    current: false,
    currentColor: '',
    scroll: false,
  },

  methods: {},
});
