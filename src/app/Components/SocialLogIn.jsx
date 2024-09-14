import { doSocialLogin } from '../actions/index'

const SocialLogIn = () => {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '180px', margin:'20px'}}>
        <form action={doSocialLogin}>
          <button className='bg-black text-white p-1 rounded-md m-1 text-1g w-40' type="submit" name="action" value="google">Sign in with Google</button>
          <button className='bg-black text-white p-1 rounded-md m-1 text-1g w-40' type="submit" name="action" value="github">Sign in with GitHub</button>
        </form>
      </div>
    </>
  )
}

export default SocialLogIn
