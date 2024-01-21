import { useEffect, useRef, useState } from "react";

interface VerifyOtpProps {
  number: string;
  countryCode: string;
  onOtpSubmit: () => void | undefined;
}

const VerifyOtp = (props: VerifyOtpProps) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // focus on first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  });

  const verifyOtp = () => {
    const otpString = otp.join("");
    if (/^[0-9]{4}$/.test(otpString)) {
      setIsOtpValid(true);
    } else {
      setIsOtpValid(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    verifyOtp();

    // move to previous input after deleting a digit
    if (value.length === 0 && index > 0) {
      setTimeout(() => {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }, 0);
    }

    // move


    // move to next input after 1 digit
    if (value && index < 3) {
      setTimeout(() => {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      }, 0);
    }
  };

  console.log(otp);

  return (
    <>
      <div className="flex flex-col items-start pl-4">
        <button
          className="flex text-slate-400 text-sm items-center"
          onClick={() => {
            window.history.back();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="ml-1">Back</span>
        </button>
        <form className="flex flex-col items-start mt-4">
          <p className="mt-2 text-xl font-medium">
            Enter otp sent to {props.countryCode + props.number}
          </p>
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-4 mt-4">
              {otp.map((value, index) => {
                return (
                  <input
                    type="text"
                    ref={(ref) => (inputRefs.current[index] = ref!)}
                    key={index}
                    value={value}
                    className="h-14 w-14 text-center rounded-lg bg-slate-900 border border-slate-700 outline-none text-xl p-4 focus:border-slate-400 transition-all"
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <button
            type="submit"
            className="text-slate-200 bg-blue-800 rounded-lg px-4 py-3 mt-8 w-full text-lg disabled:bg-slate-700 disabled:text-slate-400 outline-none transition-all focus:outline-1 focus:outline-blue-200"
            onClick={(e) => {
              e.preventDefault();
              props.onOtpSubmit();
            }}
            disabled={!isOtpValid}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyOtp;
