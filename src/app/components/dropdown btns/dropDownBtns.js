import { userData } from "../../page";
import "./btns.css";
import { logout } from "@/app/firebase/firebase.auth";
import { useRouter } from "next/navigation";
const DropDownBtns = () => {
  const router = useRouter();
  return (
    <userData.Consumer>
      {(e) => {
        return (
          <ul className="py-2">
            <li className="dropdownbtns">Dark Mood</li>
            {e.isLoggedIn ? (
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
      }}
    </userData.Consumer>
  );
};
export default DropDownBtns;
