import { Hospital, Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <main className="flex flex-col items-center gap-8 px-8 py-16 text-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-green-600 p-4">
            <Hospital size={48} className="text-white" />
          </div>
          <Activity size={32} className="text-green-400" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-green-900">
            ศูนย์ข้อมูลด้านการแพทย์และสุขภาพ
          </h1>
          <h2 className="text-2xl font-semibold text-green-700">
            จังหวัดพิษณุโลก
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-3xl font-bold tracking-wide text-green-800">
            Phitsanulok Health
          </p>
          <p className="text-5xl font-extrabold tracking-tight text-green-600">
            Dashboard
          </p>
        </div>

        <div className="mt-4 h-1 w-32 rounded-full bg-green-400" />

        <Link
          href="/test"
          className="mt-4 rounded-full bg-green-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
        >
          เข้าสู่ระบบ
        </Link>
      </main>
    </div>
  );
}
