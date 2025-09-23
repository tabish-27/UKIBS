import React from "react";
import CustomButton from "./CustomButton";
import BEAUTY_VIDEO from "/assets/Hero_video.mp4";

function Hero() {
  const [result, setResult] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "bc21e588-24a3-478c-a759-559b51cafaf9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="relative lg:py-6 mt-0 w-full overflow-hidden">
      <div className="absolute inset-0 w-full sm:h-full overflow-hidden">
        <video className="w-full h-200 object-cover" autoPlay muted loop playsInline>
          <source src={BEAUTY_VIDEO} type="video/mp4" />
          <div className="flex items-center justify-center h-full bg-gray-900 text-white text-lg">
            Your browser does not support the video tag.
          </div>
        </video>
      </div>

      <div className="relative z-10 w-[90%] max-w-12xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 gap-12">
        <div className="hidden lg:flex flex-1 max-w-lg">
          <div className="backdrop-blur-0 bg-gray-900/40 border border-white/20 rounded-2xl mb-2 mt-20 p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-gray-900/70 hover:border-white/30">
            <h1 className="font-playfair text-2xl sm:text-5xl lg:text-3xl font-extrabold text-white mb-4 leading-tight tracking-tight transition-all duration-300 hover:text-gray-100">
              <span className="text-[#F8069D]">Shape Your Future with</span><br />
              <span className="text-white">Our Beauty Course</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-6 leading-relaxed transition-all duration-300 hover:text-white">
              Master professional beauty techniques, makeup, and skincare with expert trainers at India's leading makeup academy.
            </p>
            <div className="mt-8">
              <CustomButton>
                ADMISSION OPEN - Secure Your Seat Today
              </CustomButton>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-30 mb-3 max-w-lg w-full">
          <div className="backdrop-blur-0 bg-gray-900/40 border border-white/20 rounded-2xl p-2 md:p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-1 pt-0 text-center">Get In Touch</h2>
            <p className="text-gray-200 text-center mb-2">Fill out the form below and we'll get back to you</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-200 mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-200 mb-1">Course</label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  placeholder="Enter your course"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex justify-center">
                <CustomButton type="submit">Submit Enquiry</CustomButton>
              </div>
            </form>

            {result && (
              <div className="mt-4 p-3 text-center text-white bg-green-500/20 border border-green-500/50 rounded-lg">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;