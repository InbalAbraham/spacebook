var loadCollapsible = function () {

  var collapsibleTemplate = `<div>
    <div class="collapsible-header" v-on:click="collapsed = !collapsed">{{header}}</div>
    <div class="collapsible" v-show="!collapsed">
      <slot></slot>
    </div>
	</div>`;

  Vue.component('collapsible', {
    template: collapsibleTemplate,
    props: ["header"],
    data: function () {
        return {
          collapsed: true
      }
    },
    methods: {
        refresh: function(event) {
          this.$emit.refresh(event);
        }
      },
  })
}

window.addEventListener('load', loadCollapsible);
