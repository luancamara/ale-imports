export function Loading() {
  return (
    <div className='flex h-screen items-center justify-center space-x-2 bg-white dark:invert'>
      <span className='sr-only'>Loading...</span>
      <div className='size-8 animate-bounce rounded-full bg-black [animation-delay:-0.3s]'></div>
      <div className='size-8 animate-bounce rounded-full bg-black [animation-delay:-0.15s]'></div>
      <div className='size-8 animate-bounce rounded-full bg-black'></div>
    </div>
  )
}
