import NavBar from "../components/nav";
import Plan from "./plan";

export default function Plans() {
  return (
    <>
      <NavBar currentPage={'plan'}/>
      <div className="grid grid-cols-3 gap-6 justify-items-center pt-8">
        <Plan title={'plan 1'} describtion={'plan1 desc'} price={'20$'}/>
        <Plan title={'plan 2'} describtion={'plan2 desc'} price={'50$'}/>
        <Plan title={'plan 3'} describtion={'plan3 desc'} price={'60$'}/>
      </div>
    </>
  );
}
