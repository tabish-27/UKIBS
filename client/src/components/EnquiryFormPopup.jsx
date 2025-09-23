import React from "react";
import CustomButton from "./CustomButton";

const EnquiryFormPopup = ({ closePopup, source = "popup_enquiry_now_button", isBrochure = false }) => {
  const [result, setResult] = React.useState("");
  const [isMessageBoxVisible, setIsMessageBoxVisible] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Add source information to form data
    formData.append("source", source);
    formData.append("access_key", "bc21e588-24a3-478c-a759-559b51cafaf9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      
      if (isBrochure) {
        // Handle brochure download
        const link = document.createElement("a");
        link.href = "/brochures/course-brochure.pdf";
        link.download = "Course-Brochure.pdf";
        link.click();
        setTimeout(() => closePopup(), 1000);
      } else {
        setIsMessageBoxVisible(true);
        setTimeout(() => {
          closePopup();
        }, 2000);
      }
    } else {
      console.log("Error", data);
      setResult(data.message);
      setIsMessageBoxVisible(true);
    }
  };

  const closeMessageBox = () => {
    setIsMessageBoxVisible(false);
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 sm:p-6 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-[#F8069D]/30 relative"
        autoComplete="off" // Form level autocomplete off
      >
        <button type="button" onClick={closePopup} className="absolute top-4 right-4 text-black font-bold text-xl">✕</button>
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
          name="name" // Backend ke liye same name
          autoComplete="new-password"
          placeholder="Full Name"
          className="w-full mb-2 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <label className="block mb-1 text-base sm:text-lg font-medium text-black text-left">Phone Number</label>
        <input
          type="tel"
          name="phone"
          autoComplete="new-password"
          placeholder="Phone Number"
          className="w-full mb-2 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <label className="block mb-1 text-base sm:text-lg font-medium text-black text-left">Enter City</label>
        <input
          type="text"
          name="city"
          autoComplete="new-password"
          placeholder="Your City"
          className="w-full mb-2 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <label className="block mb-1 text-base sm:text-lg font-medium text-black text-left">Enter Course</label>
        <input
          type="text"
          name="course"
          autoComplete="new-password"
          placeholder="e.g., Cosmetology, Makeup"
          className="w-full mb-8 px-4 py-3 border-2 border-[#F8069D]/50 rounded-lg bg-transparent text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F8069D] transition"
        />

        <CustomButton type="submit" className="w-full py-3 px-6">
          {isBrochure ? "Download Brochure" : "Submit Enquiry"}
        </CustomButton>

        {result && (
          <div className="mt-4 p-3 text-center">
            <p className={`text-sm font-medium ${result.includes("Successfully") ? "text-green-600" : result.includes("Sending") ? "text-blue-600" : "text-red-600"}`}>
              {result}
            </p>
          </div>
        )}

        {isMessageBoxVisible && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 sm:p-6 z-[60]">
            <div className="bg-white text-black p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md text-center">
              <p className={`text-lg sm:text-xl font-semibold ${result.includes("Successfully") ? "text-green-600" : "text-red-600"}`}>
                {result.includes("Successfully") ? "Thank you! Your enquiry has been submitted." : result}
              </p>
              <CustomButton onClick={closeMessageBox} className="mt-6 px-6 sm:px-8 py-3">Close</CustomButton>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EnquiryFormPopup;
