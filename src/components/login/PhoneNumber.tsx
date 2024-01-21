import { useEffect, useState } from "react";
import VerifyOtp from "./VerifyOtp";

const PhoneNumber = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isOtp, setIsOtp] = useState(false);

  //   getCountryCode by IP

  useEffect(() => {
    const getCountryCode = async () => {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setCountryCode(data.country_calling_code);
    };
    getCountryCode();
  }, []);

  // handle float lable on focus and if input is not empty
  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = document.querySelector(
      `label[for=${e.target.id}]`
    ) as HTMLLabelElement;
    if (e.type === "focus" || e.target.value !== "") {
      label.classList.add("text-slate-400", "text-sm", "top-[0%]");
      label.classList.remove("text-lg", "top-[50%]", "text-slate-600");
    } else {
      label.classList.remove("text-slate-400", "text-sm", "top-[0%]");
      label.classList.add("text-lg", "top-[50%]", "text-slate-600");
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = document.querySelector(
      `label[for=${e.target.id}]`
    ) as HTMLLabelElement;
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    } else if (!/^[6-9]/.test(e.target.value) && e.target.value.length > 0) {
      e.target.classList.add("border-red-800");
      e.target.classList.remove("border-slate-700");
      label.classList.add("text-red-800");
      label.classList.remove("text-slate-400");
    } else {
      e.target.classList.remove("border-red-800");
      e.target.classList.add("border-slate-700");
      label.classList.remove("text-red-800");
      label.classList.add("text-slate-400");
    }
    if (e.target.value.length > 0) {
      // show x icon
      const xIcon = document.querySelector(
        `#${e.target.id} ~ svg`
      ) as SVGSVGElement;
      xIcon.classList.remove("hidden");
    }
    if (e.target.value.length === 0) {
      // hide x icon
      const xIcon = document.querySelector(
        `#${e.target.id} ~ svg`
      ) as SVGSVGElement;
      xIcon.classList.add("hidden");
    }

    if (/^[6-9][0-9]{9}$/.test(e.target.value)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }

    setPhone(e.target.value);
  };

  //   handle clear button
  const handleClear = (e: React.MouseEvent<SVGSVGElement>) => {
    const input = document.querySelector(
      `#${e.currentTarget.previousElementSibling?.id}`
    ) as HTMLInputElement;
    input.value = "";
    input.focus();
    input.classList.remove("text-red-800", "border-red-800");
    const label = document.querySelector(
      `label[for=${input.id}]`
    ) as HTMLLabelElement;
    label.classList.remove("text-red-800");
    e.currentTarget.classList.add("hidden");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPhoneValid) {
      // send otp
      setIsOtp(true);
    }
  };

  const onOtpSubmit = () => {
    // submit otp
    console.log("otp submitted");
  };
  return (
    <>
      {isOtp ? (
        <VerifyOtp
          number={phone}
          countryCode={countryCode}
          onOtpSubmit={() => {
            onOtpSubmit();
          }}
        />
      ) : (
        <div className="flex flex-col items-start pl-4">
          <form onSubmit={handleSubmit}>
            <p className="mt-2 text-xl font-medium">
              Log in or sign up to continue
            </p>
            <div className="flex flex-col mt-4">
              <div className="flex gap-4">
                <div className="flex relative flex-col">
                  <input
                    id="country-code"
                    name="country-code"
                    type="text"
                    className="bg-slate-900 border-2 border-slate-700 rounded-lg px-4 py-3 outline-none w-16 text-lg placeholder:text-slate-700"
                    placeholder={countryCode}
                    disabled
                  />
                </div>
                <div className="flex flex-col relative">
                  <label
                    htmlFor="phone"
                    className="absolute text-slate-600 text-lg ml-4 top-[50%] transform translate-y-[-50%] bg-slate-900 transition-all px-2"
                  >
                    Enter mobile number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="bg-slate-900 border-2 border-slate-700 rounded-lg px-4 py-3 outline-none text-lg"
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    onInput={handleInput}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden h-6 w-6 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-slate-200 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleClear}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="text-slate-200 bg-blue-800 rounded-lg px-4 py-3 mt-8 w-full text-lg disabled:bg-slate-700 disabled:text-slate-400 outline-none transition-all focus:outline-1 focus:outline-blue-200"
                disabled={!isPhoneValid}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PhoneNumber;
