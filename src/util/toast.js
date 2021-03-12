export default function (message) {
  const div = document.createElement('div')
  div.className = 'fixed bottom-5 left-5 right-5 rounded-2xl bg-black text-white text-center p-5 cursor-pointer transform transition-transform translate-y-full'
  div.innerHTML = message

  document.body.appendChild(div)

  requestAnimationFrame(() => {
    setTimeout(() => {
      div.classList.remove('translate-y-full')
    })
  })

  return div
}
