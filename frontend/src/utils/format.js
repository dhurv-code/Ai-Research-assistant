export function excerpt(text = '', maxLength = 130) {
  if (!text) return ''
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`
}

export function formatCount(value) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value)
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
