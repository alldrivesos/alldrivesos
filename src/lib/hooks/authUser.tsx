import useAuthStore from '../store/userStore'

const useAuth = () => {
    const user = useAuthStore((state) => state.user)
    const saveUser = useAuthStore((state) => state.saveUser)
    const isLoggedIn =  user?.token? true : false
    const userId = user.id
    const userType = user.account
    const nameRow = user.name?.split(" ");
    const firstName = nameRow && nameRow[0]
    const lastName = nameRow && nameRow?.length > 1 && nameRow[1]
  return {
    user,
    userId,
    firstName,
    lastName,
    saveUser,
    isLoggedIn,
    userType,
  }
}

export default useAuth