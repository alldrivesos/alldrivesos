import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FaqList = () => {
  const [open, setOpen] = React.useState(0);

  const divRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqArray = [
    {
      label: "What roadside assistance services do you provide?",
      key: 1,
    },
    {
      label: "How do I request a roadside assistance service?",
      key: 2,
    },
    {
      label: "How do I get charged for my roadside assistance?",
      key: 3,
    },
    {
      label: "How long will it take to get help?",
      key: 4,
    },
    {
      label: "Should I tip my roadside assistance providers?",
      key: 5,
    },
    {
      label: "Do I need Auto Insurance to use AllDrive SOS?",
      key: 6,
    },
    {
      label:
        "Can I cancel a pending roadside assistance request and get a refund?",
      key: 7,
    },
    {
      label: "Why isn't my refund full?",
      key: 8,
    },
  ];

  const Accordion1 = () => (
    <div
      className="px-5 py-1 rounded-xl text-lg text-black"
      ref={(el) => (divRefs.current[1] = el)}
    >
      <p className="my-5 font-bold uppercase">
        What roadside assistance services do you provide?
      </p>
      At AllDrive SOS, we offer comprehensive maintenance and emergency roadside
      assistance services for all motor vehicles. Our service list is
      continually expanding to meet your needs. For the most up-to-date list of
      services, please visit our{" "}
      <Link to={"/request"} className="fw-500 text-primary underline">
        services page
      </Link>
      .
    </div>
  );

  const Accordion2 = () => (
    <div
      className="px-5 py-1 rounded-xl text-lg text-black"
      ref={(el) => (divRefs.current[2] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I request a roadside assistance service?
      </p>
      Getting roadside assistance is simple! Just open the AllDrive SOS app or
      visit our website. Select the service you need, fill out the quick request
      form, and we'll connect you with nearby service providers ready to assist
      you. These providers will then send you quotes and their locations so you
      can choose your preferred option. Once you&apos;ve confirmed and paid, you
      can track the technician's progress on their way to you.
    </div>
  );

  const Accordion3 = () => (
    <div
      className="px-5 py-1 rounded-xl text-lg text-black"
      ref={(el) => (divRefs.current[3] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How do I get charged for my roadside assistance?
      </p>
      Our pricing is transparent and follows a cost-efficient pay-as-you-go
      model, ensuring you save money without worrying about membership fees or
      monthly subscriptions. Pricing varies based on factors such as service
      type, location, and time of day.
    </div>
  );

  const Accordion4 = () => (
    <div
      className="px-5 py-1 rounded-xl text-lg text-black"
      ref={(el) => (divRefs.current[4] = el)}
    >
      <p className="my-5 font-bold uppercase">
        How long will it take to get help?
      </p>
      For a faster response, make sure your location services are enabled on
      your device. This helps us find service providers closest to you. When you
      request a service, you&apos;ll be able to choose a nearby provider and see
      their estimated arrival time.
    </div>
  );

  const Accordion5 = () => (
    <div
      className="px-5 py-1 rounded-xl text-lg text-black"
      ref={(el) => (divRefs.current[5] = el)}
    >
      <p className="my-5 font-bold uppercase">
        Should I tip my roadside assistance providers?
      </p>
      While tipping roadside assistance providers is not mandatory in the US,
      it&apos;s a common way to show appreciation for good service, especially
      during inconvenient times or challenging tasks. Tipping is an individual
      decision but is always appreciated for exceptional work.
    </div>
  );

  const Accordion6 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divRefs.current[6] = el)}
    >
      <p className="my-5 font-bold uppercase">
        Do I need Auto Insurance to use AllDrive SOS?
      </p>
      No! AllDrive SOS offers a convenient pay-as-you-go option. However, if
      your Auto insurance covers roadside assistance, we will provide you with a
      payment receipt via email to help you claim reimbursement from your
      insurance company.
    </div>
  );

  const Accordion7 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divRefs.current[7] = el)}
    >
      <p className="my-5 font-bold uppercase">
        Can I cancel a pending roadside assistance request and get a refund?
      </p>
      We aim to fulfill every roadside assistance request promptly and
      professionally. However, if you need to cancel a pending request, you can
      do so and receive a refund, subject to a 15% service charge deduction.
    </div>
  );

  const Accordion8 = () => (
    <div
      className="px-5 py-1 rounded-xl text-black text-lg"
      ref={(el) => (divRefs.current[8] = el)}
    >
      <p className="my-5 font-bold uppercase">Why isn't my refund full?</p>
      We use secure third-party processors for all transactions, including banks
      and payment gateways. These institutions may charge fees for processing
      refunds, which is why a small service fee applies.
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
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqList;
