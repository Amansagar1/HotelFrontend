import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 text-gray-800 w-full">
      <div
        className="w-full h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('/images/rooms/receptionfront.jpg')` }}
      ></div>
      <div className="p-6 md:p-10 lg:px-24 lg:py-16">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-lg leading-relaxed">
            At <strong>Hotel Sudarshan</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, share, and protect your information. By accessing or using our services, you agree to the practices described in this policy.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-lg leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc ml-6">
            <li className="mb-2"><strong>Personal Information:</strong> Name, contact details, identification details (such as passport number), payment information, and other information necessary for reservations and check-ins.</li>
            <li className="mb-2"><strong>Booking Details:</strong> Information about your reservation, stay preferences, special requests, and other details related to your booking.</li>
            <li className="mb-2"><strong>Website and App Usage:</strong> Information collected through cookies and similar technologies when you use our website or mobile application, such as IP address, device information, and browsing activity.</li>
            <li className="mb-2"><strong>Guest Preferences:</strong> Information you provide about your preferences, feedback, and special requests to improve your stay experience.</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6">
            <li className="mb-2">To facilitate reservations, process bookings, manage payments, and confirm your stay.</li>
            <li className="mb-2">To improve guest experience by understanding and meeting your preferences, offering personalized services, and enhancing your overall stay.</li>
            <li className="mb-2">For communication purposes, including booking confirmations, inquiries, assistance, promotional offers, or important updates (with your consent).</li>
            <li className="mb-2">For legal compliance, to meet applicable legal requirements, including reporting requirements for local authorities.</li>
            <li className="mb-2">For security, to ensure the safety of our guests and staff, prevent fraud, and manage risks.</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-lg leading-relaxed mb-4">
            We do not sell or rent your personal information. However, we may share your information in the following situations:
          </p>
          <ul className="list-disc ml-6">
            <li className="mb-2"><strong>Service Providers:</strong> With trusted partners who help us with services like payment processing, guest experience, and security.</li>
            <li className="mb-2"><strong>Legal Requirements:</strong> When required by law, regulatory authorities, or government agencies.</li>
            <li className="mb-2"><strong>Business Transfers:</strong> In case of a merger, acquisition, or sale of assets, where your information may be transferred to the new entity.</li>
          </ul>
        </section>

        {/* Security Measures */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Security Measures</h2>
          <p className="text-lg leading-relaxed">
            We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security practices include data encryption, restricted access to sensitive information, and regular security assessments.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <p className="text-lg leading-relaxed">
            We retain your personal information only as long as necessary for the purposes outlined in this policy or as required by law. Afterward, we securely delete or anonymize the data.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="text-lg leading-relaxed">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc ml-6">
            <li className="mb-2">Access your personal information.</li>
            <li className="mb-2">Correct or update inaccurate information.</li>
            <li className="mb-2">Delete or restrict the use of your information.</li>
            <li className="mb-2">Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p className="text-lg leading-relaxed">
            If you wish to exercise any of these rights, please contact us using the information provided below.
          </p>
        </section>

        {/* Cookie Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookie Policy</h2>
          <p className="text-lg leading-relaxed">
            Our website uses cookies to enhance user experience and track website activity. You can adjust your browser settings to refuse cookies or alert you when cookies are being sent.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Children’s Privacy</h2>
          <p className="text-lg leading-relaxed">
            Hotel Sudarshan does not knowingly collect personal information from children under the age of 16. If we become aware of any such data, we will promptly delete it.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Our Privacy Policy</h2>
          <p className="text-lg leading-relaxed">
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Any updates will be posted on our website with the date of the latest revision.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions, concerns, or requests regarding your privacy, please contact us at:
          </p>
          <p className="text-lg font-medium mt-2">
            Hotel Sudarshan<br />
            Janaura Road, Bypass Ayodhya, 224123
          </p>
        </section>

        {/* Intellectual Property Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Intellectual Property Rights</h2>
          <p className="text-lg leading-relaxed">
            All content, trademarks, logos, and design elements related to Hotel Sudarshan are protected under intellectual property laws and cannot be used or reproduced without permission.
          </p>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Jurisdiction</h2>
          <p className="text-lg leading-relaxed">
            The governing law and jurisdiction for any legal matters related to this Privacy Policy or guest contracts shall be under the laws of India/Uttar Pradesh/Ayodhya. All disputes and legal challenges will be handled under the jurisdiction of India/Uttar Pradesh/Ayodhya.
          </p>
        </section>

        {/* Changes to the Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Changes to the Policy</h2>
          <p className="text-lg leading-relaxed">
            Hotel Sudarshan reserves the right to modify this privacy policy at any time and will notify guests of any changes, either by posting updates on the website or through other communication channels.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
