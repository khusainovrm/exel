// Pure functions
import {$} from '@core/dom';

export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function decompOne(event, root) {
  if (event.target.dataset.resize) {
    console.log(event.target.dataset.resize)
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = event.target.dataset.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({opacity: 1, [sideProp]: '-5000px'})

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null
      $resizer.css({opacity: 0, bottom: 0, right: 0})

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }
    }
  }
}
