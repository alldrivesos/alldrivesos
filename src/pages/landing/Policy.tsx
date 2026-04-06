import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";
import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PolicyPage = () => {
  const [open, setOpen] = React.useState(0);

  const divRefs = useRef<(HTMLDivElement | null)[]>([]);

  const termsArray = [
    {
      label: "Information We Collect",
      key: 1,
    },
    {
      label: "How We Use Your Information",
      key: 2,
    },
    {
      label: "SMS and Voice Communications",
      key: 3,
    },
    {
      label: "Sharing of Information",
      key: 4,
    },
    {
      label: "GDPR and CCPA Compliance Message",
      key: 5,
    },
    {
      label: "Cookies and Tracking Technologies",
      key: 6,
    },
    {
      label: "Data Security",
      key: 7,
    },
    {
      label: "User Rights and Choices",
      key: 8,
    },
    {
      label: "Third-Party Advertisements",
      key: 9,
    },
    {
      label: "Children's Privacy",
      key: 10,
    },
    {
      label: "International Data Transfers",
      key: 11,
    },
    {
      label: "Data Retention",
      key: 12,
    },
    {
      label: "Updates to the Privacy Policy",
      key: 13,
    },
    {
      label: "Contact Information",
      key: 14,
    },
    {
      label: "Governing Law",
      key: 15,
    },
    {
      label: "User Responsibilities",
      key: 16,
    },
    {
      label: "Payment Settlement",
      key: 17,
    },
  ];

  const Accordion1 = () => (
    <div className="mt-7 text-lg" ref={(el) => (divRefs.current[1] = el)}>
      <p className="fw-600">Information We Collect</p>
      <p className="">
        We collect several types of information to provide a smooth and secure
        experience on the ALLDRIVE SOS Platform. Here's a breakdown:
      </p>
      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">Personal Information: </span> This includes
          your name, contact details (address, phone number, and email address),
          location data (GPS coordinates or approximate location based on IP
          address), and account credentials (username and password).
        </li>
        <li>
          <span className="fw-500">Payment Information: </span> We do not store
          your full credit card details. Payment information is processed
          securely by our third-party payment gateway partners. We only store
          anonymized transaction details for record-keeping purposes.
        </li>
        <li>
          <span className="fw-500">Service Usage Information: </span> This
          includes details about your service requests, such as type of service
          requested, vehicle details, and any descriptions of the issue you're
          facing. Additionally, we collect reviews and ratings you provide for
          technicians.
        </li>
        <li>
          <span className="fw-500">Device and Technical Information: </span>We
          collect data about your device, such as IP address, browser type,
          device operating system, and unique device identifiers. We also use
          cookies and similar tracking technologies to understand your
          interactions with the Platform.
        </li>
        <li>
          <span className="fw-500">Third-Party Information: </span>We may
          integrate with third-party services like advertising platforms or
          payment processors. These services might collect their own data based
          on their privacy policies.
        </li>
      </ul>
    </div>
  );

  const Accordion2 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[2] = el)}>
      <p className="mt-5 fw-600">How We Use Your Information</p>
      <p className="">
        We use the information we collect for various purposes, all aimed at
        improving your experience on the ALLDRIVE SOS Platform:
      </p>

      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">Service Delivery: </span> We use your
          information to connect you with qualified technicians, process your
          service requests, and facilitate secure transactions.
        </li>
        <li>
          <span className="fw-500">Account Management: </span> We use your
          information to create, manage, and maintain your user account on the
          Platform.
        </li>
        <li>
          <span className="fw-500">Communication: </span> We may use your
          contact information to send you updates about the Platform, service
          notifications, and occasional promotional messages (with your consent)
        </li>
        <li>
          <span className="fw-500">Improvement and Analytics: </span> We analyze
          user data to improve the functionality of the Platform, personalize
          your experience (e.g., suggesting frequently requested services), and
          understand usage trends.
        </li>
        <li>
          <span className="fw-500">Legal Compliance: </span> We may use your
          information to comply with applicable laws, regulations, or legal
          processes.
        </li>
        <li>
          <span className="fw-500">Ad Personalization: </span> With your
          consent, we may use your activity data on the Platform to tailor
          third-party advertisements displayed on our app (e.g., Google
          AdSense).
        </li>
      </ul>
    </div>
  );

  const Accordion3 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[3] = el)}>
      <p className="mt-5 fw-600">SMS and Voice Communications</p>
      <p className="">
        By using the ALLDRIVE SOS Platform and its services, you acknowledge and
        consent to receiving SMS messages and voice calls to the phone number(s)
        you provide during registration or while using the Platform. These
        communications are strictly transactional and are used to help deliver
        our services efficiently and effectively.
      </p>
      <p className="mt-3">This may include, but is not limited to:</p>
      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">
            Real-time notifications about service requests
          </span>
        </li>
        <li>
          <span className="fw-500">Updates on technician arrival times</span>
        </li>
        <li>
          <span className="fw-500">Job confirmations or cancellations</span>
        </li>
        <li>
          <span className="fw-500">
            Status updates regarding your account or ongoing service
          </span>
        </li>
      </ul>
      <p className="mt-3">
        You may opt-out of non-essential messages at any time by following the
        instructions provided in the SMS or contacting support@alldrivesos.com.
        However, opting out of essential service-related communications may
        affect your ability to use the Platform effectively.
      </p>
    </div>
  );

  const Accordion4 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[4] = el)}>
      <p className="mt-5 fw-600">Sharing of Information</p>
      <p className="">
        We share your information only in limited circumstances and with the
        utmost care:
      </p>

      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">With Technicians: </span> We share customer
          details with technicians only to the extent necessary to fulfill your
          requested service.
        </li>
        <li>
          <span className="fw-500">Third-Party Service Providers: </span> We
          work with third-party service providers like payment gateways,
          advertising partners, and cloud storage providers. These providers are
          obligated to use your information only to provide the services we have
          contracted for.
        </li>
        <li>
          <span className="fw-500">Legal Requirements: </span> We may disclose
          your information if required by law, regulation, or a valid legal
          process (e.g., court order).
        </li>
        <li>
          <span className="fw-500">Business Transfers: </span> In the event of a
          merger, acquisition, or sale of assets, your information may be
          transferred to the new owner. However, we will ensure that the new
          owner adheres to this Privacy Policy.
        </li>
      </ul>
    </div>
  );

  const Accordion5 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[5] = el)}>
      <p className="mt-5 fw-600">Cookies and Tracking Technologies</p>
      <p className="">
        We use cookies and similar tracking technologies on the ALLDRIVE SOS
        Platform. These technologies fall into three categories:
      </p>

      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">Session Cookies: </span> These temporary
          cookies are automatically deleted when you close your browser.
        </li>
        <li>
          <span className="fw-500">Persistent Cookies: </span> These cookies
          remain on your device for a certain period until they expire or are
          manually deleted.
        </li>
        <li>
          <span className="fw-500">Tracking Cookies: </span> These cookies are
          used to analyze your activity on the Platform and across different
          websites. This helps us understand user preferences and deliver
          targeted advertising (with your consent). You can manage or disable
          cookies in your browser settings. However, disabling cookies may limit
          some functionalities of the ALLDRIVE SOS Platform.
        </li>
      </ul>
    </div>
  );

  const Accordion32 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[5] = el)}>
      <p className="mt-5 fw-600">GDPR and CCPA Compliance Message</p>
      <p className="">
        <span className="fw-500">GDPR Compliance (For Users in the EEA): </span>
        If you are located in the European Economic Area (EEA), we will process
        your personal data only when we have a lawful basis to do so. Lawful
        bases include your consent, the fulfillment of a contract, compliance
        with legal obligations, and legitimate interests that do not override
        your rights and freedoms. Under the GDPR, you have the right to access
        the personal data we hold about you, correct any inaccuracies, request
        the deletion of your data (also known as the “right to be forgotten”),
        restrict certain types of processing, and receive your data in a
        portable format. You also have the right to object to specific
        processing activities.
      </p>
      <p className="mt-4">
        <span className="fw-500">
          CCPA/CPRA Compliance (For California Residents):{" "}
        </span>
        If you are a resident of California, you are entitled to certain rights
        under the California Consumer Privacy Act (CCPA) and California Privacy
        Rights Act (CPRA). These rights include the ability to know the
        categories and specific pieces of personal information we collect and
        how we use them, access your personal data, and request its deletion.
        You also have the right to opt out of the sale or sharing of your
        personal information; however, please note that AllDriveSOS does not
        sell personal data. Additionally, you are protected from discrimination
        for exercising any of your privacy rights under these laws.
      </p>
      {/*<p className="mt-4 text-sm text-gray-600">
        <span className="fw-500">Note for Developer:</span> please remember to
        update this on the mobile app too.
      </p>*/}
    </div>
  );

  const Accordion6 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[6] = el)}>
      <p className="mt-5 fw-600">Data Security</p>
      <p className="">
        We take the security of your data very seriously. We implement robust
        security measures, including encryption, firewalls, and access controls,
        to protect user information. However, please note that no system is
        entirely secure, and we cannot guarantee the complete security of your
        data.
      </p>
    </div>
  );

  const Accordion7 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[7] = el)}>
      <p className="mt-5 fw-600">User Rights and Choices</p>
      <p className="">
        We respect your right to control your personal information. Here's how
        you can manage your data:
      </p>

      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">Access and Correction: </span> You have the
          right to access and correct your personal information stored on the
          ALLDRIVE SOS Platform.
        </li>
        <li>
          <span className="fw-500">Deletion Requests: </span> You can delete
          your personal information or request us to delete your personal
          information, subject to certain legal and business requirements.
        </li>
        <li>
          <span className="fw-500">Ad Preferences: </span> If you have opted-in
          for personalized ads, you can choose to opt-out through
          industry-standard
        </li>
      </ul>
    </div>
  );

  const Accordion8 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[8] = el)}>
      <p className="mt-5 fw-600">Third-Party Advertisements</p>
      <p className="">
        We may partner with third-party advertising platforms like Google
        AdSense to display relevant ads on the ALLDRIVE SOS Platform. These
        platforms may collect data about your online activities to deliver
        personalized ads.
      </p>
      <p className="mt-2">
        You can learn more about how our advertising partners collect and use
        data for targeted advertising by visiting their Privacy Policy.
      </p>
    </div>
  );

  const Accordion9 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[9] = el)}>
      <p className="mt-5 fw-600">Children's Privacy</p>
      <p className="">
        The ALLDRIVE SOS Platform is not intended for use by individuals under
        the age of 18. We do not knowingly collect personal information from
        children.
      </p>
    </div>
  );

  const Accordion10 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[10] = el)}>
      <p className="mt-5 fw-600">International Data Transfers</p>
      <p className="">
        The ALLDRIVE SOS Platform primarily operates within the United States.
        We may transfer data to other jurisdictions as needed to provide our
        services, but we will take appropriate measures to ensure the security
        and privacy of your information.
      </p>
    </div>
  );

  const Accordion11 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[11] = el)}>
      <p className="mt-5 fw-600">Data Retention</p>
      <p className="">
        We retain your personal information for as long as necessary to fulfill
        the purposes outlined in this Privacy Policy, unless a longer retention
        period is required or permitted by law.
      </p>
    </div>
  );

  const Accordion12 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[12] = el)}>
      <p className="mt-5 fw-600">Updates to the Privacy Policy</p>
      <p className="">
        ALLDRIVE SOS retains the right to modify this Privacy Policy at any
        time. The date of the latest update will be shown at the top of this
        page. It is the responsibility of users to review the Privacy Policy
        regularly to stay informed of any changes. Continued use of the platform
        after updates have been made constitutes acceptance of the revised
        policies.
      </p>
    </div>
  );

  const Accordion13 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[13] = el)}>
      <p className="mt-5 fw-600">Contact Information</p>
      <p className="">
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </p>
      <p className="mt-2">
        Email:{" "}
        <a
          href={"https://support@alldrivesos.com"}
          target="_blank"
          className="text-blue-700 fw-500"
        >
          support@alldrivesos.com
        </a>
        <br />
        Web Contact:{" "}
        <Link to={"/contact"} className="text-blue-700 fw-500">
          Contact Us
        </Link>
      </p>
    </div>
  );

  const Accordion14 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[14] = el)}>
      <p className="mt-5 fw-600">Governing Law</p>
      <p className="">
        This Privacy Policy is governed by and construed in accordance with the
        laws of the State of New Mexico, USA.
      </p>
    </div>
  );

  const Accordion15 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[15] = el)}>
      <p className="mt-5 fw-600">User Responsibilities</p>
      <p className="">
        You are responsible for maintaining the security of your account
        credentials and personal information. Please do not share your account
        password with anyone.
      </p>
    </div>
  );

  const Accordion16 = () => (
    <div className="mt-4 text-lg" ref={(el) => (divRefs.current[16] = el)}>
      <p className="mt-5 fw-600">Payment Settlement</p>
      <p className="">
        For details on how payments are processed and settled on the ALLDRIVE
        SOS Platform, please refer to our dedicated{" "}
        <Link
          to={"/payment-settlement"}
          className="text-blue-700 fw-500 underline"
        >
          Payment Settlement Policy
        </Link>
        .
      </p>
    </div>
  );

  return (
    <>
      <LandingLayout>
        <div>
          <div className="h-44 lg:h-[220px] pb-4  bg-policy">
            <div className="box h-full flex items-center">
              <div>
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <p className="text-3xl text-white fw-700 mt-4">
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="box">
              <div className="lg:flex gap-8">
                <div className="box flex flex-col lg:w-8/12 md:w-6/12 w-full">
                  <p className="text-lg">
                    Welcome to ALLDRIVE SOS! This Privacy Policy describes how
                    we collect, use, and disclose your personal information when
                    you access or use our web and mobile platform ("Platform").
                    We are committed to protecting your privacy and ensuring the
                    security of your data. By accessing or using the Platform,
                    you agree to this Privacy Policy. If you disagree with any
                    part of this policy, please refrain from using our services.
                  </p>

                  <div className="w-full lg:w-3/4 mt-8 border border-2 rounded-md py-4 px-6 flex flex-col gap-6">
                    <p className="text-lg font-bold">Table of Contents</p>
                    {termsArray.map((item) => (
                      <div key={item.key} className="w-full">
                        <div className="w-full flex gap-4">
                          <div className="w-5 lg:w-6 h-5 lg:h-6 mt-2 lg:mt-[4px] circle place-center bg-pri">
                            <FaCheck className="text-ter fs-300 lg:fs-500" />
                          </div>
                          <span
                            className={`text-base mt-1 cursor-pointer ${
                              open === item.key ? "font-semibold" : ""
                            }`}
                            onClick={() => [
                              setOpen(item.key),
                              divRefs.current[item.key]?.scrollIntoView({
                                behavior: "smooth",
                              }),
                            ]}
                          >
                            {item.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full flex flex-col mt-4">
                    {/* For mobile view, all content is displayed */}
                    <div className="flex flex-col gap-7 w-full">
                      <Accordion1 />
                      <Accordion2 />
                      <Accordion3 />
                      <Accordion4 />
                      <Accordion32 />
                      <Accordion5 />

                      <Accordion6 />
                      <Accordion7 />
                      <Accordion8 />
                      <Accordion9 />
                      <Accordion10 />
                      <Accordion11 />
                      <Accordion12 />
                      <Accordion13 />
                      <Accordion14 />
                      <Accordion15 />
                      <Accordion16 />
                    </div>
                  </div>
                </div>

                <div className="lg:w-4/12 md:w-6/12 hidden md:flex flex-col justify-start">
                  <div className="w-full h-full relative">
                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1733405932/MixCollage-05-Dec-2024-02-22-PM-7001_bxfb8y.jpg"
                      className="mt-[50px]"
                    />

                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1733171505/fjovk92ibfi4argdrscm.jpg"
                      className="mt-[350px]"
                    />

                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1733139197/Group_1171275284-min_1_mc29mv.png"
                      className="mt-[450px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LandingLayout>
    </>
  );
};

export default PolicyPage;
