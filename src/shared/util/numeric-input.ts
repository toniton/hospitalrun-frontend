export const onNumericKeyDown = (e: any) =>
  !new RegExp(/^[0-9\b]+$/).test(e.key) && e.preventDefault()
