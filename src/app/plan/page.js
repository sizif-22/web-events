"use client";
import Plan from "./plan";
export default function Plans() {

  return(
      <div className="h-screen">
        <div className="plans-page p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Choose Your Plan
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Plan
              title={"Plan 1"}
              description={"Basic features and support"}
              price={"$20"}
            />
            <Plan
              title={"Plan 2"}
              description={"Advanced features and priority support"}
              price={"$50"}
            />
            <Plan
              title={"Plan 3"}
              description={"All features plus dedicated support"}
              price={"$60"}
            />
          </div>
        </div>
      </div>
  );
}
