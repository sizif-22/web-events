import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleUserState } from "../../lib/user.data"; // Adjust path accordingly

const useAuthListener = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Dispatch the initial state
        dispatch(
          handleUserState({
            isLoggedIn: true,
            isVerified: user.emailVerified, // Initial value
            email: user.email,
          })
        );

        // Polling: Check for verification status every 5 seconds
        const interval = setInterval(async () => {
          await user.reload(); // Refresh user data
          if (user.emailVerified) {
            dispatch(
              handleUserState({
                isLoggedIn: true,
                isVerified: true, // Update state when verified
                email: user.email,
              })
            );
            clearInterval(interval); // Stop polling once verified
          }
        }, 5000); // Check every 5 seconds
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return null; // No UI needed, just state management
};

export default useAuthListener;
