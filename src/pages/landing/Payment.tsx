import { BsClock } from "react-icons/bs";
import Footer from "../../lib/components/layout/landing/sections/Footer";
import Header from "../../lib/components/layout/landing/sections/Header";
import { useEffect } from "react";

export default function PaymentSettlement() {
  useEffect(() => {
    const backToTop = document.getElementById("backToTop");
    const handleScroll = () => {
      if (backToTop) {
        backToTop.style.display = window.scrollY > 200 ? "block" : "none";
      }
    };
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    backToTop?.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      backToTop?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] bg-gray-50 text-[#222] leading-relaxed text-lg">
      <Header />
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
              Payment Settlement Structure
            </p>
          </div>
        </div>
      </div>
      <section className=" mx-auto  mb-[60px] bg-white p-[60px] rounded-2xl  shadow-gray-300">
        <h1 className="text-center text-[#0d4b8b] text-[2.6em] font-bold mb-8 mt-0"></h1>

        <p className="mb-4">
          Below is a fair payment settlement structure for AllDrive SOS,
          including a clear logic flow, and a cancellation policy that ensures
          accountability for both customers and technicians.
        </p>

        <div className="bg-[#e8f4ff] border-l-8 border-[#0d4b8b] p-6 my-6 text-lg">
          <p className="mb-2">
            ⚠️ <strong className="text-[#0d4b8b]">Important Note:</strong>
            <br />
            The{" "}
            <strong className="text-[#0d4b8b]">
              5% settlement received by the Service Company
            </strong>{" "}
            in the example below is{" "}
            <strong className="text-[#0d4b8b]">hypothetical</strong> and used
            for explanation purposes only.
            <br />
            In the production environment, each registered company defines its
            own <strong className="text-[#0d4b8b]">commission rate</strong> by
            logging in to{" "}
            <strong className="text-[#0d4b8b]">
              Dashboard → My Profile → Service Charge
            </strong>
            .
            <br />
            <br />
            👉 Technicians are strongly advised to{" "}
            <strong className="text-[#0d4b8b]">
              check with their registered company
            </strong>{" "}
            to confirm the{" "}
            <strong className="text-[#0d4b8b]">actual rate</strong> applicable
            to their earnings. This ensures{" "}
            <strong className="text-[#0d4b8b]">full transparency</strong> and
            prevents any misunderstanding regarding payout allocations.
            <br />
            <br />
            Additionally, all{" "}
            <strong className="text-[#0d4b8b]">
              percentage values shown in the examples
            </strong>{" "}
            below are for clarity only. In the live system, these rates are{" "}
            <strong className="text-[#0d4b8b]">variables</strong> and may differ
            from company to company.
          </p>
        </div>
        <img
          src="payment.jpeg"
          className="w-full max-h-[520px] object-contain my-4"
          alt=""
        />
        <h2 className="text-2xl font-semibold text-[#0d4b8b] mt-6 mb-4">
          1. Overview of Transaction Flow
        </h2>
        <ul className="list-[url('/path/to/bullet-icon.svg')] list-inside mb-6 space-y-2 marker:text-[#0d4b8b]">
          <li>Customers request roadside assistance.</li>
          <li>
            Technician (through a registered company) quotes a{" "}
            <strong className="font-bold">Quoted Amount (QA)</strong>.
          </li>
          <li>
            Customer pays the total amount = Quoted Amount + 5% Processing Fee
            (AllDrive SOS) + Applicable Taxes.
          </li>
          <li>
            After job completion, funds are settled among the parties as per the
            structure below.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#0d4b8b] mt-6 mb-4">
          2. Payment Settlement Structure
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300 text-lg my-6">
            <thead>
              <tr>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Party
                </th>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Settlement Basis
                </th>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  AllDrive SOS
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  5% Processing Fee + 10% from QA
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  The platform earns a total of 15% — 5% processing (paid by the
                  customer) + 10% from the QA as platform commission.
                </td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Roadside Company
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  5% of QA <i className="italic">(hypothetical example)</i>
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  The company receives 5% of the QA to cover insurance and
                  operational expenses.{" "}
                  <i className="italic">
                    In production, this rate is configurable per company
                  </i>
                  .
                </td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">Technician</td>
                <td className="py-4 px-5 border border-gray-300">85% of QA</td>
                <td className="py-4 px-5 border border-gray-300">
                  The technician receives the remaining balance (after platform
                  and company commissions).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-bold mb-2">
          ✅ Example:
          <br />
          Quoted Amount (QA) by Technician = $100.00
          <br />
          5% Processing Fee (AllDrive SOS) = $5.00
          <br />
          Total Customer Payment (excluding tax): $105.00
        </p>

        <p className="font-bold mb-2">
          Settlement Breakdown (of $100 Quoted Amount):
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1 pl-4">
          <li>AllDrive SOS: $10 (platform commission)</li>
          <li>Company: $5</li>
          <li>Technician: $85</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#0d4b8b] mt-6 mb-4">
          3. Cancellation Settlement Structure
        </h2>
        <p className="mb-4">
          To ensure fairness and discourage unnecessary cancellations:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300 text-lg my-6">
            <thead>
              <tr>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Cancellation Trigger
                </th>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Settlement Rule
                </th>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Customer cancels after making payment
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  Customers are charged 15% of the service amount.
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>a. 7.5% goes to Technician.</li>
                    <li>
                      b. 7.5% goes to AllDrive SOS (as administrative charge).
                    </li>
                  </ul>
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  <ul className="list-disc list-inside">
                    <li>
                      Protects technician’s lost time and ensures
                      accountability.
                    </li>
                    <li>AllDrive SOS Payment Processing overhead</li>
                  </ul>
                </td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Technician cancels after customer payment
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  The technician is charged 15% of the service amount to his
                  wallet.
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>a. 100% QA refunded to Customer.</li>
                    <li>
                      b. 15% of QA charged to Technician is retained by AllDrive
                      SOS.
                    </li>
                  </ul>
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  <ul className="list-disc list-inside">
                    <li>Protects customer experience and maintains trust.</li>
                    <li>AllDrive SOS Payment Processing overhead</li>
                  </ul>
                </td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Cancellation before payment
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  No charge to either party.
                </td>
                <td className="py-4 px-5 border border-gray-300">
                  Fair, as no engagement or commitment was established.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-[#0d4b8b] mt-6 mb-4">
          4. Summary Table
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300 text-lg my-6">
            <thead>
              <tr>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Item
                </th>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Rate / Fee
                </th>
                <th className="py-4 px-5 text-left bg-[#0d4b8b] text-white border border-gray-300">
                  Receiver
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Processing Fee (Customer)
                </td>
                <td className="py-4 px-5 border border-gray-300">5%</td>
                <td className="py-4 px-5 border border-gray-300">
                  AllDrive SOS
                </td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Platform Commission (Technician QA)
                </td>
                <td className="py-4 px-5 border border-gray-300">10%</td>
                <td className="py-4 px-5 border border-gray-300">
                  AllDrive SOS
                </td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Company Share (Technician QA)
                </td>
                <td className="py-4 px-5 border border-gray-300">5%</td>
                <td className="py-4 px-5 border border-gray-300">Company</td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Technician Share
                </td>
                <td className="py-4 px-5 border border-gray-300">85%</td>
                <td className="py-4 px-5 border border-gray-300">Technician</td>
              </tr>
              <tr className="even:bg-[#f2f6fa]">
                <td className="py-4 px-5 border border-gray-300">
                  Cancellation Fee (if applicable)
                </td>
                <td className="py-4 px-5 border border-gray-300">15%</td>
                <td className="py-4 px-5 border border-gray-300">
                  Split per rules
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-[#0d4b8b] mt-6 mb-4">
          5. Rationale
        </h2>
        <ul className="list-[url('/path/to/bullet-icon.svg')] list-inside mb-6 space-y-2 marker:text-[#0d4b8b]">
          <li>
            <strong className="font-semibold">Fairness:</strong> Both technician
            and company are rewarded proportionally while the platform sustains
            operations.
          </li>
          <li>
            <strong className="font-semibold">Transparency:</strong> Customers
            see clear breakdowns of service, fees, and taxes.
          </li>
          <li>
            <strong className="font-semibold">Accountability:</strong> The 15%
            cancellation fee deters last-minute cancellations from either side.
          </li>
          <li>
            <strong className="font-semibold">Sustainability:</strong> AllDrive
            SOS maintains a healthy revenue model without overburdening users or
            providers.
          </li>
        </ul>
        <p className="italic text-gray-700 mt-10 footer-note">
          This document is intended for transparency and user understanding of
          how funds are processed and settled within AllDrive SOS.
        </p>
      </section>
      <button
        id="backToTop"
        title="Back to Top"
        className="fixed bottom-8 right-8 bg-[#0d4b8b] text-white py-3 px-5 rounded-full border-none text-lg cursor-pointer shadow-md transition-colors duration-300 hover:bg-[#09406e] hidden"
      >
        ↑ Top
      </button>
      <Footer />
    </div>
  );
}
