import { IMAGES } from '@/app/utils/assets'
import Image from 'next/image'

function Loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <Image src={IMAGES.LOGO} width={150} height={150} priority className=' md:w-[180px] md:h-[180px] transform hover:scale-150 transition duration-700' alt='Logo' />
    </div>
  )
}

export default Loading