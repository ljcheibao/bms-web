import Vue from "vue";
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from "vue-property-decorator";

/**
 * 视图基类
 * @class
 * @extends Vue
 */
export class BaseView extends Vue {
  constructor() {
    super();
  }
}

export {
  Vue,
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
}