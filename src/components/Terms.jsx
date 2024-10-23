import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Terms() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-4">
        <h1 className="text-3xl font-bold mb-6">
          Terms and Conditions for EventSphere
        </h1>
        <p className="mb-4">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-4">
          Welcome to EventSphere! By accessing or using our website and
          services, you agree to comply with and be bound by the following terms
          and conditions. Please read these carefully. If you do not agree with
          these terms, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By using the EventSphere website, you agree to these Terms and
          Conditions and our Privacy Policy. We may update these terms from time
          to time, and you should check this page regularly for changes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. User Accounts</h2>
        <p className="mb-4">
          To access certain features of our site, you may need to create an
          account. You agree to provide accurate, current, and complete
          information during the registration process. You are responsible for
          maintaining the confidentiality of your account and password and for
          all activities that occur under your account.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          3. Use of the Website
        </h2>
        <p className="mb-4">
          You agree to use EventSphere only for lawful purposes and in a way
          that does not infringe the rights of, restrict, or inhibit anyone
          else's use of the website. You must not misuse our site by knowingly
          introducing viruses, trojans, worms, or other malicious software.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Event Listings</h2>
        <p className="mb-4">
          EventSphere allows users to create and share events. All event details
          must be accurate and not misleading. We reserve the right to remove
          any events or content that violates these terms or is deemed
          inappropriate.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          5. Intellectual Property
        </h2>
        <p className="mb-4">
          All content on the EventSphere website, including text, graphics,
          logos, and software, is the property of EventSphere or its licensors
          and is protected by copyright, trademark, and other intellectual
          property laws. You may not reproduce, distribute, or create derivative
          works from any part of the website without our express written
          permission.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          6. Limitation of Liability
        </h2>
        <p className="mb-4">
          EventSphere is not liable for any direct, indirect, incidental, or
          consequential damages arising from the use of, or inability to use,
          our website or services. We do not guarantee the accuracy or
          reliability of any information provided through our site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          7. Third-Party Links
        </h2>
        <p className="mb-4">
          Our website may contain links to third-party websites. We do not
          endorse or assume responsibility for the content or practices of these
          websites. You access these third-party sites at your own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate or suspend your access to our
          website and services at any time, without notice, for conduct that we
          believe violates these Terms and Conditions or is harmful to other
          users of the website, us, or third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Governing Law</h2>
        <p className="mb-4">
          These terms shall be governed by and construed in accordance with the
          laws of New York, USA, without regard to its conflict of law
          principles.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          10. Changes to Terms
        </h2>
        <p className="mb-4">
          We may update these Terms and Conditions from time to time. The
          updated version will be effective when posted on this page. Your
          continued use of the website after any changes indicates your
          acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">11. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms and Conditions, please
          contact us.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
