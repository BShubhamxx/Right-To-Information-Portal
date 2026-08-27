import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  if (process.env.ENABLE_DEMO_RESET !== "true") return NextResponse.json({ error: "Not found" }, { status: 404 });
  const expected = process.env.DEMO_RESET_TOKEN;
  const supplied = request.headers.get("x-demo-reset-token");
  if (!expected || !supplied || supplied !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const admin = createSupabaseAdminClient();
    const email = "demo@rti-demo.in";
    const users = await admin.auth.admin.listUsers({ perPage: 1000 });
    const existing = users.data.users.find((user) => user.email === email);
    if (existing) await admin.auth.admin.deleteUser(existing.id);
    const created = await admin.auth.admin.createUser({ email, password: "demo123", email_confirm: true, user_metadata: { name: "Demo Citizen" } });
    if (created.error || !created.data.user) throw created.error ?? new Error("Unable to create demo user");
    const userId = created.data.user.id;
    const authorities = await admin.from("authorities").select("id,name").limit(10);
    const authority = authorities.data?.find((item) => item.name === "Demo Public Works Authority") ?? authorities.data?.[0];
    if (!authority) throw new Error("Seed authorities before resetting demo data.");
    const applications = [
      { user_id: userId, registration_number: "DEMO/R/E/26/00421", title: "Road repair expenditure — Pune", original_question: "Road repair expenditure in Pune", polished_question: "Please provide records of road repair expenditure in Pune for FY 2025–26.", authority_id: authority.id, status: "UNDER_REVIEW", fee: 10, payment_status: "SUCCESS" },
      { user_id: userId, registration_number: "DEMO/R/E/26/00422", title: "Government school infrastructure — Nashik", original_question: "School infrastructure in Nashik", polished_question: "Please provide records of government school infrastructure in Nashik for FY 2025–26.", authority_id: authority.id, status: "RESPONSE_OVERDUE", fee: 10, payment_status: "SUCCESS" },
      { user_id: userId, registration_number: "DEMO/R/E/26/00423", title: "Public hospital equipment procurement — Mumbai", original_question: "Hospital equipment procurement in Mumbai", polished_question: "Please provide records of public hospital equipment procurement in Mumbai for FY 2025–26.", authority_id: authority.id, status: "RESPONSE_RECEIVED", fee: 10, payment_status: "SUCCESS" },
    ];
    const inserted = await admin.from("rti_applications").insert(applications).select("id,registration_number,status");
    if (inserted.error) throw inserted.error;
    await admin.from("notifications").insert([
      { user_id: userId, title: "Demo data restored", description: "Your sample RTIs and lifecycle records are ready.", action_url: "/dashboard" },
      { user_id: userId, title: "Response overdue", description: "Your school infrastructure request may be eligible for a First Appeal.", action_url: "/appeal" },
    ]);
    return NextResponse.json({ ok: true, email, password: "demo123", applications: inserted.data?.length ?? 0 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Reset failed" }, { status: 500 });
  }
}
