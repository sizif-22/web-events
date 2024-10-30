import { useSelector } from "react-redux";
import "./btns.css";
import { logout } from "@/app/firebase/firebase.auth";
import { useRouter } from "next/navigation";
const DropDownBtns = () => {
  const router = useRouter();
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn } = userState;

  return (
    <ul className="py-2">
      <li className="dropdownbtns">Dark Mode</li>
      {isLoggedIn ? (
        <li
          className="dropdownbtns text-red-900"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          log out
        </li>
      ) : (
        <li
          className="dropdownbtns"
          onClick={() => {
            router.push("/login");
          }}
        >
          log in
        </li>
      )}
    </ul>
  );
};
export default DropDownBtns;
