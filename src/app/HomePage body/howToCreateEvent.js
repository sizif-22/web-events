import Link from "next/link";
import "./rules.css";
const HowToCreateEvent = ()=>{
    return(<div className="p-10">
        <h2 className="text-white text-2xl">Event Creation Docs</h2>
        <div className=" border-l-2 border-white p-2 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
            <p className="relative pl-4 text-white theRules">
                if you don&apos;t have any accout you can choose your plan form <Link href={'/plan'} className="text-blue-800">here</Link> and start creating your event wibsite 
            </p>
            <p className="relative pl-4 text-white theRules">... the rest of rules</p>
            </div>
        </div>
    </div>);
}
export default HowToCreateEvent;