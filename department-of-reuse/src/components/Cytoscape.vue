<template>
  <div ref="cytoroot">

  </div>
</template>
<script lang="ts">
  import cytoscape, {
    CytoscapeOptions,
    EventNames,
    EventHandler
  } from 'cytoscape'
  /*  {
    Core,

  }*/
  import { ref, onMounted } from "vue";

  export default {
    name: "Cytoscape",
    props: {
      config: {
        type: Object as () => CytoscapeOptions,
        required: true
      },
      preConfig: {
        type: Object as () => any,
        required: false
      },
      afterCreated: {
        type: Object as () => any,
        required: false
      }
    },
    setup() {
      const cytoroot : any = ref(null);

      onMounted(async () => {
        // create a vue independent element
        const el = document.createElement('div')
        el.setAttribute('id', 'cytoscape-div')
        el.setAttribute('width', '100%')
        el.setAttribute('style', 'min-height: 600px;')

        console.debug(el);
        console.debug(cytoroot.value);

        // add it as a child of the vue managed one
        cytoroot.value.appendChild(el)

        // apply lifecycle hooks
        //if (this.props.preConfig) this.props.preConfig(cytoscape)


        // create cytoscape instance
        const instance = cytoscape({ container: el, ...this.props.config })

        // register all the component events as cytoscape ones
        const register = (eventType: EventNames, f: EventHandler) =>
          instance.on(eventType, f)

        console.debug(register)
        // TODO: Find $attrs
        /*for (const [eventType, callback] of Object.entries($attrs)) {
          if (Array.isArray(callback))
            callback.map(f => register(eventType, f as EventHandler))
          else register(eventType, callback as EventHandler)
        }*/

        //this.instance = instance
        // resolve the promise with the object created
        this.resolve(instance)

        //if (this.props.afterCreated) this.afterCreated(instance)

      });

      return {
        cytoroot
      }
    }
  };

</script>
