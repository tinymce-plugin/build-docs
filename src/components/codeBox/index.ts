import { defineComponent, h, onBeforeUpdate, ref } from 'vue'
import type { Component, VNode } from 'vue'

export default defineComponent({
  name: 'CodeBox',
  setup(_, { slots }) {
    // index of current active item
    const activeIndex = ref(-1)
    //  console.log("five");
     
    // refs of the tab buttons
    const tabRefs = ref<HTMLButtonElement[]>([])
    const activateNext = (i = activeIndex.value): void => {
      if (i < tabRefs.value.length - 1) {
        activeIndex.value = i + 1
      } else {
        activeIndex.value = 0
      }
      tabRefs.value[activeIndex.value].focus()
    }

    // activate previous tab
    const activatePrev = (i = activeIndex.value): void => {
      if (i > 0) {
        activeIndex.value = i - 1
      } else {
        activeIndex.value = tabRefs.value.length - 1
      }
      tabRefs.value[activeIndex.value].focus()
    }

    // handle keyboard event
    const keyboardHandler = (event: KeyboardEvent, i: number): void => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        activeIndex.value = i
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        activateNext(i)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        activatePrev(i)
      }
    }

    return () => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won't be changed once the
      // `setup()` function of current component is called

      // get children code-group-item
     
      
      let _items = (slots.default?.() || [])
        .filter((vnode) => (vnode.type as Component).name === 'CodeBoxItem')
        .map((vnode) => {
          if (vnode.props === null) {
            vnode.props = {}
          }
          return vnode as VNode & { props: Exclude<VNode['props'], null> }
        })
 
      // do not render anything if there is no code-group-item
      if (_items.length === 0) {
        return null
      }
      // console.log(items);
      let firstItem = _items.pop()
      const items = [firstItem,..._items]
      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        // if `activeIndex` is invalid

        // find the index of the code-group-item with `active` props
        activeIndex.value = items.findIndex(
          (vnode) => vnode.props.active === '' || vnode.props.active === true
        )

        // if there is no `active` props on code-group-item, set the first item active
        if (activeIndex.value === -1) {
          activeIndex.value = 0
        }
      } else {
        // set the active item
        // let _last = items.pop()
        // items.unshift(_last)
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value
        })
      }

      return h('div', { class: 'code-box' }, [
        h(
          'div',
          { class: 'code-box__nav' },
          h(
            'ul',
            { class: 'code-box__ul' },
            items.map((vnode, i) => {
              const isActive = i === activeIndex.value

              return h(
                'li',
                { class: { 
                  'code-box__li': true,
                  'code-box__li-active': isActive,
                },
                ariaPressed: isActive,
                ariaExpanded: isActive,
                onClick: () => (activeIndex.value = i),
                onKeydown: (e) => keyboardHandler(e, i),
               },
                h(
                  'button',
                  {
                    ref: (element) => {
                      if (element) {
                        tabRefs.value[i] = element as HTMLButtonElement
                      }
                    },
                    class: {
                      'code-box__nav-tab': true,
                      // 'code-box__nav-tab-active': isActive,
                    },
                 
                  },
                  vnode.props.title
                )
              )
            })
          )
        ),
        items,
      ])
    }
  },
})
