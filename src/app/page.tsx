import {currentUser} from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser()
  const userName =  user?.username
  const welcomeSuffix = userName ? `, ${userName}`: ''

  return (
      <div className="flex items-center justify-center mt-32  ">
        <div className="inline-block border-dashed border-4 p-6 text-center bg-gray-600">
          <div className="text-6xl text-black mb-4">
            Welcome{welcomeSuffix}✋🏽
          </div>
          <div className="text-black text-3xl">
            This web application can transform voice to text
          </div>
          <div className="text-black text-3xl">
            Sign in to get started
          </div>
        </div>
      </div>
  );
}
