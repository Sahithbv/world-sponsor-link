"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Notification = {
  id: string;
  title: string;
  message: string;
  status: string;
  created_at: string;
};

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          created_at,
          opportunities (
            title
          )
        `)
        .eq("brand_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      const formatted = (data || []).map((item: any) => ({
        id: item.id,
        title:
          item.opportunities?.title ||
          "Sponsorship Application",
        message:
          item.status === "pending"
            ? "Your sponsorship application is waiting for a response."
            : item.status === "accepted"
              ? "Your sponsorship application has been accepted."
              : item.status === "rejected"
                ? "Your sponsorship application was rejected."
                : "Your sponsorship application was updated.",
        status: item.status,
        created_at: item.created_at,
      }));

      setNotifications(formatted);
      setLoading(false);
    }

    loadNotifications();
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-blue-500"
          >
            WSL
          </Link>

          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white"
          >
            ← Dashboard
          </Link>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-blue-500 font-semibold mb-3">
          ACTIVITY
        </p>

        <h1 className="text-4xl font-bold">
          Notifications
        </h1>

        <p className="text-gray-400 mt-3">
          Keep track of your sponsorship activity.
        </p>

        {loading ? (
          <div className="mt-10 text-gray-400">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-4">
              🔔
            </div>

            <h2 className="text-xl font-bold">
              No notifications yet
            </h2>

            <p className="text-gray-400 mt-2">
              Your sponsorship activity will appear here.
            </p>

            <Link
              href="/opportunities"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold"
            >
              Find Opportunities
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-lg">
                      {notification.title}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {notification.message}
                    </p>
                  </div>

                  <span
                    className={`h-fit px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      notification.status === "accepted"
                        ? "bg-green-500/10 text-green-400"
                        : notification.status === "rejected"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {notification.status}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mt-4">
                  {new Date(
                    notification.created_at
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}