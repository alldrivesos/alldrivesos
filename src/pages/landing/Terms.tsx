import { BsClock } from "react-icons/bs";
import LandingLayout from "../../lib/components/layout/landing";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa6";

const TermsPage = () => {
  const [open, setOpen] = React.useState(0);

  const divRefs = useRef<(HTMLDivElement | null)[]>([]);

  const termsArray = [
    {
      label: "Overview of the Platform and its Services",
      key: 1,
    },
    {
      label: "Definition of Terms",
      key: 2,
    },
    {
      label: "Eligibility and Account Registration",
      key: 3,
    },
    {
      label: "User Requirements:",
      key: 4,
    },
    {
      label: "Roadside Technician Requirements",
      key: 5,
    },
    {
      label: "Scope of Services",
      key: 6,
    },
    {
      label: "SMS and Voice Call Communications",
      key: 7,
    },
    {
      label: "Service Fees and Payment",
      key: 8,
    },

    {
      label: "Liability and Insurance",
      key: 10,
    },
    {
      label: "User Responsibilities",
      key: 11,
    },
    {
      label: "Technician Reviews and Ratings",
      key: 12,
    },
    {
      label: "Termination of Services",
      key: 13,
    },
    {
      label: "Geographical Restrictions and Legal Compliance",
      key: 14,
    },
    {
      label: "Data Collection and Privacy",
      key: 15,
    },
    {
      label: "Third-Party Links and Integrations",
      key: 16,
    },
    {
      label: "Dispute Resolution and Arbitration",
      key: 17,
    },
    {
      label: "Modifications to Terms",
      key: 18,
    },
    {
      label: "Intellectual Property",
      key: 19,
    },
    {
      label: "Contact Information",
      key: 20,
    },
    {
      label: "Governing Law and Jurisdiction",
      key: 21,
    },
    {
      label: "Payment Settlement",
      key: 22,
    },
  ];

  const Accordion1 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[1] = el)}>
      <p className="fw-600">Overview of the Platform and its Services</p>
      <p className="mt-3">
        ALLDRIVE SOS utilizes web and mobile app technology to provide a
        platform that connects Customers with qualified Technicians to request
        and deliver roadside assistance services.
      </p>
    </div>
  );

  const Accordion2 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[2] = el)}>
      <p className="fw-600">Definition of Terms </p>
      <ul className="mt-3 my-list">
        <li>
          <span className="fw-600">We, Our, Us:</span> Refers to ALLDRIVE SOS
          LLC.
        </li>
        <li>
          <span className="fw-600">Customer:</span> Refers to the individual or
          business requesting a service on the ALLDRIVE SOS Platform.
        </li>
        <li>
          <span className="fw-600">Technician:</span> Refers to the individual
          or entity providing the service.
        </li>
        <li>
          <span className="fw-600">User(s):</span> Refers to both Customers and
          Technicians utilizing the ALLDRIVE SOS Platform.
        </li>
      </ul>
    </div>
  );

  const Accordion3 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[3] = el)}>
      <p className="fw-600">Eligibility and Account Registration</p>
      <p className="fw-600 mt-3">Users: </p>
      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">Technicians:</span>To use the ALLDRIVE SOS
          platform as a technician, you are required to register an account.
          Technicians must provide all necessary business registration
          documentation and insurance verification as part of the registration
          process. Only after completing these requirements can a technician be
          approved to offer services on the platform.
        </li>
        <li>
          <span className="fw-500">Customers:</span> Customers may request
          services without creating an account prior to their first service
          request. When a customer places a request, ALLDRIVE SOS automatically
          creates a user account using the information provided during checkout.
          Customers will be prompted to verify their account and create a
          password through an email link sent to the email address provided
          during the service request.{" "}
        </li>
      </ul>
    </div>
  );

  const Accordion4 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[4] = el)}>
      <p className="fw-600">User Requirements:</p>
      <p className="mt-3">
        Users must be of legal age to form a binding contract, or must seek
        parental consent if under the age of 18. It is the user's responsibility
        to maintain the accuracy, validity, and security of their account
        information. Users can update their information via the "Edit Profile"
        feature within their account.
      </p>
    </div>
  );

  const Accordion5 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[5] = el)}>
      <p className="fw-600">Roadside Technician Requirements</p>
      <p className="mt-3">
        All technicians using the ALLDRIVE SOS platform must meet eligibility
        requirements, including possessing valid business registration and the
        appropriate insurance for the services they provide and the state they
        operate. Compliance with local state laws and regulations is mandatory.
        Failure to maintain compliance may result in suspension or termination
        of access to the ALLDRIVE SOS platform.
      </p>
      <p className="mt-3">
        Technicians are expected to deliver high-quality service with
        professionalism and courtesy. ALLDRIVE SOS reserves the right to review
        technician performance and take action against those who do not meet our
        service standards.
      </p>
    </div>
  );

  const Accordion6 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[6] = el)}>
      <p className="fw-600">Scope of Services </p>
      <p className="mt-3">
        ALLDRIVE SOS offers a variety of roadside assistance services, including
        towing, tire changes, battery assistance, fuel delivery, winching,
        mobile detailing, and lockout services. For a full list of services,
        please visit <Link to={"/request"}>www.alldrivesos.com/services</Link>.
      </p>
      <p className="mt-3">
        Our services are currently available only within the United States.
        ALLDRIVE SOS does not authorize the use of the platform outside of the
        U.S., and users must comply with local laws when using the platform.
      </p>
    </div>
  );

  const Accordion7 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[7] = el)}>
      <p className="fw-600">SMS and Voice Call Communications</p>
      <p className="mt-3">
        By using the ALLDRIVE SOS Platform and its services, you expressly
        consent to receive SMS text messages and voice calls to the phone
        numbers you provide during registration, service request, or through
        your user account.
      </p>
      <p className="mt-3">
        These communications are essential to the operation of our platform and
        are used solely to facilitate service delivery, including but not
        limited to:
      </p>
      <ul className="mt-3 my-list">
        <li>
          <span className="fw-500">Confirming service requests</span>
        </li>
        <li>
          <span className="fw-500">Providing technician arrival updates</span>
        </li>
        <li>
          <span className="fw-500">
            Delivering job status changes or confirmations
          </span>
        </li>
        <li>
          <span className="fw-500">
            Communicating account-related notifications
          </span>
        </li>
      </ul>
      <p className="mt-3">
        Standard message and data rates may apply. You may opt out of
        non-essential or promotional messages at any time by following opt-out
        instructions provided in such communications. However, opting out of
        service-related communications may impact your ability to fully use the
        Platform.
      </p>
      <p className="mt-3">
        Your consent to receive these communications is an integral condition of
        using the ALLDRIVE SOS services.
      </p>
    </div>
  );

  const Accordion8 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[8] = el)}>
      <p className="fw-600">Service Fees and Payment </p>
      <p className="mt-3">
        ALLDRIVE SOS operates on a pay-as-you-go model with no membership or
        subscription fees. Technicians set their own prices by bidding on
        service requests, allowing customers to receive fair pricing while
        technicians are compensated appropriately for their services.
      </p>
      <p className="mt-3">
        Payments are processed via a third-party payment gateway, and applicable
        taxes and processing fees are included in the total cost shown to the
        customer during checkout. Customers are responsible for paying the full
        amount for services rendered.
      </p>
      <p className="fw-600 mt-3">Fair and Transparent Payment Settlement</p>
      <p className="mt-3">
        At AllDrive SOS, we are committed to maintaining a fair, transparent,
        and accountable payment settlement structure for all parties —
        customers, technicians, and partner companies. Our payment system
        ensures that every transaction is processed with clarity, fairness, and
        balance, rewarding each participant appropriately while sustaining
        platform operations. It also includes a well-defined cancellation policy
        designed to protect both customers and service providers from unfair
        losses. To learn more about how payments, commissions, and cancellations
        are handled, please visit our detailed{" "}
        <Link to={"/payment-settlement"} className="text-blue-700 fw-500">
          Payment Settlement page
        </Link>
        .
      </p>
    </div>
  );

  const Accordion9 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[9] = el)}>
      <p className="fw-600">Refund Policy and Cancellation Charges </p>
      <p className="mt-3">
        ALLDRIVE SOS is committed to fair policies regarding cancellations and
        refunds. A 15% cancellation fee is charged for any cancelled service to
        cover processing costs incurred by third-party payment systems.
        Customers who cancel a service request will be responsible for this fee.
        If a technician cancels a service, the customer will receive a full
        refund, and the technician may incur penalties at the discretion of
        ALLDRIVE SOS.
      </p>
    </div>
  );

  const Accordion10 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[10] = el)}>
      <p className="fw-600">Liability and Insurance </p>
      <p className="mt-3">
        ALLDRIVE SOS acts solely as a platform connecting customers with
        independent technicians. We are not responsible for the actual service
        outcomes or any damages that may result during service. While we strive
        for continuous operation, ALLDRIVE SOS does not guarantee uninterrupted
        service and is not liable for any downtime or unavailability.
      </p>
      <p className="mt-2">
        ALLDRIVE SOS assumes no liability for accidents, damages, or poor
        service provided by technicians. Technicians are responsible for
        carrying appropriate insurance, which must meet or exceed the legal
        requirements in their operating state.
      </p>
    </div>
  );

  const Accordion11 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[11] = el)}>
      <p className="fw-600">User Responsibilities</p>
      <p className="mt-3">
        Customers are required to provide accurate location and service details
        when requesting assistance. Failure to do so may result in delayed or
        cancelled services. Customers should also cooperate with technicians to
        ensure the successful completion of the requested service.
      </p>
    </div>
  );

  const Accordion12 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[12] = el)}>
      <p className="fw-600">Technician Reviews and Ratings</p>
      <p className="mt-3">
        Customers are encouraged to rate and review technicians after services
        are completed. Technicians have the right to dispute reviews they
        believe are unfair or inaccurate by contacting ALLDRIVE SOS support. We
        reserve the right to remove or modify reviews at our discretion.
      </p>
    </div>
  );

  const Accordion13 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[13] = el)}>
      <p className="fw-600">Termination of Services</p>
      <p className="mt-3">
        ALLDRIVE SOS may ban or suspend users who abuse or misuse the platform,
        including but not limited to fraudulent activity, disruption of service,
        or non-compliance with our terms. Users may also voluntarily terminate
        their account by using the "Delete Account" option under their profile
        settings.
      </p>
    </div>
  );

  const Accordion14 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[14] = el)}>
      <p className="fw-600">Geographical Restrictions and Legal Compliance</p>
      <p className="mt-3">
        ALLDRIVE SOS services are only available within the United States. Users
        who access the platform outside the U.S. do so at their own risk and are
        responsible for ensuring compliance with local laws and
        regulations.{" "}
      </p>
    </div>
  );

  const Accordion15 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[15] = el)}>
      <p className="fw-600">Data Collection and Privacy</p>
      <p className="mt-3">
        ALLDRIVE SOS collects personal, payment, and location data necessary to
        provide services. We comply with U.S. data privacy regulations to
        protect user information. For details on how your data is collected and
        used, please refer to our{" "}
        <Link to={"/privacy"} className="text-blue-700 fw-500">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );

  const Accordion16 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[16] = el)}>
      <p className="fw-600">Third-Party Links and Integrations</p>
      <p className="mt-3">
        ALLDRIVE SOS may include third-party services, such as ads and payment
        processors, on our platform. We use cookies to collect information about
        your activities on our platform to improve our services. You can view
        the privacy and terms of service pages of our third-party partners for
        more information on how they handle your data. ALLDRIVE SOS is not
        responsible for the content or services offered by third parties.
      </p>
    </div>
  );

  const Accordion17 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[17] = el)}>
      <p className="fw-600">Dispute Resolution and Arbitration</p>
      <p className="mt-3">
        In the event of a dispute between a customer and a technician, ALLDRIVE
        SOS encourages both parties to communicate directly to resolve the
        issue. If a resolution cannot be reached through direct communication,
        ALLDRIVE SOS may provide arbitration services as the final step in
        resolving the matter.
      </p>
      <p className="mt-3">
        For serious cases that go beyond ALLDRIVE SOS&apos;s arbitration
        process, such as threats, fight, stalking, harm, or any form of physical
        danger, the involved party should prioritze safety and immediately
        contact emergency services by calling 911 or following the appropriate
        emergency procedures. Once safe, the incident should be reported to
        ALLDRIVE SOS via our customer support chat or by submitting a detailed
        form on our{" "}
        <Link to={"/contact"} className="text-blue-700 fw-500">
          Contact Us page{" "}
        </Link>
        for further legal action.
      </p>
    </div>
  );

  const Accordion18 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[18] = el)}>
      <p className="fw-600">Modifications to Terms</p>
      <p className="mt-3">
        ALLDRIVE SOS retains the right to modify these Terms of Service at any
        time. The date of the latest update will be shown at the top of this
        page. It is the responsibility of users to review the terms regularly to
        stay informed of any changes. Continued use of the platform after
        updates have been made constitutes acceptance of the revised terms.
      </p>
    </div>
  );

  const Accordion19 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[19] = el)}>
      <p className="fw-600">Intellectual Property</p>
      <p className="mt-3">
        All content, trademarks, and intellectual property on the ALLDRIVE SOS
        platform are the property of ALLDRIVE SOS LLC. Users are granted a
        limited, non-exclusive right to use the platform. Unauthorized use of
        ALLDRIVE SOS content is strictly prohibited.
      </p>
    </div>
  );

  const Accordion20 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[20] = el)}>
      <p className="fw-600">Contact Information</p>
      <p className="mt-3">
        If you have any questions, concerns, or disputes, please contact our
        support team by completing the form on our{" "}
        <Link to={"/contact"} className="text-blue-700 fw-500">
          Contact Us
        </Link>{" "}
        page.
      </p>
    </div>
  );

  const Accordion21 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[21] = el)}>
      <p className="fw-600">Governing Law and Jurisdiction</p>
      <p className="mt-3">
        These Terms will be governed by and interpreted according to the laws of
        the State of New Mexico, USA, without considering any conflict of law
        rules. Any disputes arising from or related to these Terms must be
        settled exclusively in the state or federal courts located in Las
        Cruces, New Mexico
      </p>
      <p className="mt-3">
        By accessing or using the ALLDRIVE SOS Platform, you agree to be bound
        by these Terms. If you have any questions or concerns, please{" "}
        <Link to={"/contact"} className="text-blue-700 fw-500">
          Contact Us.
        </Link>{" "}
      </p>
    </div>
  );

  const Accordion22 = () => (
    <div className="mt-6" ref={(el) => (divRefs.current[22] = el)}>
      <p className="fw-600">Payment Settlement</p>
      <p className="mt-3">
        For detailed information regarding payment settlement procedures,
        including how technicians receive payments and the timeline for
        settlements, please refer to our dedicated{" "}
        <Link to={"/payment-settlement"} className="text-blue-700 fw-500">
          Payment Settlement Policy
        </Link>
        . This policy outlines the terms and conditions related to financial
        transactions between ALLDRIVE SOS, customers, and technicians.
      </p>
    </div>
  );

  return (
    <>
      <LandingLayout>
        <div>
          <div className="h-44 lg:h-[220px] pb-4 bg-policy">
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
                  Terms of Service Agreement
                </p>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="box">
              <div className="flex items-stretch relative gap-x-6">
                <div className="lg:w-[65%]">
                  <div>
                    {/* <p>Last Updated: September 15th, 2024</p> */}
                    <p className="fw-600 text-lg mt-4">
                      Introduction and Acceptance of Terms
                    </p>
                    <p className="mt-5">
                      Welcome to <span className="fw-600">ALLDRIVE SOS!</span>{" "}
                      These Terms of Service ("Terms") constitute a legally
                      binding agreement between you ("user," "you," or "your")
                      and ALLDRIVE SOS LLC ("ALLDRIVE SOS," "we," "us," or
                      "our"). By accessing or using the ALLDRIVE SOS platform,
                      including our website and mobile app (collectively, the
                      "Platform"), you acknowledge that you have read,
                      understood, and agree to be bound by these Terms. If you
                      do not agree to these Terms, you may not access or use the
                      Platform.
                    </p>
                  </div>
                  <div className="w-full lg:w-3/4 mt-8 border border-2 rounded-md py-4 px-6 flex flex-col gap-6">
                    <p className="text-lg font-bold mb-3">
                      Terms of Service Agreement
                    </p>
                    {termsArray.map((item) => (
                      <div key={item.key} className="w-full">
                        <div className="w-full flex gap-3">
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
                      <Accordion17 />
                      <Accordion18 />
                      <Accordion19 />
                      <Accordion20 />
                      <Accordion21 />
                      <Accordion22 />
                    </div>
                  </div>
                </div>
                <div className="w-[35%] hidden relative md:block h-full">
                  <div className="sticky top-0 h-full">
                    <img
                      src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1722434847/rsh/Gemini_Generated_Image_kana84kana84kana_rpcmr8.jpg"
                      alt="stranded-img"
                      className="w-full object-cover h-[600px] rounded-lg"
                    />

                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1733405932/MixCollage-05-Dec-2024-02-22-PM-7001_bxfb8y.jpg"
                      className="mt-[350px]"
                    />

                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1733171505/fjovk92ibfi4argdrscm.jpg"
                      className="mt-[650px]"
                    />

                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1733139197/Group_1171275284-min_1_mc29mv.png"
                      className="mt-[750px]"
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

export default TermsPage;
