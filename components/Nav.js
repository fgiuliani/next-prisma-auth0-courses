import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
  const { user } = useUser()
  const { pathname } = useRouter()

  return (
    <nav className="flex-0 flex justify-between items-center py-4 px-8">
      <h1
        className={`text-6xl font-bold hover:underline hover:cursor-pointer ${
          pathname === '/' ? 'underline' : ''
        }`}
      >
        <Link href="/">
          <a>Courses</a>
        </Link>
      </h1>
      <div className="flex-1 flex ml-8 text-xl font-light">
        {user ? (
          <Link href="/dashboard" key="/dashboard">
            <a
              className={`ml-4 hover:underline hover:cursor-pointer ${
                pathname === '/dashboard' ? 'underline' : ''
              }`}
            >
              Dashboard
            </a>
          </Link>
        ) : null}
      </div>
      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </nav>
  )
}

export default Nav
