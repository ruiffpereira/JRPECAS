import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const User = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn('google')}>Login</button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {session.user?.image && (
        <Image
          src={session.user?.image}
          alt={session.user?.name || 'No name provided'}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <div className="text-white">
        <p>{session.user?.name || 'No name provided'}</p>
        <p>{session.user?.email || 'No email provided'}</p>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default User
