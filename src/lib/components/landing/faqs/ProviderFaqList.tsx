import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProviderFaqList = () => {
  const [open, setOpen] = React.useState(1);
  const divReffs = useRef<(HTMLDivElement | null)[]>([]);

  const faqArray = [
    {
      label: "What is AllDrive SOS?",
      key: 1,
    },
    {
      label: "What types of services can I offer on the AllDrive SOS platform?",
      key: 2,
    },
    {
      label:
        "What are the insurance requirements to offer services on the platform?",
      key: 3,
    },
    {
      label: "How do I submit my insurance documents to AllDrive SOS?",
      key: 4,
    },
    {
      label: "What happens if my insurance expires or lapses?",
      key: 5,
    },
    {
      label: "What is On-Hook Insurance and why is it required?",
      key: 6,
    },
    {
      label:
        "How does Garage Keepers Legal Liability Insurance apply to my services?",
      key: 7,
    },
    {
      label: "How are taxes handled on the AllDrive SOS platform?",
      key: 8,
    },
    {
      label:
        "What qualifications do I need to become a Service Provider on AllDrive SOS?",
      key: 9,
    },
    {
      label: "How do I register as a Service Provider on AllDrive SOS?",
      key: 10,
    },
    {
      label: "How do I receive job requests?",
      key: 11,
    },
    {
      label: "How are payments handled?",
      key: 12,
    },
    {
      label: "What are the cancellation fees and policies?",
      key: 13,
    },
    {
      label: "Can I set my own rates?",
      key: 14,
    },
    {
      label: "How do I contact support if I have an issue?",
      key: 15,
    },
    {
      label: "Can I operate outside of the United States?",
      key: 16,
    },
    {
      label: "What are the requirements for my business registration?",
      key: 17,
    },
    {
      label: "What type of vehicles can I use to offer my services?",
      key: 18,
    },
    {
      label: "How do I handle disputes with customers?",
      key: 19,
    },
    {
      label: " How do I update my service areas?",
      key: 20,
    },
    {
      label: "How do I track my service history?",
      key: 21,
    },
    {
      label: "Can I offer multiple services at once?",
      key: 22,
    },
  ];

  const Accordion1 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[1] = el)}
    >
      <p className="my-5 font-bold uppercase">What is AllDrive SOS?</p>
      AllDrive SOS is a web and mobile platform that connects distressed
      motorists in need of roadside assistance with qualified service providers,
      such as tow truck operators and roadside technicians, across the United
      States.
    </div>
  );

  const Accordion2 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[2] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What types of services can I offer on the AllDrive SOS platform?
      </p>
      As a Service Provider, you can offer a range of roadside assistance
      services, including but not limited to:
      <ul className="grid gap-2 mt-2 my-list">
        <li>Towing</li>
        <li>Jump-starts</li>
        <li>Flat tire replacements</li>
        <li>Lockout services</li>
        <li>Fuel delivery</li>
        <li>Battery replacement</li>
        <li>Winching</li>
        <li>On-hook services</li>
        <li>Winch-Out</li>
        <li>Mobile Detailing</li>
      </ul>
    </div>
  );

  const Accordion3 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[3] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What are the insurance requirements to offer services on the platform?
      </p>
      All Service Providers are required to maintain specific insurance
      coverages, depending on the services they offer:
      <ul className="grid gap-2 mt-4 my-list">
        <li>
          <span className="fw-600">For towing services:</span>
          <ul className="my-list list-inside">
            <li>Commercial General Liability Insurance: Minimum $1,000,000 </li>
            <li>Commercial Automobile Insurance: Minimum $1,000,000</li>
            <li>On-Hook Insurance: Minimum $100,000</li>
            <li>
              Garage Keepers Legal Liability Insurance (if you provide storage
              services): Minimum $100,000
            </li>
          </ul>
        </li>
        <li>
          {" "}
          <span className="fw-600">For roadside/soft services:</span>
          <ul className="my-list list-inside mt-3">
            <li>Commercial General Liability Insurance: Minimum $1,000,000 </li>
            <li>Commercial Automobile Insurance: Minimum $1,000,000 </li>
          </ul>
        </li>
      </ul>
      <p className="mt-2">
        Additionally, Service Providers must provide a certificate of insurance
        naming AllDrive SOS as an additional insured on the Commercial General
        Liability and Commercial Automobile Insurance.
      </p>
      <p className="fw-600 mt-4">Insurance Policy Requirements keypoints:</p>
      <ul className="list-inside list-decimal mt-4 grid gap-3">
        <li>
          <span className="fw-600">Insurance Company Rating:</span> All
          insurance policies must be issued by a reputable insurance company
          with an A- or better rating from{" "}
          <Link to={"https://web.ambest.com/home"} className="text-blue-500">
            A.M. Best
          </Link>
          .
        </li>
        <li>
          <span className="fw-600">Additional Insured: </span>ALLDRIVE SOS LLC
          must be included as an additional insured on both your Commercial
          General Liability and Commercial Automobile insurance policies.
        </li>
        <li>
          <span className="fw-600">Policy Renewal:</span> When your insurance
          policies are renewed, you must provide ALLDRIVE SOS LLC with an
          updated certificate of insurance. You can do this by logging into your
          account and updating your KYC information under the "Settings" tab.
        </li>
      </ul>
    </div>
  );

  const Accordion4 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[4] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I submit my insurance documents to AllDrive SOS?
      </p>
      You must submit a copy of your certificate of insurance that meets the
      coverage requirements and names AllDrive SOS as an additional insured. You
      can upload the document through your provider account on the platform.
      Upon renewal of your policies, a renewed certificate of insurance must
      also be submitted
    </div>
  );

  const Accordion5 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[5] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What happens if my insurance expires or lapses?
      </p>
      It is your responsibility to ensure that your insurance coverage is
      current and active. If your insurance expires or lapses, you will be
      temporarily suspended from offering services on the AllDrive SOS platform
      until valid insurance documentation is provided.
    </div>
  );

  const Accordion6 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[6] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What is On-Hook Insurance and why is it required?
      </p>
      On-Hook Insurance provides coverage for damages to vehicles that are being
      towed. If you're offering towing services, this insurance is required to
      cover the cost of any potential damages that might occur to the vehicle
      while it is being towed.
    </div>
  );

  const Accordion7 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[7] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How does Garage Keepers Legal Liability Insurance apply to my services?
      </p>
      If you provide storage facility services (such as parking or storing
      vehicles at your facility), Garage Keepers Legal Liability Insurance
      protects against damages to vehicles parked in your care, custody, or
      control. This insurance is required with a minimum limit of $100,000.
    </div>
  );

  const Accordion8 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[8] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How are taxes handled on the AllDrive SOS platform?
      </p>
      As a Service Provider, you are responsible for paying any taxes (including
      VAT, if applicable) that may be required on the services you provide
      through the AllDrive SOS platform. AllDrive SOS is not responsible for
      paying these taxes on your behalf, other than taxes on its own income.
    </div>
  );

  const Accordion9 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[9] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What qualifications do I need to become a Service Provider on AllDrive
        SOS?
      </p>
      You must hold all required licenses and certifications as per state or
      federal laws for the services you offer. You must also carry and maintain
      the necessary insurance coverages. Additionally, your business should be
      in compliance with all applicable laws.
    </div>
  );

  const Accordion10 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[10] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I register as a Service Provider on AllDrive SOS?
      </p>
      To register, visit the AllDrive SOS website or mobile app and complete the
      Service Provider registration form. You will need to submit proof of
      licensing, insurance documentation, and any required certifications to
      complete your registration
    </div>
  );

  const Accordion11 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[11] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I request a roadside assistance service?
      </p>
      Once registered and approved, you will receive job requests through the
      AllDrive SOS app. These requests will be based on your location, service
      availability, and the type of services you offer. You can accept or
      decline requests based on your schedule and capacity.
    </div>
  );

  const Accordion12 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[12] = el)}
    >
      <p className="my-5 font-bold uppercase">How are payments handled?</p>
      Payments for jobs are processed directly through the AllDrive SOS
      platform. After completing a job, your payment will be credited to your
      account, minus any applicable platform fees. You can set up your bank
      account details to receive payments via direct deposit.
    </div>
  );

  const Accordion13 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[13] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What are the cancellation fees and policies?
      </p>
      If a job is canceled, a 15% cancellation fee will be charged to the party
      that initiated the cancellation. If the motorist cancels the job after
      you've already been dispatched, they will be responsible for the fee.
      However, if you cancel the job after accepting it, you will be charged the
      cancellation fee.
    </div>
  );

  const Accordion14 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[14] = el)}
    >
      <p className="my-5 font-bold uppercase">Can I set my own rates?</p>
      AllDrive SOS sets standard pricing for specific services, but you may have
      the ability to adjust rates based on factors like location and the
      complexity of the service. Rate adjustments must comply with AllDrive
      SOS's guidelines.
    </div>
  );

  const Accordion15 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[15] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I contact support if I have an issue?
      </p>
      You can contact AllDrive SOS Support through the platform's app or
      website. There is also a dedicated email address and phone number for
      Service Providers experiencing issues or needing assistance with their
      account or jobs.
    </div>
  );

  const Accordion16 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[16] = el)}
    >
      <p className="my-5 font-bold uppercase">
        Can I operate outside of the United States?
      </p>
      No, the AllDrive SOS platform operates only within the United States.
      Service Providers must comply with U.S. regulations and provide services
      within the country. You are responsible for legal compliance if you
      attempt to offer services outside of the U.S.
    </div>
  );

  const Accordion17 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[17] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What are the requirements for my business registration?
      </p>
      Your business must be legally registered and hold all necessary licenses
      required by state or federal law to provide roadside assistance services.
      You will need to provide proof of registration when signing up as a
      Service Provider on the platform.
    </div>
  );

  const Accordion18 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[18] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What type of vehicles can I use to offer my services?
      </p>
      You can use any vehicle that meets the legal and insurance requirements
      for the services you provide. For example, tow truck operators must use
      vehicles properly equipped for towing. Your vehicles must also be insured
      under your Commercial Automobile Insurance policy, which should cover both
      owned and non-owned vehicles.
    </div>
  );

  const Accordion19 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[19] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I handle disputes with customers?
      </p>
      In the event of a dispute with a customer, you can contact AllDrive SOS
      Support to open a case. The platform provides a mediation process to help
      resolve conflicts fairly. Be sure to provide all relevant documentation
      and evidence, such as photos or service reports, to support your case.
    </div>
  );

  const Accordion20 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[20] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I update my service areas?
      </p>
      You can update your service areas by logging into your AllDrive SOS
      account and adjusting your geographic availability settings. This ensures
      that you receive job requests only within the regions you are able to
      serve.
    </div>
  );

  const Accordion21 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[21] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I track my service history?
      </p>
      Your service history, including completed jobs, customer ratings, and
      payment records, is available in your AllDrive SOS account dashboard. You
      can review past jobs, payments received, and your overall performance
      metrics.
    </div>
  );

  const Accordion22 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divReffs.current[22] = el)}
    >
      <p className="my-5 font-bold uppercase">
        Can I offer multiple services at once?
      </p>
      Yes, you can offer multiple services simultaneously, such as towing and
      roadside assistance. Be sure to select all relevant services when setting
      up your profile to receive job requests that match your capabilities.
      However, make sure you have the required equipment, skills, and insurance
      for each service type.{" "}
    </div>
  );

  // const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <div className="w-full flex">
          <div className="w-full border rounded-md p-4 flex flex-col gap-5">
            <p className="text-lg font-bold mb-3">Frequently Asked Questions</p>
            {faqArray.map((item) => (
              <div key={item.key} className="w-full">
                <div className="w-full flex gap-3">
                  <div className="w-5 lg:w-6 h-5 lg:h-6 mt-2 lg:mt-[4px] circle place-center bg-pri">
                    <FaCheck className="text-ter fs-300 lg:fs-500" />
                  </div>
                  <span
                    className={`text-base mt-1 uppercase cursor-pointer ${
                      open === item.key ? "font-semibold" : ""
                    }`}
                    onClick={() => [
                      setOpen(item.key),
                      divReffs.current[item.key]?.scrollIntoView({
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
    </>
  );
};

export default ProviderFaqList;
