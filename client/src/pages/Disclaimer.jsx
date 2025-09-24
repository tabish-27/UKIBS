import React from "react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDDCEE] to-white text-gray-800 font-sans">
      {/* Heading */}
      <div className="pt-24 pb-8 text-center">
        <h1 className="text-4xl font-bold text-black">Disclaimer</h1>
        <div className="w-24 h-1 bg-[#F8069D] mx-auto mt-2 rounded"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <p className="text-lg mb-6">
          Welcome to the UK International London Beauty School, a trusted & recognized beauty academy’s official website. By using and accessing this website, you acknowledge that you agree to all the terms highlighted in this disclaimer. Our purpose is to be committed to ethical practices, transparency, and user protection. Kindly go through this page carefully, and for further questions or enquiries, you can contact us.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">General Information</h2>
        <p className="text-lg mb-6">
          All the materials, program descriptions, articles, blogs, course details including fee structure & other content available on this website offer general informational and educational purposes only. UK International assures that all content is current, reliable, and accurate. The content on our website is not intended to substitute for professional advice, legal counsel, or regulatory guidance. Users are encouraged to verify information independently or seek appropriate professional advice before making any decisions based on the information presented here.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">No Professional Guarantee</h2>
        <p className="text-lg mb-6">
          UK International London Beauty School is an educational institution focused on beauty knowledge, training, practical skills, and live sessions to help students get opportunities to work with international beauty & fashion brands. Completing any course, training program, or certification does not automatically guarantee employment, income, or internships. Achievements, results, and outcomes vary based on each student's skill, training, and efforts. We do not offer any financial or legal guarantees regarding future opportunities, placements, or earnings. By enrolling in any course or relying on the information on this website, you accept full responsibility for your own performance and results.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third Party Links</h2>
        <p className="text-lg mb-6">
          Occasionally, we allow third-party products or service links on our website. These third parties have their own platforms and separate privacy policies. If you visit their products and services, we do not have responsibility or liability for these linked sites.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property Rights</h2>
        <p className="text-lg mb-6">
          Our content, including logos, images, videos, training materials, graphics, digital assets, and written content, is protected under intellectual property rights. Unauthorized use, modification, copying, distribution, commercial exploitation, reproduction, or publication of our content is strictly prohibited. Any third party using our trademark, content, or service mark without permission may face legal action.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
        <p className="text-lg mb-6">
          At UK International London Beauty School, we are not liable for any damage, loss, or inconvenience caused as a result of using this website or its content. We provide information and course details, and users are encouraged to verify each detail and connect with professionals for more information if necessary.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to Disclaimer</h2>
        <p className="text-lg mb-6">
          We may update, modify, or change this disclaimer from time to time without prior notice to ensure transparency. Users are recommended to check this page periodically to stay informed about any amendments.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
        <p className="text-lg mb-2">
          For further questions or information regarding this disclaimer, you can connect with our expert team:
        </p>
        <ul className="list-disc ml-6 text-lg">
          <li>Phone: +91-8181819449</li>
          <li>Email: info@uk-international.com</li>
          <li>Office Address: __________________</li>
        </ul>
      </div>
    </div>
  );
};

export default Disclaimer;
