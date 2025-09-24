import React from "react";
import CustomButton from "./CustomButton";

const EnquiryFormPopup = ({ closePopup, source = "popup_enquiry_now_button", isBrochure = false }) => {
  const [result, setResult] = React.useState("");
  const [isMessageBoxVisible, setIsMessageBoxVisible] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const city = formData.get("city").trim();
    const course = formData.get("course").trim();

    // Validation checks
    if (!name || !phone || (!city && !course)) {
      setResult("Please fill Name, Phone, and either City or Course");
      setIsMessageBoxVisible(true);
      setIsSuccess(false);
      return;
    }

    if (/\d/.test(name)) {
      setResult("Name cannot contain numbers");
      setIsMessageBoxVisible(true);
      setIsSuccess(false);
      return;
    }

    if (phone.length < 10) {
      setResult("Phone number must be at least 10 digits");
      setIsMessageBoxVisible(true);
      setIsSuccess(false);
      return;
    }

    // Proceed with submission
    setResult("Sending....");
    setIsMessageBoxVisible(true);
    setIsSuccess(false);

    formData.append("source", source);
    formData.append("access_key", "5b8060c2-975a-4246-9b19-6b88ed4b5464");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        setIsSuccess(true);
        event.target.reset();

        if (isBrochure) {
          const link = document.createElement("a");
          link.href = "/brochures/course-brochure.pdf";
          link.download = "Course-Brochure.pdf";
          link.click();
          setTimeout(() => closePopup(), 1000);
        } else {
          setTimeout(() => closePopup(), 2000); // Auto close after 2 sec
        }
      } else {
        setResult(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
      setResult("Something went wrong. Try again!");
      setIsSuccess(false);
    }
  };

  const closeMessageBox = () => setIsMessageBoxVisible(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 sm:p-6 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-[#F8069D]/30 relative"
        autoComplete="off"
      >
        {/* Top-right cross button always closes popup */}
        <button
          type="button"
          onClick={closePopup}
          className="absolute top-4 right-4 text-black font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-left mb-4">
          {isBrochure ? (
            <>
              <span className="text-[#F8069D]">Download</span>{" "}
              <span className="text-black">Brochure</span>
            </>
          ) : (
            <>
              <span className="text-[#F8069D]">Enquiry</span>{" "}
              <span className="text-black">Form</span>
            </>
          )}
        </h2>

        <label className="block mb-1 text-base sm:text-lg font-medium text-black text-left">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          autoComplete="new-password"
          spellCheck="false"
          className="w-full mb-2 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <label className="block mb-1 text-base sm:text-lg font-medium text-black text-left">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          autoComplete="new-password"
          spellCheck="false"
          className="w-full mb-2 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <label className="block mb-1 text-base sm:text-lg font-medium text-black text-left">Enter City</label>
        <input
          type="text"
          name="city"
          placeholder="Your City"
          autoComplete="new-password"
          spellCheck="false"
          className="w-full mb-2 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <label className="block mb-1 text-base sm:text-lg font-medium text-black text-left">Enter Course</label>
        <input
          type="text"
          name="course"
          placeholder="e.g., Cosmetology, Makeup"
          autoComplete="new-password"
          spellCheck="false"
          className="w-full mb-8 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <CustomButton type="submit" className="w-full py-3 px-6">
          {isBrochure ? "Download Brochure" : "Submit Enquiry"}
        </CustomButton>

        {/* Message Box */}
        {isMessageBoxVisible && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 sm:p-6 z-[60]">
            <div className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md text-center">
              <p className={`text-lg sm:text-xl font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                {result.includes("Sending") ? "Sending..." : result}
              </p>
              {/* Close button only hides the message */}
              {!isSuccess && (
                <CustomButton onClick={closeMessageBox} className="mt-6 px-6 sm:px-8 py-3">
                  OK
                </CustomButton>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EnquiryFormPopup;
