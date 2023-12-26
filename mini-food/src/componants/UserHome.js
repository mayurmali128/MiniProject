import UserHeader from "./UserHeader";


export default function UserHome()
{
    return (
      <section className="flex-1">
        <UserHeader />;
        <div className="flex flex-col items-center mt-5 space-y-4">
          <h3 className="font-semibold text-4xl">
            You are logged In successfully
          </h3>
          <p className="font-medium text-xl">
            Order delicious and home made meals online
          </p>
          <img
            src="/undraw_Cooking_p7m1.png"
            alt="mainImage"
            className="h-[400px] w-[500px]"
          />
        </div>
      </section>
    );
}