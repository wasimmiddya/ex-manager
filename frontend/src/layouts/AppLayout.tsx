import {FC} from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout: FC = () => {
  return (
    <section className='h-full'>
        <Outlet />
    </section>
  )
}

export default AppLayout