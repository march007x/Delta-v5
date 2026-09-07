import Link from "next/link";
import { cx } from "@/lib/utils";

interface Subject {
  key: string;
  title: string;
  tagline: string;
  ready: boolean;
}

/**
 * แถวการ์ดเลือกวิชา — อยู่เหนือรายการบทเรียนของหน้า /courses
 *
 * ตอนนี้เปิดจริงแค่คณิตศาสตร์ วิชาอื่นเป็นภาพ "เร็ว ๆ นี้" ที่บอกตรง ๆ ว่ายังไม่มีเนื้อหา
 * แทนที่จะซ่อนไปเลย — ผู้เรียนจะได้เห็นแผนที่ทั้งหมดของ Delta ไม่ใช่แค่สิ่งที่มีวันนี้
 *
 * การ์ดที่ยังไม่เปิดใช้ desaturate + เบลอเบา ๆ ให้ต่างจากการ์ดที่กดได้จริงตั้งแต่มองแวบแรก
 * เป็น <div> ธรรมดา ไม่ใช่ <Link> เพราะกดแล้วไม่ควรพาไปไหน — ตรงกับกติกาห้ามทำ demo ปลอม
 */
const SUBJECTS: Subject[] = [
  { key: "math", title: "คณิตศาสตร์", tagline: "ม.4–ม.6 · เปิดเรียนแล้ว", ready: true },
  { key: "physics", title: "ฟิสิกส์", tagline: "เร็ว ๆ นี้", ready: false },
  { key: "chemistry", title: "เคมี", tagline: "เร็ว ๆ นี้", ready: false },
  { key: "biology", title: "ชีววิทยา", tagline: "เร็ว ๆ นี้", ready: false },
  { key: "english", title: "ภาษาอังกฤษ", tagline: "เร็ว ๆ นี้", ready: false },
];

export function SubjectShowcase() {
  return (
    <section aria-label="เลือกวิชา" className="px-4 pt-8 sm:px-6 lg:px-10">
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 sm:pb-0">
        <ul className="m-0 grid w-max list-none grid-flow-col gap-3.5 p-0 sm:w-full sm:grid-flow-row sm:grid-cols-5">
          {SUBJECTS.map((s) => {
            const art = (
              <>
                <img
                  src={`/subjects/${s.key}-480.webp`}
                  srcSet={`/subjects/${s.key}-360.webp 360w, /subjects/${s.key}-480.webp 480w, /subjects/${s.key}-720.webp 720w`}
                  sizes="(min-width: 640px) 19vw, 148px"
                  alt=""
                  aria-hidden
                  className={cx(
                    "aspect-[3/4] w-36 object-cover sm:w-full",
                    !s.ready && "opacity-70 grayscale-[35%]",
                  )}
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,7,14,0) 45%, rgba(4,7,14,0.85) 100%)",
                  }}
                />
                <span className="absolute inset-x-0 bottom-0 p-3">
                  <span className="block font-display text-[14.5px] leading-tight font-semibold text-white">
                    {s.title}
                  </span>
                  <span
                    className={cx(
                      "mt-0.5 block font-mono text-[10.5px] tracking-wide",
                      s.ready ? "text-lime" : "text-white/60",
                    )}
                  >
                    {s.tagline}
                  </span>
                </span>
              </>
            );
            const cls =
              "group relative block aspect-[3/4] w-36 shrink-0 overflow-hidden rounded-xl border border-line no-underline transition-transform sm:w-full";
            return (
              <li key={s.key}>
                {s.ready ? (
                  <Link href="#all-lessons" className={cx(cls, "hover:-translate-y-0.5")}>
                    {art}
                  </Link>
                ) : (
                  <div className={cls} aria-disabled title="วิชานี้ยังไม่เปิดสอน">
                    {art}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
