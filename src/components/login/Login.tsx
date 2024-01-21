import PhoneNumber from "./PhoneNumber";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex w-[60%] bg-slate-900 rounded-3xl aspect-[5/3] overflow-hidden justify-center items-center">
        <div className="flex-1 flex items-center justify-center relative">
          <img
            src="/kody_snowboarding_flying_red.webp"
            alt="Flying Kody Koala"
            className="object-contain w-[70%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900"></div>
        </div>
        <div className="flex-1">
          <PhoneNumber />
        </div>
      </div>
    </div>
  );
};

export default Login;
