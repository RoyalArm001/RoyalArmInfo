"use client";

import Link from "next/link";
import { useState } from "react";

const serviceOptions = [
  "Ցանցային և ՏՏ սպասարկում",
  "Սարքերի զննում և ախտորոշում",
  "Սարքերի տեղադրում և կարգավորում",
  "Կայքերի և ծրագրերի մշակում",
  "Ծրագրային ապահովման տեղադրում և սպասարկում",
  "Սերվերների տեղադրում և սպասարկում",
  "Տեսահսկման համակարգերի տեղադրում և սպասարկում",
  "Monitoring համակարգերի տեղադրում և սպասարկում",
  "Այլ ծառայություն",
];

export default function ServiceRequestPage() {
  const [status, setStatus] = useState("");

  async function saveRequest(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("Հայտն ուղարկվում է…");
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/requests", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) return setStatus(result.error || "Հայտը չուղարկվեց։");
    setStatus("Հայտը հաջողությամբ պահպանվեց։ Շուտով կկապվեմ ձեզ հետ։");
    form.reset();
  }

  function getRequest(form) {
    const data = new FormData(form);
    return [
      "Նոր սպասարկման հայտ",
      `Անուն / կազմակերպություն՝ ${data.get("name")}`,
      `Հեռախոս՝ ${data.get("phone")}`,
      `Քաղաք / մարզ՝ ${data.get("location")}`,
      `Հայտի տեսակ՝ ${data.get("requestType")}`,
      `Ծառայություն՝ ${data.get("service")}`,
      `Կապի նախընտրելի եղանակ՝ ${data.get("contactMethod")}`,
      `Նկարագրություն՝ ${data.get("details")}`,
    ].join("\n");
  }

  function sendWhatsApp(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("Բացվում է WhatsApp-ը՝ պատրաստված հայտով…");
    window.open(
      `https://wa.me/37491733633?text=${encodeURIComponent(getRequest(form))}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function sendEmail(event) {
    const form = event.currentTarget.closest("form");
    if (!form.reportValidity()) return;
    const subject = encodeURIComponent("Նոր ՏՏ սպասարկման հայտ");
    const body = encodeURIComponent(getRequest(form));
    setStatus("Բացվում է email հավելվածը՝ պատրաստված հայտով…");
    window.location.href = `mailto:royalarm001@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#0d0d0d] text-white px-3 pb-28 pt-7 sm:px-6 sm:pt-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 transition hover:text-[#ff004f]">
          <span aria-hidden="true">←</span> Վերադառնալ գլխավոր էջ
        </Link>

        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-[#151515] shadow-2xl sm:mt-8 sm:rounded-3xl">
          <div className="border-b border-gray-800 bg-gradient-to-r from-[#ff004f]/20 to-transparent p-7 sm:p-10">
            <span className="inline-flex rounded-full border border-[#ff004f]/40 bg-[#ff004f]/10 px-4 py-1 text-sm font-semibold text-[#ff4f84]">
              Սպասարկում ամբողջ Հայաստանում
            </span>
            <h1 className="mt-5 text-[clamp(2rem,10vw,3rem)] font-extrabold leading-tight">Ուղարկել նոր հայտ</h1>
            <p className="mt-4 max-w-2xl text-gray-300">
              Ընդունում եմ հեռակա ՏՏ սպասարկման, տեղադրման և կարգավորման հայտեր Հայաստանի բոլոր մարզերից։
              Լրացրեք տվյալները, և ես կկապվեմ ձեզ հետ մանրամասները ճշտելու համար։
            </p>
          </div>

          <form onSubmit={saveRequest} className="grid gap-6 p-7 sm:grid-cols-2 sm:p-10">
            <label className="grid gap-2 text-sm font-medium">
              Անուն կամ կազմակերպություն
              <input name="name" required className="rounded-xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-[#ff004f] focus:ring-2 focus:ring-[#ff004f]/20" />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Հեռախոսահամար
              <input name="phone" type="tel" required placeholder="+374…" className="rounded-xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-[#ff004f] focus:ring-2 focus:ring-[#ff004f]/20" />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Քաղաք կամ մարզ
              <input name="location" required placeholder="Օրինակ՝ Երևան" className="rounded-xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-[#ff004f] focus:ring-2 focus:ring-[#ff004f]/20" />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Հայտի տեսակ
              <select name="requestType" required className="rounded-xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-[#ff004f]">
                <option value="Հեռակա սպասարկում">Հեռակա սպասարկում</option>
                <option value="Տեղադրում">Տեղադրում</option>
                <option value="Կարգավորում">Կարգավորում</option>
                <option value="Ախտորոշում">Ախտորոշում</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium sm:col-span-2">
              Ծառայություն
              <select name="service" required className="rounded-xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-[#ff004f]">
                {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium sm:col-span-2">
              Կապի նախընտրելի եղանակ
              <select name="contactMethod" className="rounded-xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-[#ff004f]">
                <option>Հեռախոսազանգ</option>
                <option>WhatsApp</option>
                <option>Email</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium sm:col-span-2">
              Խնդրի կամ աշխատանքի նկարագրություն
              <textarea name="details" required rows="6" placeholder="Նկարագրեք խնդիրը, սարքավորումները կամ անհրաժեշտ աշխատանքը…" className="resize-y rounded-xl border border-gray-700 bg-[#0f0f0f] px-4 py-3 outline-none transition focus:border-[#ff004f] focus:ring-2 focus:ring-[#ff004f]/20" />
            </label>

            <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
              <button type="submit" className="rounded-xl bg-[#ff004f] px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e60047]">
                Ուղարկել և պահպանել հայտը
              </button>
              <button type="button" onClick={(event) => sendWhatsApp({ preventDefault(){}, currentTarget: event.currentTarget.closest('form') })} className="rounded-xl border border-[#25D366] bg-[#25D366]/10 px-6 py-4 font-bold text-[#4ade80] transition hover:bg-[#25D366] hover:text-white">
                WhatsApp-ով կապվել
              </button>
            </div>

            <p className="min-h-6 text-center text-sm text-gray-400 sm:col-span-2" aria-live="polite">{status}</p>
          </form>
        </section>
      </div>
    </main>
  );
}
