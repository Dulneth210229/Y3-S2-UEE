import { useSelector, useDispatch } from 'react-redux';
import { login, signup, logoutLocal } from '../store/slices/auth';
export default function useAuth() {
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();
  return { ...auth, login: (p) => dispatch(login(p)), signup: (p) => dispatch(signup(p)), logout: ()=>dispatch(logoutLocal()) };
}
